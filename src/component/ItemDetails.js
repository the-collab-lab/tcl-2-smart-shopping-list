import React from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import dayjs from 'dayjs';

const ItemDetails = props => {
  const uniqueToken = localStorage.getItem('uniqueToken');
  const concatPath = `/lists/${uniqueToken}/items`;

  return (
    <FirestoreCollection
      /* //name of collection you want to collect, with filter you can narrow this
      down to specific document  */
      path={concatPath}
      render={({ isLoading, data }) => {
        // Renders according to whether or not the list is empty
        const item = data.find(x => x.id === 'banana');

        if (isLoading) {
          return <div>Still Loading...</div>;
        } else {
          const lastPurchaseDate = item.dateOfPurchase.toDate();
          const nextPurchaseDate = dayjs(lastPurchaseDate)
            .add(item.numberOfDays.toString(), 'day')
            .toDate();

          return (
            <main>
              <h1>{item.name}</h1>
              <p>{lastPurchaseDate.toDateString()}</p>
              <p>{nextPurchaseDate.toDateString()}</p>
            </main>
          );
        }
      }}
    />
  );
};

export default withFirestore(ItemDetails);
