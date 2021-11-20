"""
Global Flask Application Setting

See `.flaskenv` for default settings.
 """

import os
from app import app


class Config(object):
    FLASK_ENV =  os.getenv('FLASK_ENV', 'debug')
    SECRET_KEY = os.getenv('FLASK_SECRET', os.getcwd())

    APP_DIR = os.path.dirname(__file__)
    ROOT_DIR = os.path.dirname(APP_DIR)
    DIST_PATH = os.path.join(ROOT_DIR, 'dist')
    DIST_DIR = (os.path.exists(DIST_PATH), DIST_PATH)


app.config.from_object('app.config.Config')
