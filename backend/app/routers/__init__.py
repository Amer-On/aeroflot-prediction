from . import general
from . import authorization
from . import ml_routes

routers = (
	general.router,
	authorization.router,
    ml_routes.router,
)