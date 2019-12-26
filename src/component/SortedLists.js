import React, { useState, useEffect } from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import dayjs from 'dayjs';
import ListContents from './ListContents';

const SortedList = ({ token, handlePurchase, calculateIfPurchased }) => {
  const concatPath = `/lists/${token}/items`;
  const now = new Date();
  const today = dayjs(now);
  const [filteredItem, setFilteredItem] = useState('');

  useEffect(() => {
    setFilteredItem(filteredItem);
  }, [filteredItem]);

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
            data.forEach(item => {
              if (item.name === filteredItem) {
                console.log('filtered item', item.name);
              } else {
                console.log('else');
              }
            });

            // this object will organize the list items into categories
            const sortedItems = {
              soon: [],
              prettySoon: [],
              notSoon: [],
              inactive: [],
            };

            // this function will determine if an item should be considered
            // inactive, because it hasn't been purchased for so long
            const inActive = item => {
              const doubleEstimate = item.numberOfDays * 2;
              const lastPurchaseDate = item.dateOfPurchase.toDate();
              const doublePurchaseEstimate = dayjs(lastPurchaseDate)
                .add(doubleEstimate.toString(), 'day')
                .toDate();

              // (if the item in question has not been purchased for
              // a long time (i.e., if you were going to buy it in 10 days
              // but 20 days have gone by and you didn't end up getting it)
              // then set it to inactive)
              if (dayjs(doublePurchaseEstimate) < today) {
                return item;
              }
            };

            // sort each item according to how long it will be before you
            // need to buy it again
            data.forEach(item => {
              if (item.dateOfPurchase && inActive(item)) {
                sortedItems.inactive.push(item);
              } else if (item.numberOfDays <= 7) {
                sortedItems.soon.push(item);
              } else if (item.numberOfDays > 7 && item.numberOfDays < 30) {
                sortedItems.prettySoon.push(item);
              } else if (item.numberOfDays >= 30) {
                sortedItems.notSoon.push(item);
              }
            });

            return (
              <React.Fragment>
                <div className="listFilter">
                  <input
                    type="text"
                    value={filteredItem}
                    className="filterField"
                    onChange={e => setFilteredItem(e.target.value)}
                    type="text"
                  ></input>
                </div>
                <div className="soonItems">
                  <h2 className="itemsLabel">Soon Items</h2>
                  <ListContents
                    data={sortedItems.soon}
                    calculateIfPurchased={calculateIfPurchased}
                    handlePurchase={handlePurchase}
                  />
                </div>
                <div className="prettySoonItems">
                  <h2 className="itemsLabel">Pretty-Soon Items</h2>
                  <ListContents
                    data={sortedItems.prettySoon}
                    calculateIfPurchased={calculateIfPurchased}
                    handlePurchase={handlePurchase}
                  />
                </div>
                <div className="notSoonItems">
                  <h2 className="itemsLabel">Not-Soon Items</h2>
                  <ListContents
                    data={sortedItems.notSoon}
                    calculateIfPurchased={calculateIfPurchased}
                    handlePurchase={handlePurchase}
                  />
                </div>
                <div className="inactiveItems">
                  <h2 className="itemsLabel">Inactive Items</h2>
                  <ListContents
                    data={sortedItems.inactive}
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
