import * as React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import logo from "./logo.svg";
import "./App.css";

export default class App extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = {tabs: []};
  }

  componentDidMount() {
    this.getTabs();
  }

  getTabs() {
    chrome.tabs.query(
      {active: true, lastFocusedWindow: true},
      tabs => this.setState({ tabs: tabs })
    );
  }

  render() {
    return (
      <Card text="white" style={{ width: '18rem', backgroundColor:'#0DD98F', textAlign: 'center'}}>
        <Card.Img src={logo} />
          <Card.Body>
            {/* Really bad way to do positioning lol
                For anyone reading this, I know there's
                probably a better way, but it became a meme*/}
            <Card.Text>
              Here's a really crappy implementation of our prototype. This should be the screen when 
              people click on the browser extension. This should be separate from the popup that is shown 
              when on the Tesco page.
            </Card.Text>
            <Card.Text>{"\n"}</Card.Text>
            <Button variant="primary">Alternatives</Button>
            &nbsp;&nbsp;&nbsp;
            <Button variant="primary">Score?</Button>
          </Card.Body>

      </Card>
    );
  }
};
