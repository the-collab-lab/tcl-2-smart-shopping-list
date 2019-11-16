import React, { useState } from "react";
import { withFirestore } from "react-firestore";

const AddItem = ({ firestore }) => {
  const [name, setName] = useState("");

  //   Write item to Firebase
  const addItem = name => {
    firestore.collection("items").add({ name });
  };

  //   Update state whenever user input changes
  const handleChange = event => {
    setName(event.target.value);
  };

  //   Trigger addItem function when "Add Item" button is clicked
  const handleSubmit = event => {
    event.preventDefault();
    addItem(name);
    console.log(name);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Add Item:
          <input value={name} type="text" id="name" onChange={handleChange} />
        </label>
        <button onClick={handleSubmit}>Add Item</button>
      </form>
    </div>
  );
};

export default withFirestore(AddItem);
