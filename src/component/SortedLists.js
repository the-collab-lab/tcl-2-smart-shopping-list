import React from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import dayjs from 'dayjs';
import ListContents from './ListContents';
import { Link } from 'react-router-dom';

const SortedList = ({ token, handlePurchase, calculateIfPurchased }) => {
  const concatPath = `/lists/${token}/items`;
  const now = new Date();
  const today = dayjs(now);

  return (
    <section className="listFrame">
      <h1 className="listTitle">
        <span
          role="img"
          className="shoppingCart"
          aria-label="Illustration of a shopping cart"
        >
          &#128722;
        </span>
        My Shopping List
      </h1>
      {/* could also use &#128717; which is shopping bags */}

      <FirestoreCollection
        path={concatPath}
        sort="numberOfDays:asc"
        render={({ isLoading, data }) => {
          if (isLoading) {
            return <div>Still Loading...</div>;
          } else {
            const filteredItems = {
              soon: [],
              prettySoon: [],
              notSoon: [],
              inactive: [],
            };

            const inActive = item => {
              const doubleEstimate = item.numberOfDays * 2;
              const lastPurchaseDate = item.dateOfPurchase.toDate();
              const doublePurchaseEstimate = dayjs(lastPurchaseDate)
                .add(doubleEstimate.toString(), 'day')
                .toDate();

              if (dayjs(doublePurchaseEstimate) < today) {
                return item;
              }
            };

            data.map(item => {
              if (inActive(item)) {
                filteredItems.inactive.push(item);
              } else if (item.numberOfDays <= 7) {
                filteredItems.soon.push(item);
              } else if (item.numberOfDays > 7 && item.numberOfDays < 30) {
                filteredItems.prettySoon.push(item);
              } else if (item.numberOfDays >= 30) {
                filteredItems.notSoon.push(item);
              }
            });

            return (
              <React.Fragment>
                <div className="soonItems">
                  <h2 className="itemsLabel">Soon Items</h2>
                  <ListContents
                    data={filteredItems.soon}
                    calculateIfPurchased={calculateIfPurchased}
                    handlePurchase={handlePurchase}
                  />
                </div>
                <div className="prettySoonItems">
                  <h2 className="itemsLabel">Pretty-Soon Items</h2>
                  <ListContents
                    data={filteredItems.prettySoon}
                    calculateIfPurchased={calculateIfPurchased}
                    handlePurchase={handlePurchase}
                  />
                </div>
                <div className="notSoonItems">
                  <h2 className="itemsLabel">Not-Soon Items</h2>
                  <ListContents
                    data={filteredItems.notSoon}
                    calculateIfPurchased={calculateIfPurchased}
                    handlePurchase={handlePurchase}
                  />
                </div>
                <div className="inactiveItems">
                  <h2 className="itemsLabel">Inactive Items</h2>
                  <ListContents
                    data={filteredItems.inactive}
                    calculateIfPurchased={calculateIfPurchased}
                    handlePurchase={handlePurchase}
                  />
                </div>
              </React.Fragment>
            );
          }
        }}
      />
    </section>
  );
};

export default withFirestore(SortedList);
