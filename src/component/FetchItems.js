import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import Navbar from './Navbar';
import DeleteToken from './DeleteToken';

const FetchItems = ({ token, setToken, firestore }) => {
  const [empty, setEmpty] = useState(true);
  const today = Date.now();

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
      .then(dataPull)
      .then(updateDatabase);
  };

  const dataPull = doc => {
    let data = doc.data();
    return {
      id: data.id,
      dateOfPurchase: data.dateOfPurchase,
    };
  };

  const updateDatabase = data => {
    itemsDocRef.doc(data.id).update({
      purchasedWithinLastDay: true,
      dateOfPurchase: today,
    });
  };

  const calculateIfPurchased = item => {
    if (item.purchasedWithinLastDay) {
      let now = today;
      let dateOfPurchase = item.dateOfPurchase;
      let hourInMilliseconds = 3600000;
      console.log('now:' + now);
      console.log('date of purchase seconds: ' + dateOfPurchase);
      if (now - dateOfPurchase >= 24 * hourInMilliseconds) {
        return 'nonPurchasedItem';
      } else {
        return 'purchasedItem';
      }
    } else {
      return 'nonPurchasedItem';
    }
  };

  if (!token) {
    return <Redirect to="" />;
  } else {
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
