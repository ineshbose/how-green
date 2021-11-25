import * as React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import logo from "./logo.svg";
import "./App.css";

export default class App extends React.Component<{}, any> {
  static productID: string;

  constructor(props: any) {
    super(props);
    this.state = {tabs: [], curTescoProductID: "NoProduct"};
    App.productID = "NoProduct";
  }

  componentDidMount() {
    this.getTabs();
    this.getTabURL();
  }

  getTabs() {
    chrome.tabs.query(
      {active: true, lastFocusedWindow: true},
      tabs => this.setState({ tabs: tabs })
    );
  }

  updateTescoProductID(id: string){
    this.setState({ curTescoProductID: id });
  }

  reportTescoProductID = () => {
    if(this.state.curTescoProductID != "NoProduct"){
      alert(this.state.curTescoProductID);
    }
  }

  getTabURL = () => {
    //this.reportTescoProductID();
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      // since only one tab should be active and in the current window at once
      // the return variable should only have one entry
      var activeTab = tabs[0];
      if(activeTab.url != null){
        const urlComponents = activeTab.url.split("/");
        if (urlComponents.includes("www.tesco.com")){
          //alert(App.productID);
          //alert(urlComponents.at(-1));
          App.productID = urlComponents.at(-1)!;
        }
      }
   });
   this.updateTescoProductID(App.productID);
   this.reportTescoProductID();
  }


  raiseScoreClicked(){
    chrome.tabs.create({
      url: 'http://localhost:8080/visualisation'
    });
  }

  raiseAlternativesClicked(){
    chrome.tabs.create({
      url: 'http://localhost:8080/visualisation'
    });
  }

  render() {
    return (
      <Card text="white" style={{ width: '20rem', backgroundColor:'#0DD98F', textAlign: 'center'}}>
        <Card.Img src={logo} />
        <Tabs defaultActiveKey="score" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="score" title="Score">
            <Card.Body>
              {/* Really bad way to do positioning lol
                  For anyone reading this, I know there's
                  probably a better way, but it became a meme*/}
              <Card.Text>
                This Tab will display the score calculated for the user's product page.
              </Card.Text>
              <Card.Text>{"\n"}</Card.Text>
              <Card.Text style={{ fontSize: 40, width: '18rem', color:'green',  backgroundColor:'#FFFFFF', textAlign: 'center'}}>
                76%
              </Card.Text>
              <Card.Text>{"\n"}</Card.Text>
              <Button onClick={this.raiseAlternativesClicked} variant="primary">Alternatives</Button>
                &nbsp;&nbsp;&nbsp;
                <Button onClick={this.raiseScoreClicked} variant="primary">In the Score?</Button>
            </Card.Body>
          </Tab>
          <Tab eventKey="alternatives" title="Alternatives">
            <Card.Body>
                {/* Really bad way to do positioning lol
                    For anyone reading this, I know there's
                    probably a better way, but it became a meme*/}
                <Card.Text>
                  This page will show product alternatives for the current product you are viewing. This page
                  will have some placeholder imagery for the case when a user is not on a product page.
                </Card.Text>
                <Card.Text>{"\n"}</Card.Text>
                <Button onClick={this.getTabURL} variant="primary">Tab URL?</Button>
                &nbsp;&nbsp;&nbsp;
                <Button onClick={this.getTabURL} variant="primary">Tab URL?</Button>
              </Card.Body>
          </Tab>
        </Tabs>
      </Card>
    );
  }
};
