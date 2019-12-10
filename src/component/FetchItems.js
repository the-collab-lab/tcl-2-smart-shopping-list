import React, { useState } from 'react';
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
    .collection('items')

  // function to change database on button click
  const handlePurchase = event => {
    event.preventDefault();
    updateDatabase(event.target.id)
  }

  // connect numberOfDays & nextPurchaseDate to estimate.js function
  // update numberOfPurchases with correct number
  const updateDatabase = (itemId) => {
    itemsDocRef
      .doc(itemId)
      .update({
        numberOfDays: 300,
        dateOfPurchase: today,
        numberOfPurchases : +1,
        nextPurchaseDate: 7000
      })
  }

  if (!token) {
    return <Redirect to="" />;
  } else {
    itemsDocRef
      .get()
      .then(items => {
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
                    <li key={item.id}>
                      <div className={item.name}>
                        {item.name}
                        <button onClick={handlePurchase} className='button-link' id={item.id}>Purchase</button>
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
