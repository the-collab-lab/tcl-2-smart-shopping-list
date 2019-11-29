import React, { useState } from "react";
import { withFirestore } from "react-firestore";
import BuyFrequencyButtons from "./BuyFrequencyButtons";

const AddItem = ({ firestore }) => {
  const [name, setName] = useState("");

  //   Write item to Firebase setting uniqueToken as document name

  const uniqueToken = localStorage.getItem("uniqueToken");

  const addItem = name => {
    firestore
      .collection("lists")
      .doc(uniqueToken)
      .set({ items: "" });

    firestore
      .collection("lists")
      .doc(uniqueToken)
      .collection("items")
      .add({ name, buyFrequency });
  };

  //   Update state whenever user input changes
  const handleChange = event => {
    setName(event.target.value);
  };

  //   Trigger addItem function when "Add Item" button is clicked
  const handleSubmit = event => {
    event.preventDefault();
    addItem(name);
    setName("");
    // alert("item added to database!");
  };

  // buyFrequency holds the string that will be stored in the database
  const [buyFrequency, setBuyFrequency] = useState("");

  // frequency button handlers that update the value of buyFrequency
  const soonClickedHandler = () => {
    setBuyFrequency("Soon");
  };

  const prettySoonClickedHandler = () => {
    setBuyFrequency("Pretty soon");
  };

  const notSoonClickedHandler = () => {
    setBuyFrequency("Not soon");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        New item:
        <input
          value={name}
          type="text"
          id="name"
          onChange={handleChange}
          className="inputField"
        />
      </label>
      <br />
      <BuyFrequencyButtons
        soonClicked={soonClickedHandler()}
        prettySoonClicked={prettySoonClickedHandler()}
        notSoonClicked={notSoonClickedHandler()}
      />
      <br />
      <button onClick={handleSubmit} className="addItemButton">
        Add Item
      </button>
    </form>
  );
};

export default withFirestore(AddItem);
