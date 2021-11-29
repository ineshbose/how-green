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
  Tooltip,
  InputGroup,
  Form,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
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
    this.state = {
      product: null,
      loading: true,
      searchQuery: "",
    };
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

  getSearch(query: any) {
    this.setState({ searchQuery: query });
  }

  goToPage(link: string) {
    chrome.tabs.create({ url: link });
  }

  render() {
    const { product, loading, searchQuery } = this.state;

    return (
      <div
        style={{
          background: "linear-gradient(145deg, #00D98F, #198754)",
          color: "white",
          width: "20rem",
        }}
      >
        <Navbar bg="transparent">
          {searchQuery}
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
                          <h1 className="d-flex justify-content-between align-items-center">
                            {product.score}%
                            <Row>
                              {product.origin && <Col>
                                  {product.origin.tld
                                    ? (
                                      <OverlayTrigger
                                        overlay={
                                          <Tooltip id="origin-country">From {product.origin.name}</Tooltip>
                                        }
                                      >
                                        <img
                                          alt={`${product.origin.name} flag`}
                                          src={`https://img.geonames.org/flags/m/${product.origin.tld}.png`}
                                          height="10"
                                          className="d-inline-block align-top"
                                        />
                                      </OverlayTrigger>
                                    )
                                    : (
                                      <>
                                        From {product.origin.name}
                                      </>
                                    )
                                  }
                              </Col>}

                              {product.destination && <Col>
                                  {product.destination.tld
                                    ? (
                                      <OverlayTrigger
                                        overlay={
                                          <Tooltip id="destination-country">To {product.destination.name}</Tooltip>
                                        }
                                      >
                                        <img
                                          alt={`${product.destination.name} flag`}
                                          src={`https://img.geonames.org/flags/m/${product.destination.tld}.png`}
                                          height="10"
                                          className="d-inline-block align-top"
                                        />
                                      </OverlayTrigger>
                                    )
                                    : (
                                      <>
                                        To {product.destination.name}
                                      </>
                                    )
                                  }
                              </Col>}
                            </Row>
                          </h1>

                          {product.co2 && <div className="py-2">
                            <h4>CO2</h4>

                            <OverlayTrigger
                              placement="top-end"
                              overlay={
                                // <Popover id="co2-prod-tooltip">
                                //   <Popover.Header as="h3">
                                //     CO2 during Production
                                //   </Popover.Header>

                                //   <Popover.Body>
                                //     {product.co2.production} kg
                                //   </Popover.Body>
                                // </Popover>
                                <Tooltip id="co2-prod-tooltip">Production: {product.co2.production} kg </Tooltip>
                              }
                            >
                              <ProgressBar
                                now={product.co2.production}
                                max={25.5}
                                label={`${product.co2.production} kg`}
                                visuallyHidden
                                variant={this.getVariant((product.co2.production*100/25.5), true)}
                              />
                            </OverlayTrigger>

                            <OverlayTrigger
                              placement="top-end"
                              overlay={<Tooltip id="co2-ship-tooltip">Shipping: {product.co2.shipping} kg </Tooltip>}
                            >
                              <ProgressBar
                                now={product.co2.shipping}
                                max={25.5}
                                label={`${product.co2.shipping} kg`}
                                visuallyHidden
                                variant={this.getVariant((product.co2.shipping*100/25.5), true)}
                              />
                            </OverlayTrigger>
                          </div>}

                          {product.energy && <div className="py-2">
                            <h4>Energy</h4>

                            <OverlayTrigger
                              placement="top-end"
                              overlay={<Tooltip id="energy-prod-tooltip">Production: {product.energy.production} btu </Tooltip>}
                            >
                              <ProgressBar
                                now={product.energy.production}
                                max={10000}
                                label={`${product.energy.production} btu`}
                                visuallyHidden
                                variant={this.getVariant((product.energy.production/100), true)}
                              />
                            </OverlayTrigger>

                            <OverlayTrigger
                              placement="top-end"
                              overlay={<Tooltip id="energy-ship-tooltip">Shipping: {product.energy.shipping} btu </Tooltip>}
                            >
                              <ProgressBar
                                now={product.energy.shipping}
                                max={10000}
                                label={`${product.energy.shipping} btu`}
                                visuallyHidden
                                variant={this.getVariant((product.energy.shipping/100), true)}
                              />
                            </OverlayTrigger>
                          </div>}

                          <Button
                            onClick={() => this.goToPage(`http://localhost:8080/product/tesco/${product.id}`)}
                            variant="link"
                            className="float-end p-0"
                          >
                            Learn more
                          </Button>
                        </Tab.Pane>

                        <Tab.Pane eventKey="alternatives">
                          <ListGroup style={{ maxHeight: '15rem', overflowY: 'auto' }}>
                            {
                              product.alternatives.slice(0, 5).map((alternative: Alternative) => (
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

                          <Button
                            onClick={() => this.goToPage(`http://localhost:8080/product/tesco/${product.id}/alternatives`)}
                            variant="link"
                            className="float-end p-0"
                          >
                            View more
                          </Button>
                        </Tab.Pane>
                      </Tab.Content>
                    </Card.Body>
                  </Card>
                </Tab.Container>
              </>
                )
              : (
              <div className="text-center mb-4">
                <h2>Shop greener!</h2>

                <h6>Visit our homepage or shop at Tesco.</h6>

                {/* <ButtonToolbar> */}
                  <ButtonGroup className="pt-2">
                    <Button
                      variant="outline-light"
                      onClick={() => this.goToPage('http://localhost:8080/')}
                    >
                      Home
                    </Button>
                    <Button
                      variant="outline-light"
                      onClick={() => this.goToPage('https://tesco.com/')}
                    >
                      Tesco
                    </Button>
                  </ButtonGroup>

                  {/* <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search Tesco"
                      aria-label="Search Tesco"
                      value={searchQuery}
                      onChange={this.getSearch}
                    />

                    <Button
                      variant="primary"
                      onClick={() => this.goToPage(`https://www.tesco.com/groceries/en-GB/search?query=${searchQuery}`)}
                    >
                      Go
                    </Button>
                  </InputGroup>
                </ButtonToolbar> */}
              </div>
              )
            )
          )}
        </div>
      </div>
    );
  }
};
