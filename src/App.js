import React, { Component } from "react";
import Fetchitems from "./component/Fetchitems"
import AddItem from "./component/AddItem";

class App extends Component {
  render() {
    return (
      <div>
        <Fetchitems />
        <AddItem />
      </div>
    );
  }
}

export default App;
