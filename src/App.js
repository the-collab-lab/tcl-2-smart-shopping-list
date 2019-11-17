import React, { Component } from "react";
import FetchItems from "./component/FetchItems";
import AddItem from "./component/AddItem";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <FetchItems />
        <AddItem />
      </React.Fragment>
    );
  }
}

export default App;
