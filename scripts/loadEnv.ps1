$env:API_GATEWAY_PORT='8000'
$env:WEBSOCKET_GATEWAY_PORT='8080'

$env:USER_SERVICE_QUEUE='user_queue'
$env:AUTH_SERVICE_QUEUE='auth_queue'
$env:ROOM_SERVICE_QUEUE='room_queue'
$env:MESSAGE_SERVICE_QUEUE='message_queue'
$env:NOTIFICATION_SERVICE_QUEUE='notification_queue'

$env:POSTGRES_DB_HOST = 'localhost'
$env:POSTGRES_DB_PORT = '5432'
$env:POSTGRES_DB_USER = 'postgres'
$env:POSTGRES_DB_PASSWORD = '30062001'
$env:POSTGRES_DB_NAME = 'Cablegram'

$env:AMQP_HOST='localhost'
$env:AMQP_PORT='5672'
$env:AMQP_USER='guest'
$env:AMQP_PASSWORD='guest'

$env:JWT_ACCESS_SECRET = 'secret'
$env:JWT_REFRESH_SECRET = 'secret'
$env:JWT_ACCESS_TTL = '10000000'
$env:JWT_REFRESH_TTL = '100000000'