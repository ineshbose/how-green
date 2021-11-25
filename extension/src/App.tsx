import * as React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import logo from "./logo.svg";
import "./App.css";

export default class App extends React.Component<{}, any> {
  // Oh YeS a GlObAl VaRiAbLe We LoVe ThEm
  static productID: string;

  // Our constructor for our Reac component
  constructor(props: any) {
    super(props);
    this.state = {tabs: [], curTescoProductID: "NoProduct"};
    App.productID = "NoProduct";
  }

  /**
   * Here go all the things we want to happen when the component is
   * first mounted. Specifically, this refers to setting a listener 
   * to get the URL from the active tab every 4 seconds (this is arbitrary).
   */
  componentDidMount() {
    this.getTabs();
    this.getTabURL();
    setInterval(this.getTabURL, 500); // runs every 0.5 seconds.
  }

  // Function which gets all chrome tabs open - currently unused
  getTabs() {
    chrome.tabs.query(
      {active: true, lastFocusedWindow: true},
      tabs => this.setState({ tabs: tabs })
    );
  }

  // Function which updates the current tesco product ID in App state
  updateTescoProductID(id: string){
    this.setState({ curTescoProductID: id });
  }

  // Function which retrieves the current tesco product ID from App state
  reportTescoProductID = () => {
    // We need to make sure that the product ID has been set and isn't undefined
    if(typeof this.state.curTescoProductID === "undefined"){
      alert("Couldn't find a product ID, please try again!");
    }
    else{
      return(this.state.curTescoProductID);
    }
  }

  /**
   * Function which queries the available chrome tabs and returns the one
   * that's currently active. It then checks whether the active tab is a 
   * tesco.com page, if yes, it extracts the product ID from the URL and saves
   * this to the application state with the help of a global variable.
   * Is probably doable otherwise, but I think we need to update the manifest and
   * a bunch of other stuff which could be a nightmare!
   */
  getTabURL = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

      // since only one tab should be active and in the current window at once
      // the return variable should only have one entry
      var activeTab = tabs[0];
      if(activeTab.url != null){
        const urlComponents = activeTab.url.split("/");

        // Save to global variable from async so we can capture this to state
        if (urlComponents.includes("www.tesco.com")){
          App.productID = urlComponents.at(-1)!;
        }
      }
   });

   // Update our App state
   this.updateTescoProductID(App.productID);
  }

  /**
   * Function responsible for handling the "what's in the score" button.
   * Finds the current Tesco Product ID and creates a URL to visit in a new tab.
   */
  raiseScoreClicked = () => {
    //alert("Score clicked");

    // We need to make sure that the product ID has been set and isn't undefined
    if(typeof this.reportTescoProductID() === "undefined"){
      alert("Couldn't find a product ID, please try again!");
    }

    else{

      // Make sure the found ID is valid, i.e., not NoProduct (the starting default)
      if(this.reportTescoProductID() != "NoProduct"){
        //alert("We have a product ID");
        //alert(this.reportTescoProductID());

        // Brew up a nice URL to visit and open it in a new tab
        let scoreUrl = 'http://localhost:8080/product/tesco/' + this.reportTescoProductID();
        chrome.tabs.create({
          url: scoreUrl
        });
      }
      else{
        alert("Couldn't find a product ID, please try again!");
      }
    }
  }

  /**
   * Function responsible for handling the "product alternatives" button.
   * Finds the current Tesco Product ID and creates a URL to visit in a new tab
   * shwoing the alternatives for that product.
   */
  raiseAlternativesClicked(){
    chrome.tabs.create({
      url: 'http://localhost:8080/visualisation'
    });
  }

  /**
   * Function responsible for handling the alternatives presented on the extension.
   * Should do a search on Tesco for a key word from the product (how do we get that?)
   * Aka, how do I get 'pizza' from 'Tesco Finest Ham Mushroom Mascarpone Pizza 450G'??
   * Once we've done the search, should get back a search result list where we can just
   * take the links and pop them into the view.
   * 
   * Right now this just takes you to Garlic & Parsley -- hardcoded af.
   */
     raiseAlternativeClicked(){
      chrome.tabs.create({
        url: 'https://www.tesco.com/groceries/en-GB/products/296481201'
      });
    }

  // Standard render method to return our React Component
  render() {
    let id = this.reportTescoProductID();
    return (
      <Card text="white" style={{ width: '20rem', backgroundColor:'#0DD98F', textAlign: 'center'}}>
        <Card.Img src={logo} />
        <Tabs defaultActiveKey="score" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="score" title="Score">
            <Card.Body>
              <Card.Text>
                This Tab will display the score calculated for the user's product page.
              </Card.Text>
              <Card.Text>{"\n"}</Card.Text>
              <Card.Text style={{ fontSize: 40, width: '18rem', color:'green',  backgroundColor:'#FFFFFF', textAlign: 'center'}}>
                76%
              </Card.Text>
              <div>
                <h1>Hello!</h1>
                {typeof id === "string" &&
                  <h2>
                    You are visiting {id} tesco product.
                  </h2>
                }
              </div>
              <Card.Text>{"\n"}</Card.Text>
              <Button onClick={this.raiseAlternativesClicked} variant="primary">Alternatives</Button>
                &nbsp;&nbsp;&nbsp;
                <Button onClick={this.raiseScoreClicked} variant="primary">In the Score?</Button>
            </Card.Body>
          </Tab>
          <Tab eventKey="alternatives" title="Alternatives">
            <Card.Body>
                <Card.Text>
                  Some quick alternative products you can choose!
                </Card.Text>
                <Card.Text>{"\n"}</Card.Text>
                <ListGroup>
                  <ListGroup.Item action onClick={this.raiseAlternativeClicked}>Cras justo odio  - 78%</ListGroup.Item>
                  <ListGroup.Item action onClick={this.raiseAlternativeClicked}>Dapibus ac facil - 72%</ListGroup.Item>
                  <ListGroup.Item action onClick={this.raiseAlternativeClicked}>Morbi leo risus  - 69%</ListGroup.Item>
                  <ListGroup.Item action onClick={this.raiseAlternativeClicked}>Porta ac consecti- 64%</ListGroup.Item>
                  <ListGroup.Item action onClick={this.raiseAlternativeClicked}>Vestibulum at ero- 57%</ListGroup.Item>
                </ListGroup>
              </Card.Body>
          </Tab>
        </Tabs>
      </Card>
    );
  }
};
