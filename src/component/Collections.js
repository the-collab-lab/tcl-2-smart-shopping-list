import React from 'react';
import { FirestoreCollection } from 'react-firestore';

// if i put in the wrong path it still loads the 2nd option on my tereniary operator 

const Collections = (props) => {
  return (
    //fetches specific collection, refreshes every time database chages
    <FirestoreCollection
    //name of collection you want to collect, with filter you can narrow this down to specific document
          path="cities"
          // optional more parameters (sort, limit, filter)
          render={({ isLoading, data }) => {
            // if data is taking too long you can redirect or alert user it's still loading (i think)
            return isLoading ? (
              <div>still loading</div>
            ) : (
              <div>
                <h1>Collections</h1>
                <h2>Cities</h2>
                <ul>
                  {data.map(city => (
                    <li key={city.id}>
                      {city.id}
                      {city.pop}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }}
/>

          
  )
  
}

export default Collections;