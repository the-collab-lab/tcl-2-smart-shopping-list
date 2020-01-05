import React, { useState } from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import dayjs from 'dayjs';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import TopBar from './TopBar';

const ItemDetails = ({ token, setToken, purchased, firestore }) => {
  const [redirect, setRedirect] = useState(false);
  const [isNewItem, setIsNewItem] = useState(true);
  const { itemId } = useParams();
  const concatPath = `/lists/${token}/items`;

  // useLocation() allows us to pass props through react-router Link
  // category holds soon, notSoon... data to modify the styling of <h2> below
  const location = useLocation();
  const category = location.state.buyNext;

  if (!token) return <Redirect to="" />;

  const confirmDeleteClick = event => {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      deleteEntry(event.target.value);
      setRedirect(true);
    }
  };

  const deleteEntry = itemID => {
    firestore
      .collection('lists')
      .doc(token)
      .collection('items')
      .doc(itemID)
      .delete();
  };

  if (redirect) return <Redirect to="" />;

  return (
    <FirestoreCollection
      path={concatPath}
      render={({ isLoading, data }) => {
        // Finds specific item mentioned in url param :itemID so we can pull out just that item's details.
        const item = data.find(x => x.id === itemId);

        if (isLoading) {
          return <div>Still Loading...</div>;
        }

        // Below lines calculate next purchase date using dayjs 'add' function.
        let lastPurchaseDate;
        let nextPurchaseDate;

        if (item.dateOfPurchase) {
          lastPurchaseDate = item.dateOfPurchase.toDate();
          nextPurchaseDate = dayjs(lastPurchaseDate)
            .add(item.numberOfDays.toString(), 'day')
            .toDate();

          setIsNewItem(false);
        }

        return (
          <main>
            <TopBar token={token} setToken={setToken} />
            <div className="detailsContainer">
              <h1 className="detailsHeader">Purchase Details</h1>
              <h2 id="detailsName" className={category + 'details'}>
                {item.name}
              </h2>
              <ul className="itemDetails">
                <li id="itemDetailsSubTitle">
                  Last purchase:{' '}
                  <p id="liItemDetails">
                    {isNewItem ? 'None' : lastPurchaseDate.toDateString()}
                  </p>
                </li>
                <li id="itemDetailsSubTitle">
                  Next purchase:{' '}
                  <p id="liItemDetails">
                    {isNewItem ? 'None' : nextPurchaseDate.toDateString()}
                  </p>
                </li>
                <li id="itemDetailsSubTitle">
                  Number of purchases:
                  <p id="liItemDetails">{item.numberOfPurchases}</p>
                </li>
              </ul>
              <button
                className="button-link"
                onClick={confirmDeleteClick}
                value={item.id}
                id="deleteItemButton"
              >
                Delete this Item?
              </button>
            </div>
            <Navbar />
          </main>
        );
      }}
    />
  );
};

export default withFirestore(ItemDetails);
