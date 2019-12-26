import React, { useState } from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import dayjs from 'dayjs';
import { useParams, Redirect } from 'react-router-dom';
import BackButton from './BackButton';

const ItemDetails = ({ token, purchased, firestore }) => {
  const [redirect, setRedirect] = useState(false);
  const { itemId } = useParams();
  const concatPath = `/lists/${token}/items`;

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
        const lastPurchaseDate = item.dateOfPurchase.toDate();
        const nextPurchaseDate = dayjs(lastPurchaseDate)
          .add(item.numberOfDays.toString(), 'day')
          .toDate();

        return (
          <main>
            <BackButton />
            <h1>{item.name}</h1>
            <ul className="itemDetails">
              <li>Last purchase: {lastPurchaseDate.toDateString()}</li>
              <li>Next purchase: {nextPurchaseDate.toDateString()}</li>
              <li>Number of purchases: {item.numberOfPurchases}</li>
            </ul>
            <button
              className="button-link"
              onClick={confirmDeleteClick}
              value={item.id}
              id="deleteItemButton"
            >
              Delete this Item?
            </button>
          </main>
        );
      }}
    />
  );
};

export default withFirestore(ItemDetails);
