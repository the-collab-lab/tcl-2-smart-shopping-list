import React from "react";

const BuyFrequencyButtons = () => {
  const divStyle = { marginTop: "100px" };
  const soon = { backgroundColor: "#f6f7d7" };
  const prettySoon = { backgroundColor: "#ff9a00" };
  const notSoon = { backgroundColor: "#ff165d" };

  return (
    <div style={divStyle}>
      <p>How soon are you likely to buy it again?</p>
      <button style={soon}>Soon</button>
      <button style={prettySoon}>Pretty soon</button>
      <button style={notSoon}>Not soon</button>
    </div>
  );
};

export default BuyFrequencyButtons;
