import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { FirestoreCollection, withFirestore } from "react-firestore";
import Navbar from "./Navbar";
import DeleteToken from "./DeleteToken";

// ** NOTES **
// need to update timestamp settings with DB

const FetchItems = ({ token, setToken, firestore }) => {
  const [empty, setEmpty] = useState(true);

  if (!token) {
    return <Redirect to="" />;
  } else {
    firestore
    .collection('lists')
    .doc(token)
    .collection('items')
    .get().then(items => { setEmpty(items.empty) })
  }

  // Token stored in user's local storage
  const uniqueToken = localStorage.getItem("uniqueToken");

  // unique DB path based on token
  const concatPath = `/lists/${uniqueToken}/items`;

  return (
    <React.Fragment>
      <FirestoreCollection
        //name of collection you want to collect, with filter you can narrow this down to specific document
        path={concatPath}
        // optional more parameters (sort, limit, filter)
        render={({ isLoading, data }) => {
          // if data is taking too long you can redirect or alert user it's still loading (i think)
          if (isLoading) {
            return <div>Still Loading...</div>
          } else if (empty) {
            return <Link className="emptyAddItemButton" to="/add">Add your first Item</Link>
          } else {
            return (
              <div>
                <h2>Items</h2>
                <ul>
                  {data.map(item => (
                    <li key={item.id}>
                      <div className={item.name}>{item.name}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
        }}
        
        />
      <DeleteToken token={token} setToken={setToken} />
      <Navbar />
    </React.Fragment>
  );
};

export default withFirestore(FetchItems);
