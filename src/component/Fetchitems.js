import React from 'react';
import { FirestoreCollection } from 'react-firestore';

// ** NOTES **
// if i put in the wrong path it still loads the 2nd option on my tereniary operator 
// if someone adds a new collection, how do i get it to fetch that collection.
// need to update timestamp settings with DB

const Fetchitems = (props) => {
  return (
    //fetches specific collection, refreshes every time database chages
    <FirestoreCollection
    //name of collection you want to collect, with filter you can narrow this down to specific document
          path="items"
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
              </div>
            );
          }}
      />
  )
  
}

export default Fetchitems;