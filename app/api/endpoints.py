import requests
from datetime import datetime
from flask import request
from bs4 import BeautifulSoup

# http://flask-restplus.readthedocs.io
from flask_restx import Resource

from . import api_rest


@api_rest.route("/tesco/<int:product_id>")
class TescoProduct(Resource):
    def get(self, product_id):
        timestamp = datetime.utcnow().isoformat()

        # Headers so we don't get blocked by tesco
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"
        }

        # Get the page with reuest and convert to beautiful soup
        url = f"https://www.tesco.com/groceries/en-GB/products/{product_id}"
        page = requests.get(url, headers=headers, timeout=120)
        soup = BeautifulSoup(page.content, "html.parser")

        # Find the description of the product
        descriptors = soup.find_all(class_="product-info-block__content-item")

        # Find the product name
        product_name = soup.find("title").get_text().split(" - ")[0]

        # Create product description from descriptors
        product_description = " ".join(d.get_text() for d in descriptors)

        # Find the product price
        product_price = soup.find(class_="price-per-sellable-unit").get_text()

        return {
            "timestamp": timestamp,
            "product": product_id,
            "product_name": product_name,
            "product_description": product_description,
            "product_price": product_price,
        }

    def post(self, product_id):
        json_payload = request.json
        return {"timestamp": json_payload}, 201
