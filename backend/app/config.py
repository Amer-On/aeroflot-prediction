from dotenv import load_dotenv
import jwt
import os

load_dotenv()

JWT_SECRET = os.getenv('JWT_SECRET')
JWT_ALGORITHM = os.getenv('JWT_ALGORITHM')


_super_user_payload = {
	'user_id': 69
}
JWT_SUPERUSER_TOKEN = jwt.encode(_super_user_payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
print(JWT_SECRET)
