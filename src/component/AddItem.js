import React, { useState } from "react";
import { withFirestore } from "react-firestore";
import '../App.css';

const AddItem = ({ firestore }) => {
  const [name, setName] = useState("");
  // const [frequency, setFrequency] = useState("");

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
      .add({ name });
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
      <div className="frequencyButtons">
        <p>How soon are you likely to buy it again?</p>
        <label className="soonButton">
          <input type="radio" name="frequencyButtons" value="soon" />
          Soon
        </label>
        <label className="prettySoonButton">
          <input type="radio" name="frequencyButtons" value="pretty-soon" />
          Pretty Soon
        </label>
        <label className="notSoonButton">
          <input type="radio" name="frequencyButtons" value="not-soon" />
          Not Soon
        </label>
      </div>
      <br />
      <button onClick={handleSubmit} className="addItemButton">
        Add Item
      </button>
    </form>
  );
};

export default withFirestore(AddItem);
