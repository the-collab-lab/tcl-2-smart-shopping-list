import React from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

const ItemDetails = () => {
  let { itemId } = useParams();
  const uniqueToken = localStorage.getItem('uniqueToken');
  const concatPath = `/lists/${uniqueToken}/items`;

  return (
    <FirestoreCollection
      /* //name of collection you want to collect, with filter you can narrow this
      down to specific document  */
      path={concatPath}
      render={({ isLoading, data }) => {
        // Renders according to whether or not the list is empty
        const item = data.find(x => x.id === itemId);

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
              <ul className="itemDetails">
                <li>Last purchase date: {lastPurchaseDate.toDateString()}</li>
                <li>Next purchase date: {nextPurchaseDate.toDateString()}</li>
                <li>Number of purchases: {item.numberOfPurchases}</li>
              </ul>
            </main>
          );
        }
      }}
    />
  );
};

export default withFirestore(ItemDetails);