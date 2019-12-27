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

      {/* // items that need to buy soon (fewer than seven days) */}
      <FirestoreCollection
        path={concatPath}
        sort="numberOfDays:asc"
        filter={['numberOfDays', '<=', 7]}
        render={({ isLoading, data }) => {
          if (isLoading) {
            return <div>Still Loading...</div>;
          } else {
            return (
              <div className="soonItems">
                <h2 className="itemsLabel">Soon Items</h2>
                <ListContents
                  data={data}
                  calculateIfPurchased={calculateIfPurchased}
                  handlePurchase={handlePurchase}
                  aria-label="Soon Item"
                />
              </div>
            );
          }
        }}
      />
      {/* // items that need to buy kind of soon (between 7 and 30 days, inclusive)  */}
      <FirestoreCollection
        path={concatPath}
        sort="numberOfDays:asc"
        filter={[
          ['numberOfDays', '>', 7],
          ['numberOfDays', '<', 30],
        ]}
        render={({ isLoading, data }) => {
          if (isLoading) {
            return <div>Still Loading...</div>;
          } else {
            return (
              <div className="kindOfSoonItems">
                <h2 className="itemsLabel">Kind of Soon Items</h2>
                <ListContents
                  data={data}
                  calculateIfPurchased={calculateIfPurchased}
                  handlePurchase={handlePurchase}
                  aria-label="Kind of soon item"
                />
              </div>
            );
          }
        }}
      />
      {/* items that need to buy not soon (greater than 30 days)  */}
      <FirestoreCollection
        path={concatPath}
        sort="numberOfDays:asc"
        filter={[
          ['numberOfDays', '>=', 30],
          ['numberOfDays', '<', 60],
        ]}
        render={({ isLoading, data }) => {
          if (isLoading) {
            return <div>Still Loading...</div>;
          } else {
            return (
              <div className="notSoonItems">
                <h2 className="itemsLabel">Not Soon Items</h2>
                <ListContents
                  data={data}
                  calculateIfPurchased={calculateIfPurchased}
                  handlePurchase={handlePurchase}
                  aria-label="Not soon item"
                />
              </div>
            );
          }
        }}
      />
      {/* items that are inactive (inactive meaning only one purchase or purchase is out date) */}
      <FirestoreCollection
        path={concatPath}
        sort="numberOfDays:asc"
        render={({ isLoading, data }) => {
          if (isLoading) {
            return <div>Still Loading...</div>;
          } else {
            // eslint-disable-next-line
            const filteredItem = data.filter(item => {
              if (item.dateOfPurchase) {
                const doubleEstimate = item.numberOfDays * 2;
                const lastPurchaseDate = item.dateOfPurchase.toDate();
                const doublePurchaseEstimate = dayjs(lastPurchaseDate)
                  .add(doubleEstimate.toString(), 'day')
                  .toDate();

                return dayjs(doublePurchaseEstimate) < today;
              }
            });

            return (
              <div className="inactiveItems">
                <h2 className="itemsLabel">Inactive Items</h2>
                <ul>
                  {filteredItem.map(item => (
                    <li id={item.id} key={item.id} className="listItem">
                      <div
                        className={calculateIfPurchased(item)}
                        onClick={handlePurchase}
                        id={item.id}
                        aria-label="Inactive item"
                        aria-required="true"
                      >
                        {item.name}
                      </div>
                      {item.dateOfPurchase ? (
                        <Link className="viewMore" to={'/' + item.id}>
                          >>>
                        </Link>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
        }}
      />
    </section>
  );
};

export default withFirestore(SortedList);