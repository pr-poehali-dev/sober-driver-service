import json
import os
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """API для управления заказами"""
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Authorization'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    try:
        if method == 'POST':
            return create_order(event)
        elif method == 'GET':
            return get_orders(event)
        elif method == 'PUT':
            return update_order(event)
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }

def get_db_connection():
    """Создание подключения к базе данных"""
    return psycopg2.connect(os.environ['DATABASE_URL'])

def get_user_id_from_token(event: dict) -> int:
    """Получение user_id из токена (упрощенная версия)"""
    token = event.get('headers', {}).get('X-Authorization', '').replace('Bearer ', '')
    
    if not token:
        raise ValueError('Authorization required')
    
    body = json.loads(event.get('body', '{}'))
    user_id = body.get('user_id')
    
    if not user_id:
        raise ValueError('user_id required')
    
    return int(user_id)

def create_order(event: dict) -> dict:
    """Создание нового заказа"""
    body = json.loads(event.get('body', '{}'))
    
    user_id = body.get('user_id')
    service_type = body.get('service_type')
    pickup_address = body.get('pickup_address', '').strip()
    destination_address = body.get('destination_address', '').strip()
    pickup_time = body.get('pickup_time')
    city = body.get('city', '').strip()
    notes = body.get('notes', '').strip()
    
    if not all([user_id, service_type, pickup_address, destination_address, pickup_time, city]):
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Missing required fields'}),
            'isBase64Encoded': False
        }
    
    if service_type not in ['sober_driver', 'car_transport']:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid service_type'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute("SELECT id FROM users WHERE id = %s", (user_id,))
            if not cur.fetchone():
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'User not found'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                """INSERT INTO orders 
                   (user_id, service_type, pickup_address, destination_address, pickup_time, city, notes, status) 
                   VALUES (%s, %s, %s, %s, %s, %s, %s, %s) 
                   RETURNING id, user_id, service_type, pickup_address, destination_address, 
                             pickup_time, city, status, notes, created_at""",
                (user_id, service_type, pickup_address, destination_address, pickup_time, city, notes if notes else None, 'pending')
            )
            order = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'order': dict(order)
                }, default=str),
                'isBase64Encoded': False
            }
    finally:
        conn.close()

def get_orders(event: dict) -> dict:
    """Получение списка заказов пользователя"""
    params = event.get('queryStringParameters') or {}
    user_id = params.get('user_id')
    
    if not user_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'user_id required'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                """SELECT id, user_id, service_type, pickup_address, destination_address, 
                          pickup_time, city, status, price, notes, created_at, updated_at
                   FROM orders 
                   WHERE user_id = %s 
                   ORDER BY created_at DESC""",
                (user_id,)
            )
            orders = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'orders': [dict(order) for order in orders]
                }, default=str),
                'isBase64Encoded': False
            }
    finally:
        conn.close()

def update_order(event: dict) -> dict:
    """Обновление статуса заказа"""
    body = json.loads(event.get('body', '{}'))
    
    order_id = body.get('order_id')
    status = body.get('status')
    
    if not order_id or not status:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'order_id and status required'}),
            'isBase64Encoded': False
        }
    
    valid_statuses = ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled']
    if status not in valid_statuses:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid status'}),
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            cur.execute(
                """UPDATE orders 
                   SET status = %s, updated_at = CURRENT_TIMESTAMP 
                   WHERE id = %s 
                   RETURNING id, user_id, service_type, pickup_address, destination_address, 
                             pickup_time, city, status, price, notes, created_at, updated_at""",
                (status, order_id)
            )
            order = cur.fetchone()
            
            if not order:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Order not found'}),
                    'isBase64Encoded': False
                }
            
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True,
                    'order': dict(order)
                }, default=str),
                'isBase64Encoded': False
            }
    finally:
        conn.close()
