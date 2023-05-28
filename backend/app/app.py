from fastapi import FastAPI
from .routers import routers


app = FastAPI(root_path='/api')
for router in routers:
    app.include_router(router)
