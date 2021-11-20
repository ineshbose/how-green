from datetime import datetime
from flask import request

# http://flask-restplus.readthedocs.io
from flask_restx import Resource

from . import api_rest


@api_rest.route('/tesco/<int:product_id>')
class TescoProduct(Resource):

    def get(self, product_id):
        timestamp = datetime.utcnow().isoformat()
        return {'timestamp': timestamp, 'product': product_id}

    def post(self, product_id):
        json_payload = request.json
        return {'timestamp': json_payload}, 201
