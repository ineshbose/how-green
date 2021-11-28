import json
import pytest
from app import app

@pytest.fixture(scope="module")
def client():
    app.config['TESTING'] = True
    return app.test_client()

def test_api(client):
    assert client.get('/api/').status_code == 200

def test_random_url_get(client):
    assert client.get('/api/resource/one').status_code == 404

def test_random_url_post(client):
    assert client.post('/api/resource/one').status_code == 404

def test_tesco_product_get(client):
    assert client.get('/api/tesco/301510512').status_code == 200

def test_tesco_random_product_get(client):
    response = client.get('/api/tesco/123123')
    assert response.status_code == 200
    assert json.loads(response.data.decode()).get("name") == None

def test_tesco_product_patch(client):
    assert client.patch('/api/tesco/301510512').status_code == 405

@pytest.fixture(scope="module")
def request_context():
    return app.test_request_context('')

def test_session(request_context):
    with request_context:
        # Do something that requires request context
        assert True
