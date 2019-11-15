import React from 'react';
import { FirestoreCollection } from 'react-firestore';

const Collections = (props) => {
  return (
    <FirestoreCollection
          path="cities"
          render={({ isLoading, data }) => {
            return isLoading ? (
              <div>hello two</div>
            ) : (
              <div>
                <h1>Stories</h1>
                <ul>
                  {data.map(story => (
                   console.log(story, 'here')
                  ))}
                </ul>
              </div>
            );
          }}
/>
  )
  
}

export default Collections;