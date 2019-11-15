import React from 'react';

import { FirestoreCollection } from 'react-firestore';

const Collections = (props) => {
    return (
      <FirestoreCollection
          path={'users'}
          render={(isLoading, data) => {
            console.log(data, 'here')
          }}
        />
    )
  
}

export default Collections;