import React from "react";

const BuyFrequencyButtons = props => {
  // Just inline styling
  const divStyle = { marginTop: "100px" };
  const soon = { backgroundColor: "#f6f7d7" };
  const prettySoon = { backgroundColor: "#ff9a00" };
  const notSoon = { backgroundColor: "#ff165d" };

  return (
    <div style={divStyle}>
      <p>How soon are you likely to buy it again?</p>
      <button style={soon} onClick={props.soonClicked}>
        Soon
      </button>
      <button style={prettySoon} onClick={props.prettySoonClicked}>
        Pretty soon
      </button>
      <button style={notSoon} onClick={props.notSoonClicked}>
        Not soon
      </button>
    </div>
  );
};

export default BuyFrequencyButtons;
