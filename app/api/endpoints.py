import requests
from datetime import datetime, time
from flask import request
from bs4 import BeautifulSoup
import random

# http://flask-restplus.readthedocs.io
from flask_restx import Resource

from . import api_rest

PRODUCTS_CACHE = {"tesco": {}, "sainsbury": {}}


@api_rest.route("/tesco/<int:product_id>")
class TescoProduct(Resource):
    def get(self, product_id):
        if PRODUCTS_CACHE["tesco"].get(product_id):
            return PRODUCTS_CACHE["tesco"][product_id]

        timestamp = datetime.utcnow().isoformat()
        json = {"timestamp": timestamp, "product": None}

        # Headers so we don't get blocked by tesco
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"
        }

        # Get the page with reuest and convert to beautiful soup
        url = f"https://www.tesco.com/groceries/en-GB/products/{product_id}"
        page = requests.get(url, headers=headers, timeout=120)

        if page.status_code == 200:
            soup = BeautifulSoup(page.content, "html.parser")

            # Find the description of the product
            descriptors = soup.find_all(class_="product-info-block__content-item")

            # Find the product name
            product_name = soup.find("title").get_text().split(" - ")[0]

            # Create product description from descriptors
            product_description = " ".join(d.get_text() for d in descriptors)

            # Find the product price
            product_price = soup.find(class_="price-per-sellable-unit").get_text()

            # Find 5 alternatives for the relevant category
            alternative_products = []

            # Find the product category
            alternatives_category = soup.find_all(
                class_="styled__Anchor-sc-1xizymv-0 qbbMw beans-breadcrumb__list-item-link beans-link__anchor"
            )
            alt_cat_link = alternatives_category[-2]["href"]

            # Make a new request to the product category and retrieve alternatives
            alt_url = f"https://www.tesco.com{alt_cat_link}"
            alt_page = requests.get(alt_url, headers=headers, timeout=120)

            # This seems to be working fine, however img src is returning something strange
            if alt_page.status_code == 200:
                alt_soup = BeautifulSoup(alt_page.content, "html.parser")
                alternative_names = alt_soup.find_all(
                    "h3", {"class": "ui__StyledTitle-sc-18aswmp-1 dTQrMR"}
                )
                alternative_links = alt_soup.find_all(
                    "a", {"class": "product-image-wrapper"}
                )
                alternative_images = alt_soup.find_all(
                    "img", {"class": "product-image"}
                )
                for i in range(5):
                    r_score = 0

                    # If the alternative product already exists in our product catalogue, grab the score
                    if PRODUCTS_CACHE["tesco"].get(
                        alternative_links[i]["href"].split("/")[-1]
                    ):
                        r_score = PRODUCTS_CACHE[
                            "tesco"[alternative_links[i]["href"].split("/")[-1]]
                        ]["score"]
                    else:
                        r_score = random.randint(1, 100)
                    alternative_products.append(
                        {
                            "id": alternative_links[i]["href"].split("/")[-1],
                            "name": alternative_names[i].get_text(),
                            "img_src": alternative_images[i]["src"],
                            "score": r_score,
                        }
                    )

            # Calcualte random score
            score = random.randint(1, 100)

            originCountry = [
                "South Africa",
                "Australia",
                "Italy",
                "France",
                "Spain",
                "Germany",
                "United States",
            ]
            originDistance = [13736, 15182, 2641, 1600, 2483, 1643, 3321]
            originRandom = random.randint(0, len(originDistance) - 1)

            c02 = round(random.uniform(0.5, 40.5), 2)

            fairTrade = bool(random.getrandbits(1))

            json = {
                "timestamp": timestamp,
                "id": product_id,
                "name": product_name,
                "description": product_description,
                "price": product_price,
                "score": score,
                "origin": originCountry[originRandom],
                "destination": "Scotland",
                "distance": originDistance[originRandom],
                "co2": c02,
                "fairTrade": fairTrade,
                "alternatives": alternative_products,
            }

        PRODUCTS_CACHE["tesco"][product_id] = json
        return json

    def post(self, product_id):
        json_payload = request.json
        return {"timestamp": json_payload}, 201
