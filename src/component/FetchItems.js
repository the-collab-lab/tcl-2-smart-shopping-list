import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import Navbar from './Navbar';
import DeleteToken from './DeleteToken';

const FetchItems = ({ token, setToken, firestore }) => {
  const [empty, setEmpty] = useState(true);
  const today = new Date();
  const itemsDocRef = firestore
    .collection('lists')
    .doc(token)
    .collection('items');

  useEffect((today, itemID, itemsDocRef) => {
    // all dates in milliseconds from UTC
    const appVisitDate = Date.now();
    const purchaseDate = Date.parse(today);
    const twentyFourHours = 86400000;
    if (appVisitDate - purchaseDate > twentyFourHours) {
      itemsDocRef.doc(itemID).update({
        purchased: false,
      });
    }
  }, []);

  // function to change database on button click
  const handlePurchase = event => {
    updateDatabase(event.target.id);
  };

  // connect numberOfDays & nextPurchaseDate to estimate.js function
  // update numberOfPurchases with correct number
  const updateDatabase = itemId => {
    itemsDocRef.doc(itemId).update({
      numberOfDays: 300,
      dateOfPurchase: today,
      numberOfPurchases: +1,
      nextPurchaseDate: 7000,
      purchased: true,
    });
  };

  if (!token) {
    return <Redirect to="" />;
  } else {
    firestore
      .collection('lists')
      .doc(token)
      .collection('items');
    itemsDocRef.get().then(items => {
      setEmpty(items.empty);
    });
  }
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
                <ul className="itemsList">
                  {data.map(item => (
                    <li
                      key={item.id}
                      className={item.purchased ? 'purchasedItem' : null}
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
