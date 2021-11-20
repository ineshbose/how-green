import os
from flask import Flask, current_app, send_file

from .api import api_bp
from .client import client_bp

app = Flask(__name__, static_folder='../dist/static')
app.register_blueprint(api_bp)
# app.register_blueprint(client_bp)

from .config import Config
app.logger.info('>>> {}'.format(Config.FLASK_ENV))
app.config["DEBUG"] = Config.FLASK_ENV != "production"

@app.route('/')
def index_client():
    dist_dir = current_app.config['DIST_DIR']
    return send_file(os.path.join(dist_dir[1], 'index.html')) if dist_dir[0] else ""
