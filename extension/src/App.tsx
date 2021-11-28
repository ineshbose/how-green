import * as React from "react";
import {
  Spinner,
  Placeholder,
  Badge,
  Card,
  Image,
  Nav,
  Navbar,
  Button,
  ButtonGroup,
  ButtonToolbar,
  ProgressBar,
  Tab,
  ListGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
// import divWithClassName from "react-bootstrap/divWithClassName";
import logo from "./logo.svg";
import "./App.css";

interface Place {
  name: string;
  tld?: string;
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
    this.state = { product: null, loading: true };
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.getProduct();
  }

  getProduct() {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab.url && activeTab.url.includes("tesco.com")) {
        fetch(`http://localhost:5000/api/tesco/${activeTab.url.split("?")[0].split("/").pop()}`).then(resp => resp.json()).then((product: Product) => this.setState({ product: product }));
      }

      this.setState({ loading: false });
   });
  }

  getVariant(percent: number, inverse: boolean) {
    return !inverse
    ? (
      percent > 80
        ? "success"
        : percent > 60
          ? "info"
          : percent > 40
            ? "warning"
              : "danger"
    )
    : (
      percent > 80
        ? "danger"
        : percent > 60
          ? "warning"
          : percent > 40
            ? "info"
              : "success"
    );
  }

  goToPage(link: string) {
    chrome.tabs.create({ url: link });
  }

  render() {
    const { product, loading } = this.state;

    return (
      <div
        style={{
          background: "linear-gradient(145deg, #00D98F, #198754)",
          color: "white",
          width: "20rem",
        }}
      >
        <Navbar bg="transparent">
          <Container>
            <Navbar.Brand
              className="text-white"
              onClick={() => this.goToPage('http://localhost:8080/')}
            >
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              How Green?
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div className="p-4">
          {
            (loading
            ? (
            <>
              <Spinner animation="border" role="status" className="mb-4 mx-auto">
                <span className="visually-hidden">Loading..</span>
              </Spinner>

              <Placeholder as="p" animation="wave">
                <Placeholder xs={6} />
              </Placeholder>

              <Placeholder.Button xs={4} aria-hidden="true" />
            </>
              )
            : (product
              ? (
              <>
                <Row className="mb-2">
                  {product.img && <Col xs={3}>
                    <Image src={product.img} fluid rounded />
                    </Col>
                  }
                  <Col className="h3">
                    {product.name}
                  </Col>
                </Row>

                <Tab.Container defaultActiveKey="score">
                  <Card
                    border="success"
                    className="text-black"
                  >
                    <Card.Header>
                      <Nav variant="tabs" fill>
                        <Nav.Item>
                          <Nav.Link eventKey="score">Score</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="alternatives">Alternatives</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Card.Header>
                    <Card.Body>
                      <Tab.Content>
                        <Tab.Pane eventKey="score">
                          <h1>{product.score}%</h1>
                          {/* <Row>
                            {product.origin && <Col>
                              Origin
                              {product.origin.tld && <img
                                alt={`${product.origin.name} flag`}
                                src={`https://img.geonames.org/flags/m/${product.origin.tld}.png`}
                                height="30"
                                className="d-inline-block align-top"
                              />}
                              {product.origin.name}
                            </Col>}
                            {product.destination && <Col>
                              Destination
                              {product.destination.tld && <img
                                alt={`${product.destination.name} flag`}
                                src={`https://img.geonames.org/flags/m/${product.destination.tld}.png`}
                                height="30"
                                className="d-inline-block align-top"
                              />}
                              {product.destination.name}
                            </Col>}
                          </Row> */}

                          CO2
                          <ProgressBar>
                            <ProgressBar
                              now={product.co2.production}
                              max={40.5}
                              label={`Production: ${product.co2.production}`}
                              variant={this.getVariant((product.co2.production*100/40.5), true)}
                            />
                            <ProgressBar
                              now={product.co2.shipping}
                              max={40.5}
                              label={`Shipping: ${product.co2.shipping}`}
                              variant={this.getVariant((product.co2.shipping*100/40.5), true)}
                            />
                          </ProgressBar>

                          Energy
                          <ProgressBar>
                            <ProgressBar
                              now={product.energy.production}
                              max={40.5}
                              label={`Production: ${product.energy.production}`}
                              variant={this.getVariant((product.energy.production*100/40.5), true)}
                            />
                            <ProgressBar
                              now={product.energy.shipping}
                              max={40.5}
                              label={`Shipping: ${product.energy.shipping}`}
                              variant={this.getVariant((product.energy.shipping*100/40.5), true)}
                            />
                          </ProgressBar>

                          <Button
                            onClick={() => this.goToPage(`http://localhost:8080/product/tesco/${product.id}`)}
                            variant="link"
                            className="float-end"
                          >
                            In the Score?
                          </Button>
                        </Tab.Pane>

                        <Tab.Pane eventKey="alternatives">
                          <ListGroup>
                            {
                              product.alternatives.map((alternative: Alternative) => (
                                <ListGroup.Item
                                  action
                                  onClick={() => this.goToPage(`https://www.tesco.com/groceries/en-GB/products/${alternative.id}`)}
                                  className="d-flex justify-content-between align-items-start"
                                  variant={this.getVariant(alternative.score as number, false)}
                                >
                                  <div className="ms-2 me-auto fw-bold">
                                    {alternative.img && <Image src={alternative.img} fluid rounded />}
                                    {alternative.name}
                                  </div>
                                  <Badge bg={this.getVariant(alternative.score as number, false)}>{alternative.score}%</Badge>
                                </ListGroup.Item>
                              ))
                            }
                          </ListGroup>
                        </Tab.Pane>
                      </Tab.Content>
                    </Card.Body>
                  </Card>
                </Tab.Container>
              </>
                )
              : (
              <>
                <Container>
                <Row>
                  <Col>
                    Visit our homepage or shop at Tesco now!
                  </Col>
                </Row>
                <Card.Text>{"\n"}</Card.Text>
                <Row className="justify-content-md-center">
                  <Col>
                  <ButtonToolbar aria-label="Toolbar with button groups">
                    <ButtonGroup className="me-5">
                          <Button onClick={() => this.goToPage('http://localhost:8080/')}>Home</Button>
                    </ButtonGroup>
                    <ButtonGroup className="float-end">
                          <Button className="float-end" onClick={() => this.goToPage('https://tesco.com/')}>Tesco</Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                  </Col>
                </Row>
                </Container>
              </>
              )
            )
          )}
        </div>
      </div>
    );
  }
};
