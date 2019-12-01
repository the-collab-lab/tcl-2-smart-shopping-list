import React, { useState } from "react";
import { withFirestore } from "react-firestore";
import "../App.css";
import Navbar from "./Navbar"
import BackButton from "./BackButton"

const AddItem = ({ firestore }) => {
  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState("pretty-soon");
  const uniqueToken = localStorage.getItem("uniqueToken");

  //   Write item to Firebase setting uniqueToken as document name
  const addItem = (name, frequency) => {
    firestore
      .collection("lists")
      .doc(uniqueToken)
      .set({ items: "" });

    firestore
      .collection("lists")
      .doc(uniqueToken)
      .collection("items")
      .add({
        name: name,
        frequency: +frequency
      });
  };

  //   Update state whenever user input changes
  const handleChange = event => {
    setName(event.target.value);
  };

  const handleOptionChange = event => {
    setFrequency(event.target.value);
  };

  //   Trigger addItem function when "Add Item" button is clicked
  const handleSubmit = event => {
    event.preventDefault();
    addItem(name, frequency);
    setName("");
  };

  return (

    <React.Fragment>
      <BackButton />
        <form onSubmit={handleSubmit}>
          <label className="addFormLabel">
            New item:
            <input
              value={name}
              type="text"
              id="name"
              onChange={handleChange}
              className="inputField"
            />
          </label>

          <div className="frequencyButtons">
            <p>How soon are you likely to buy it again?</p>
            <input
              type="radio"
              id="soonButton"
              name="frequencyButtons"
              value="7"
              checked={frequency === "soon"}
              onChange={handleOptionChange}
            />
            <label htmlFor="soonButton" id="soonButton">
              Soon
            </label>

            <input
              type="radio"
              id="prettySoonButton"
              name="frequencyButtons"
              value="14"
              checked={frequency === "pretty-soon"}
              onChange={handleOptionChange}
            />
            <label htmlFor="prettySoonButton" id="prettySoonButton">
              Pretty Soon
            </label>

            <input
              type="radio"
              id="notSoonButton"
              name="frequencyButtons"
              value="30"
              checked={frequency === "not-soon"}
              onChange={handleOptionChange}
            />
            <label htmlFor="notSoonButton" id="notSoonButton">
              Not Soon
            </label>
          </div>

          <button onClick={handleSubmit} className="addItemButton">
            Add Item
          </button>
        </form>
      <Navbar />
    </React.Fragment>
  );
};

export default withFirestore(AddItem);
