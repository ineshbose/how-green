import * as React from "react";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import logo from "./logo.svg";
import "./App.css";

interface Alternative {
  id: string | number;
  name: string;
  score: string | number;
};

interface Product {
  id: string | number;
  name: string;
};

export default class App extends React.Component<{}, any> {

  constructor(props: any) {
    super(props);
    this.state = {product: null};
  }

  componentDidMount() {
    this.getIDandProduct();
  }

  getIDandProduct() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.url && activeTab.url.includes("tesco.com")) {
        fetch(`http://localhost:5000/api/tesco/${activeTab.url.split("?")[0].split("/").pop()}`).then(resp => resp.json()).then((product) => this.setState({ product: product }));
      }
   });
  }

  render() {
    const { product } = this.state;
    return (
      <Card text="white" style={{ width: '20rem', backgroundColor:'#0DD98F', textAlign: 'center'}}>
        {
          (!product
          ? (
          <Spinner animation="border" role="status" className="m-4">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
            )
          : (
          <>
            <Card.Img src={logo} />
            <Tabs defaultActiveKey="score" className="mb-3 nav-fill">
              <Tab eventKey="score" title="Score">
                <Card.Body>
                  {product.name}
                  <h2>
                    {product.id} <Badge bg="light" text="dark">{product.score}%</Badge>
                  </h2>
                  <Button onClick={() => chrome.tabs.create({ url: `http://localhost:8080/product/tesco/${product.id}/visualisation`})} variant="primary">Alternatives</Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button onClick={() => chrome.tabs.create({ url: `http://localhost:8080/product/tesco/${product.id}` })} variant="primary">In the Score?</Button>
                </Card.Body>
              </Tab>
              <Tab eventKey="alternatives" title="Alternatives">
                <Card.Body>
                  <ListGroup>
                    {
                      product.alternatives.map((alternative: Alternative) => (
                        <ListGroup.Item action onClick={() => chrome.tabs.create({ url: `https://www.tesco.com/groceries/en-GB/products/${alternative.id}`})}>
                          {alternative.name} <Badge bg="info">{alternative.score}%</Badge>
                        </ListGroup.Item>
                      ))
                    }
                  </ListGroup>
                </Card.Body>
              </Tab>
            </Tabs>
        </>
          )
        )}
      </Card>
    );
  }
};
