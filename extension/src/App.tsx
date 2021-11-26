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

export default class App extends React.Component<{}, any> {

  constructor(props: any) {
    super(props);
    this.state = {tabs: [], productID: "", alternatives: []};
  }

  async componentDidMount() {
    await this.getTabURL();
    this.getAlternatives();
    setInterval(this.getTabURL, 500); // runs every 0.5 seconds.
  }

  reportTescoProductID = () => {
    return this.state.productID || alert("Couldn't find a product ID, please try again!");
  }

  async getTabURL() {
    await chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      var activeTab = tabs[0];
      if (activeTab.url && activeTab.url.includes("tesco.com")) {
        this.setState({ productID: activeTab.url.split("?")[0].split("/").pop() });
      }
   });
  }

  getAlternatives() {
    this.setState({
      alternatives: [
        {
          "id": "296481201",
          "name": "Cras justo odio",
          "score": 78,
        },
        {
          "id": "296481201",
          "name": "Cras justo odio",
          "score": 78,
        },
        {
          "id": "296481201",
          "name": "Cras justo odio",
          "score": 78,
        },
      ]
    })
  }

  render() {
    const { productID, alternatives } = this.state;
    return (
      <Card text="white" style={{ width: '20rem', backgroundColor:'#0DD98F', textAlign: 'center'}}>
        {
          (!productID
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
                  <h2>
                    {productID} <Badge bg="light" text="dark">76%</Badge>
                  </h2>
                  <Button onClick={() => chrome.tabs.create({ url: `http://localhost:8080/product/tesco/${productID}/visualisation`})} variant="primary">Alternatives</Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button onClick={() => chrome.tabs.create({ url: `http://localhost:8080/product/tesco/${productID}` })} variant="primary">In the Score?</Button>
                </Card.Body>
              </Tab>
              <Tab eventKey="alternatives" title="Alternatives">
                <Card.Body>
                  <ListGroup>
                    {
                      alternatives.map((alternative: Alternative) => (
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
