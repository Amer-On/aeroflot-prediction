import uvicorn
import os
import logging

logging.basicConfig(filename='backend.log', level=logging.DEBUG)


if __name__ == "__main__":
    uvicorn.run("app:app", host='0.0.0.0', port=8765, reload=True, log_level='info', workers=os.cpu_count())
