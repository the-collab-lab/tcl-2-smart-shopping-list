import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import Navbar from './Navbar';
import DeleteToken from './DeleteToken';

const FetchItems = ({ token, setToken, firestore }) => {
  const [empty, setEmpty] = useState(true);
  // another use of state, which will show if the box is checked or not
  // need to think of descriptive names...
  const [checked, setChecked] = useState(false);

  // framework of some kind of function to run when the checkbox is clicked
  function checkBox() {
    if (!checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
    console.log('changed the checkbox');
  }

  // function to run every time the view renders, which will check each item and see if it is checked and also
  // if it has been 24 hours since it was checked (which we can base off of the other team's dateOfPurchase)
  // if (item.checked) {
  // // and still checked will need to look at firestore, at the item, and see if it has been 24 hours
  // }

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
                      <input
                        type="checkbox"
                        className="purchasedCheck"
                        onClick={checkBox}
                      />
                      <div className={item.name}>{item.name}</div>
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
