import * as React from "react";
import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import divWithClassName from "react-bootstrap/divWithClassName";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";

interface Place {
  name: string;
}

interface Impact {
  production: string | number;
  shipping: string | number;
};

interface Alternative {
  id: string | number;
  name: string;
  img: string;
  score: string | number;
  co2: Impact;
};

interface Product {
  timestamp?: string;
  id: string | number;
  name: string;
  img: string;
  description?: string;
  price?: string | number;
  score: string | number;
  origin?: Place;
  destination?: Place;
  distance?: string | number;
  fair_trade?: string | number | boolean;
  co2?: Impact;
  energy?: Impact;
  alternatives: Alternative[];
};

export default class App extends React.Component<{}, any> {

  constructor(props: any) {
    super(props);
    this.state = {product: null};
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.url && activeTab.url.includes("tesco.com")) {
        fetch(`http://localhost:5000/api/tesco/${activeTab.url.split("?")[0].split("/").pop()}`).then(resp => resp.json()).then((product) => this.setState({ product: product }));
      }
   });
  }

  goToPage(link: string) {
    chrome.tabs.create({ url: link });
  }

  render() {
    const { product } = this.state;

    //return (
    //  <Navbar style={{ backgroundColor: '#0DD98F' }}>
    //    <Container>
    //      <Navbar.Brand onClick={() => this.goToPage('')}>
    //        <img
    //          alt=""
    //          src={logo}
    //          width="30"
    //          height="30"
    //         className="d-inline-block align-top"
    //        />{' '}
    //        How Green?
    //      </Navbar.Brand>
    //    </Container>
    //  </Navbar>
    //)

    return (
      <Card text="white" style={{ width: '20rem', backgroundColor:'#0DD98F' }}>
        {
          (!product
          ? (
          <Spinner animation="border" role="status" className="m-4 mx-auto">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
            )
          : (
          <>
            <Tabs defaultActiveKey="score" className="mb-3 nav-fill" style={{color: '#61dafb', backgroundColor:'#f6f6f6' }}>
              <Tab eventKey="score" title="Score">
                <Card.Body>
                  <Card.Title as={divWithClassName('h3')}>
                    {product.name}
                    <Card.Text>{"\n"}</Card.Text>
                    <ProgressBar now={product.score} label={`${product.score}%`} />
                    <Badge bg="light" text="dark" as={divWithClassName('h1 d-block my-2')}>{product.score}%</Badge>
                  </Card.Title>
                  <Card.Text>{"\n"}</Card.Text>
                  <Card.Text>{"\n"}</Card.Text>
                  <Button onClick={() => this.goToPage(`http://localhost:8080/product/tesco/${product.id}`)} className="float-end" variant="primary">In the Score?</Button>
                </Card.Body>
              </Tab>
              <Tab eventKey="alternatives" title="Alternatives">
                <Card.Body>
                  <ListGroup>
                    {
                      product.alternatives.map((alternative: Alternative) => (
                        <ListGroup.Item action onClick={() => this.goToPage(`https://www.tesco.com/groceries/en-GB/products/${alternative.id}`)}>
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
        <Row>
          <Col />
          <Col xs={1}>
            <Button variant="link" onClick={() => this.goToPage("http://localhost:8080/")} className="w-25 float-end">
              <Image style={{ height: "2.5rem" }} src={logo} roundedCircle fluid alt="How Green Logo" />
            </Button>
          </Col>
        </Row>
      </Card>
    );
  }
};
