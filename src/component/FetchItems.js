import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import Navbar from './Navbar';
import DeleteToken from './DeleteToken';
import calculateNewPurchaseValues from '../calculations';
import dayjs from 'dayjs';

const FetchItems = ({ token, setToken, firestore }) => {
  const [empty, setEmpty] = useState(true);

  if (!token) {
    return <Redirect to="" />;
  } else {
    var itemsDocRef = firestore // use var for function scoping
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

  // Token stored in user's local storage
  const uniqueToken = localStorage.getItem('uniqueToken');

  // unique DB path based on token
  const concatPath = `/lists/${uniqueToken}/items`;

  return (
    <React.Fragment>
      <FirestoreCollection
        //name of collection you want to collect, with filter you can narrow this down to specific document
        path={concatPath}
        // optional more parameters (sort, limit, filter)
        render={({ isLoading, data }) => {
          // Renders according to whether or not the list is empty
          if (isLoading) {
            return <div>Still Loading...</div>;
          } else if (empty) {
            return (
              <Link className="button-link" id="emptyListAddItem" to="/add">
                Add your first Item
              </Link>
            );
          } else {
            return (
              <div>
                <h2>Items</h2>
                <ul>
                  {data.map(item => (
                    <li
                      id={item.id}
                      key={item.id}
                      className={calculateIfPurchased(item)}
                    >
                      <div
                        className={item.name}
                        onClick={handlePurchase}
                        id={item.id}
                      >
                        {item.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        }}
      />
      <DeleteToken token={token} setToken={setToken} />
      <Navbar />
    </React.Fragment>
  );
};

export default withFirestore(FetchItems);
