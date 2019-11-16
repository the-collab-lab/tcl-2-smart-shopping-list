import React, { Component } from "react";

import Collections from "./component/Collections";
import AddItem from "./component/AddItem";

class App extends Component {
  render() {
    return (
      <div>
        <Collections />
        <AddItem />
      </div>
    );
  }
}

export default App;
