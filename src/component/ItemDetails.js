import React from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';

const ItemDetails = () => {
  let { itemId } = useParams();
  const uniqueToken = localStorage.getItem('uniqueToken');
  const concatPath = `/lists/${uniqueToken}/items`;

  return (
    <FirestoreCollection
      path={concatPath}
      render={({ isLoading, data }) => {
        // Finds specific element where the url param :itemId is equal to the item ID in the list.
        const item = data.find(x => x.id === itemId);

        if (isLoading) {
          return <div>Still Loading...</div>;
        } else {
          // Below lines calculate next purchase date using dayjs 'add' function.
          const lastPurchaseDate = item.dateOfPurchase.toDate();
          const nextPurchaseDate = dayjs(lastPurchaseDate)
            .add(item.numberOfDays.toString(), 'day')
            .toDate();

          return (
            <main>
              <BackButton />
              <h1>{item.name}</h1>
              <ul className="itemDetails">
                <li>Last purchase: {lastPurchaseDate.toDateString()}</li>
                <li>Next purchase: {nextPurchaseDate.toDateString()}</li>
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
