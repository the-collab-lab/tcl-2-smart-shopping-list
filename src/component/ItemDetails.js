import React from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';
import DeleteItem from './DeleteItem';

const ItemDetails = ({ token, purchased }) => {
  let { itemId } = useParams();
  const concatPath = `/lists/${token}/items`;

  return (
    <FirestoreCollection
      path={concatPath}
      render={({ isLoading, data }) => {
        // Finds specific item mentioned in url param :itemID so we can pull out just that item's details.
        const item = data.find(x => x.id === itemId);

        if (isLoading) {
          return <div>Still Loading...</div>;
        }

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
            <DeleteItem token={token} />
          </main>
        );
      }}
    />
  );
};

export default withFirestore(ItemDetails);
