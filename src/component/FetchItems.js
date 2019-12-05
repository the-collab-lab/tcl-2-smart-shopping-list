import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { FirestoreCollection, withFirestore } from "react-firestore";
import Navbar from "./Navbar";
import DeleteToken from "./DeleteToken";

// ** NOTES **
// need to update timestamp settings with DB

const FetchItems = ({ token, setToken, firestore }) => {
  const [empty, setEmpty] = useState(true);

  const checkForEmpty = () => {
    // check database and return true or false depending on empty OR set state

    firestore
      .collection('lists')
      .doc(token)
      .collection('items')
      .get().then(items => {
        if (items.empty) {
          console.log('There are no items!');
          setEmpty(true)
          console.log(empty)

        } else {
          console.log('There are items')
          setEmpty(false)
          console.log(empty)
        }
      })
  }

  if (!token) {
    return <Redirect to="/" />;
  }

  if (empty) {
    // return <button function component>
    return (
      <Link className="emptyAddItemButton" to="/add">Add your first Item</Link>
    )
  }

  // Token stored in user's local storage
  const uniqueToken = localStorage.getItem("uniqueToken");

  // unique DB path based on token
  const concatPath = `/lists/${uniqueToken}/items`;

  return (
    //fetches specific collection, refreshes every time database chages
    <FirestoreCollection
      //name of collection you want to collect, with filter you can narrow this down to specific document
      path={concatPath}
      // optional more parameters (sort, limit, filter)
      render={({ isLoading, data }) => {
        // if data is taking too long you can redirect or alert user it's still loading (i think)
        return isLoading ? (
          <div>still loading</div>
        ) : (
          <div>
            <h2>Items</h2>

            <ul>
              {data.map(item => (
                <li key={item.id}>
                  <div className={item.name}>{item.name}</div>
                </li>
              ))}
            </ul>
            
            <DeleteToken token={token} setToken={setToken} />
            <Navbar />
            { checkForEmpty() }
          </div>
        );
      }}
    />
  );
};

export default withFirestore(FetchItems);
