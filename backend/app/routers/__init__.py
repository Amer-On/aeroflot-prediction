from . import general
from . import authorization


routers = (
	general.router,
	authorization.router
)