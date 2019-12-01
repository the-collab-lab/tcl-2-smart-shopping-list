import React from "react";
import { Redirect } from "react-router-dom";
import { FirestoreCollection } from "react-firestore";
import Navbar from "./Navbar"
import DeleteToken from "./DeleteToken"

// ** NOTES **
// need to update timestamp settings with DB

const FetchItems = (token, setToken) => {
  // console.log(token)
  // console.log(token.value)
  // console.log(token === undefined)
  // console.log(token.value === undefined)
  // console.log(token === null)
  // console.log(!token)
  if (!token) {
    console.log("i'm supposed to go home")
    return <Redirect to="/" />;
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
            <DeleteToken token={token} setToken={setToken}/>
            <Navbar />
          </div>
        );
      }}
    />
  );
};

export default FetchItems;
