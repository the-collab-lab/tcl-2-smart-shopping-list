import React from 'react';
import { withFirestore } from 'react-firestore';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import calculateNewPurchaseValues from '../calculations';

const ListContents = ({ listData, firestore, token }) => {
  const today = new Date();
  const items = listData.items;
  const itemsDocRef = firestore
    .collection('lists')
    .doc(token)
    .collection('items');

  // function to change database on button click
  const handlePurchase = event => {
    let itemId = event.target.id;
    event.preventDefault();
    itemsDocRef
      .doc(itemId)
      .get()
      .then(doc => {
        return calculateNewPurchaseValues(doc.data(), today);
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
    // returns true if item was purchased within last 24 hours
    const wasItemPurchasedToday = today => {
      today = dayjs(today);
      return today.diff(dayjs(item.dateOfPurchase.toDate()), 'hour') <= 24;
    };

    if (item.dateOfPurchase === undefined) {
      return 'nonPurchasedItem';
    } else if (wasItemPurchasedToday(today)) {
      return 'purchasedItem';
    } else {
      return 'nonPurchasedItem';
    }
  };

  return (
    <div className={listData.className}>
      <h2 className="itemsLabel">{listData.label}</h2>
      <ul>
        {items.map(item => (
          <li id={item.id + '-li'} key={item.id} className="listItem">
            <div
              className={calculateIfPurchased(item)}
              onClick={handlePurchase}
              aria-required="true"
              id={item.id}
            >
              {item.name}
            </div>
            <Link className="viewMore" to={'/' + item.id}>
              >>>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default withFirestore(ListContents);
