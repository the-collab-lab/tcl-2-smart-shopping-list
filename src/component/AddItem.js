import React, { useState } from 'react';
import { withFirestore } from 'react-firestore';
import '../App.css';
import Navbar from './Navbar';
import DuplicateMessage from './DuplicateMessage';
import TopBar from './TopBar';
import { Redirect } from 'react-router-dom';

const AddItem = ({ token, setToken, firestore }) => {
  const [name, setName] = useState('');
  const [duplicate, setDuplicate] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const uniqueToken = localStorage.getItem('uniqueToken');
  const today = new Date();

  // consts and state used for the numberOfDays buttons
  const soon = '7';
  const prettySoon = '14';
  const notSoon = '30';
  const [numberOfDays, setNumberOfDays] = useState(prettySoon);

  //   Write item to Firebase setting uniqueToken as document name
  const addItem = (normalizedName, numberOfDays) => {
    let nextPurchase = new Date();
    nextPurchase.setDate(today.getDate() + parseInt(numberOfDays));
    // adds new items collection to database
    firestore
      .collection('lists')
      .doc(uniqueToken)
      .set({ items: '' });

    // reference path to specific document from items collection
    // sets document ID equal to item name
    const itemsDocRef = firestore
      .collection('lists')
      .doc(uniqueToken)
      .collection('items')
      .doc(normalizedName);

    // checks whether an existing doc ID is equal to new item name
    itemsDocRef.get().then(docSnapshot => {
      if (docSnapshot.exists) {
        let timeWindowBeforeRefresh = 2500;
        itemsDocRef.onSnapshot(doc => {
          setDuplicate(true);
          setTimeout(function() {
            setDuplicate(false);
          }, timeWindowBeforeRefresh);
        });
      } else {
        itemsDocRef.set({
          id: normalizedName,
          name: name,
          numberOfDays: +numberOfDays,
          numberOfPurchases: 0,
        });
        setName('');
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
    name = name.toLowerCase().trim();
    let normalizedName = '';
    let symbol = `.,;:!?"`;
    for (let i = 0; i < name.length; i++) {
      if (!symbol.includes(name[i])) {
        normalizedName += name.slice(i, i + 1);
      }
    }
    return normalizedName;
  };

  //   Trigger addItem function when "Add Item" button is clicked
  const handleSubmit = event => {
    event.preventDefault();
    let normalizedName = normalizeName(name);
    // This conditional allows the add button to be accidentally clicked
    // while the form is empty without throwing an error
    if (normalizedName === '') {
      return;
    } else {
      addItem(normalizedName, numberOfDays);
    }

    if (event.target.id == 'go-to-list') setRedirect(true);
  };

  if (redirect) return <Redirect to="" />;

  return (
    <React.Fragment>
      <TopBar token={token} setToken={setToken} />

      <h1>Add New Item</h1>
      <form onSubmit={handleSubmit} className="add-item-form">
        <label>
          Item name:
          <input
            value={name}
            type="text"
            id="name"
            className="inputField"
            onChange={handleChange}
          />
        </label>

        <div className="daysButtons">
          <p>How soon are you likely to buy it?</p>
          <input
            type="radio"
            id="soonButton"
            name="daysButtons"
            value={soon}
            checked={numberOfDays === soon}
            onChange={handleOptionChange}
          />
          <label htmlFor="soonButton" id="soonButton">
            Soon
          </label>

          <input
            type="radio"
            id="prettySoonButton"
            name="daysButtons"
            value={prettySoon}
            checked={numberOfDays === prettySoon}
            onChange={handleOptionChange}
          />
          <label htmlFor="prettySoonButton" id="prettySoonButton">
            Pretty Soon
          </label>

          <input
            type="radio"
            id="notSoonButton"
            name="daysButtons"
            value={notSoon}
            checked={numberOfDays === notSoon}
            onChange={handleOptionChange}
          />
          <label htmlFor="notSoonButton" id="notSoonButton">
            Not Soon
          </label>
        </div>

        <div className="submit-buttons">
          <button
            onClick={handleSubmit}
            className={'button-link add-item-button'}
            id="addItemButton"
          >
            Add Item
          </button>
          <button
            onClick={handleSubmit}
            className={'button-link add-item-button'}
            id="go-to-list"
          >
            Add &amp; Go To List
          </button>
        </div>
      </form>
      <Navbar />
      {duplicate ? <DuplicateMessage /> : null}
    </React.Fragment>
  );
};

export default withFirestore(AddItem);
