from dotenv import load_dotenv
import jwt
import os
import datetime
import uuid

load_dotenv()

JWT_SECRET = os.getenv('JWT_SECRET')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM')


__now = datetime.datetime.now()
_super_user_payload = {
	'user_id': str(uuid.uuid4()),
	'exp': __now.replace(year=__now.year + 50).timestamp()
}
JWT_SUPERUSER_TOKEN = jwt.encode(_super_user_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

SUPERUSER_LOGIN = os.getenv('JWT_SUPERUSER_LOGIN')
SUPERUSER_PASSWORD = os.getenv('JWT_SUPERUSER_PASSWORD')
