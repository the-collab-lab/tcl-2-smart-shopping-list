import React, { useState } from "react";
import { withFirestore } from "react-firestore";
import "../App.css";
import Navbar from "./Navbar";
import BackButton from "./BackButton";

const AddItem = ({ firestore }) => {
  const [name, setName] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("14");
  const uniqueToken = localStorage.getItem("uniqueToken");

  //   Write item to Firebase setting uniqueToken as document name
  const addItem = (normalizedName, numberOfDays) => {
    // adds new items collection to database
    firestore
      .collection("lists")
      .doc(uniqueToken)
      .set({ items: "" });

    // reference path to specific document from items collection
    // sets document ID equal to item name
    const itemsDocRef = firestore
      .collection("lists")
      .doc(uniqueToken)
      .collection("items")
      .doc(normalizedName);

    // checks whether an existing doc ID is equal to new item name
    itemsDocRef.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        itemsDocRef.onSnapshot(doc => {
          alert("already exists");
        });
      } else {
        itemsDocRef.set({
          name: normalizedName,
          numberOfDays: +numberOfDays
        });
      }
    });
  };

  //   Update state whenever user input changes
  const handleChange = event => {
    setName(event.target.value);
  };

  const handleOptionChange = event => {
    setNumberOfDays(event.target.value);
  };

  // function triggered at handleSubmit -
  // normalizes item name so that it has all lowercase
  // letters and no special characters (spaces ok)
  const normalizeName = name => {
    name = name.toLowerCase();
    let normalizedName = "";
    let alpha = "abcdefghijklmnopqrstuvwxyz ";
    for (let i = 0; i < name.length; i++) {
      if (alpha.includes(name[i])) {
        normalizedName += name.slice(i, i + 1);
      }
    }
    return normalizedName;
  };
  //   Trigger addItem function when "Add Item" button is clicked
  const handleSubmit = event => {
    event.preventDefault();
    let normalizedName = normalizeName(name);
    addItem(normalizedName, numberOfDays);
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

        <div className="daysButtons">
          <p>How soon are you likely to buy it again?</p>
          <input
            type="radio"
            id="soonButton"
            name="daysButtons"
            value="7"
            checked={numberOfDays === "7"}
            onChange={handleOptionChange}
          />
          <label htmlFor="soonButton" id="soonButton">
            Soon
          </label>

          <input
            type="radio"
            id="prettySoonButton"
            name="daysButtons"
            value="14"
            checked={numberOfDays === "14"}
            onChange={handleOptionChange}
          />
          <label htmlFor="prettySoonButton" id="prettySoonButton">
            Pretty Soon
          </label>

          <input
            type="radio"
            id="notSoonButton"
            name="daysButtons"
            value="30"
            checked={numberOfDays === "30"}
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
