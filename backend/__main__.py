import uvicorn
import os


def main():
    uvicorn.run("app.app:app", host='0.0.0.0', port=8765, reload=False, log_level='info', workers=os.cpu_count())


if __name__ == "__main__":
    main()
