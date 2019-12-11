import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import Navbar from './Navbar';
import DeleteToken from './DeleteToken';

const FetchItems = ({ token, setToken, firestore }) => {
  const [empty, setEmpty] = useState(true);
  const [purchased, setPurchased] = useState(false);


// 86,400 is 24 hours in milliseconds

  function test() {
    const purchaseTime = Date.now();
    const timePassed = 86400;
    const testTimePassed = 3;
    setPurchased(true);
    console.log(purchased)

    // console.log(Date.now() - purchaseDay)

    if (Date.now() >= (purchaseTime + testTimePassed)) {
      console.log("it worked")
    } 

  }

  // this conditional determines whether to show the home view or the list view
  if (!token) {
    return <Redirect to="" />;
  } else {
    firestore
      .collection('lists')
      .doc(token)
      .collection('items')
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
              <div className="fetchItemsSection">
                <h2>Items</h2>
                <ul className="itemsList">
                  {data.map(item => (
                    <li key={item.id}>
                      <div className={item.name} onClick={test}>{item.name}</div>
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
