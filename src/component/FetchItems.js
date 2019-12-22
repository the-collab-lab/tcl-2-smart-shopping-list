import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { withFirestore } from 'react-firestore';
import Navbar from './Navbar';
import DeleteToken from './DeleteToken';
import calculateNewPurchaseValues from '../calculations';
import dayjs from 'dayjs';
import SortedLists from './SortedLists';

const FetchItems = ({ token, setToken, firestore }) => {
  const [empty, setEmpty] = useState(true);
  let itemsDocRef;

  if (!token) {
    return <Redirect to="" />;
  } else {
    itemsDocRef = firestore
      .collection('lists')
      .doc(token)
      .collection('items');

    itemsDocRef.get().then(items => {
      setEmpty(items.empty);
    });
  }

  // stores the number of milliseconds elapsed since January 1, 1970
  const now = new Date();
  const today = dayjs(now);

  // function to change database on button click
  const handlePurchase = event => {
    let itemId = event.target.id;
    event.preventDefault();
    itemsDocRef
      .doc(itemId)
      .get()
      .then(doc => {
        return calculateNewPurchaseValues(doc.data());
      })
      .then(updateDatabase);
  };

  const updateDatabase = data => {
    itemsDocRef.doc(data.id).update({
      numberOfDays: data.numberOfDays,
      dateOfPurchase: data.dateOfPurchase,
      numberOfPurchases: data.numberOfPurchases,
    });
  };

  // This function is called from within className prop
  // each time items get rendered & it sets the class
  // based on whether an item has been purchased within
  // the last 24 hours
  const calculateIfPurchased = item => {
    const dateOfPurchaseJS = dayjs(item.dateOfPurchase.toDate());

    if (today.diff(dateOfPurchaseJS, 'hour') <= 24) {
      return 'purchasedItem';
    } else {
      return 'nonPurchasedItem';
    }
  };

  if (empty) {
    return (
      <React.Fragment>
        <Link className="button-link" id="emptyListAddItem" to="/add">
          Add your first Item
        </Link>
        <DeleteToken token={token} setToken={setToken} />
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <SortedLists
          token={token}
          handlePurchase={handlePurchase}
          calculateIfPurchased={calculateIfPurchased}
        />
        <Navbar />
        <DeleteToken token={token} setToken={setToken} />
      </React.Fragment>
    );
  }
};

export default withFirestore(FetchItems);
