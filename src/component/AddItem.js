import React, { useState } from "react";
import { withFirestore } from "react-firestore";
import Navbar from "./Navbar"
import BackButton from "./BackButton"

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
    <React.Fragment >
      <BackButton />
      <form className="addForm" onSubmit={handleSubmit}>
        <label className="addFormLabel">
          Add item:
          <input
            value={name}
            type="text"
            id="name"
            onChange={handleChange}
            className="itemInputField"
          />
        </label>
        <button onClick={handleSubmit} className="addItemButton">
          Add Item
        </button>
      </form>
      <Navbar />
    </React.Fragment>
  );
};

export default withFirestore(AddItem);
