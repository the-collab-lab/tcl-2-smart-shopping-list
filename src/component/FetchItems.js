import React from "react";
import { FirestoreCollection } from "react-firestore";
import Navbar from "./Navbar"

// ** NOTES **
// need to update timestamp settings with DB

const FetchItems = props => {
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
            <Navbar />
          </div>
        );
      }}
    />
  );
};

export default FetchItems;
