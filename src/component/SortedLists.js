import React from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import dayjs from 'dayjs';

const SortedList = ({ token, handlePurchase, calculateIfPurchased }) => {
  const concatPath = `/lists/${token}/items`;
  const now = new Date();
  const today = dayjs(now);

  return (
    <section className="listFrame">
      <h1>&#128722;My Shopping List</h1>
      {/* could also use &#128717; which is shopping bags */}
      {/* // items that need to buy soon (fewer than seven days) */}
      <FirestoreCollection
        path={concatPath}
        sort="numberOfDays:asc"
        filter={['numberOfDays', '<', 7]}
        render={({ isLoading, data }) => {
          if (isLoading) {
            return <div>Still Loading...</div>;
          } else {
            return (
              <div id="soonItems">
                <h2 className="itemsLabel">Soon Items</h2>
                <ul>
                  {data.map(item => (
                    <li
                      id={item.id}
                      key={item.id}
                      className={calculateIfPurchased(item)}
                    >
                      <div
                        className={item.name}
                        onClick={handlePurchase}
                        id={item.id}
                        aria-label="Soon Item"
                        aria-required="true"
                      >
                        {item.name}
                        {item.numberOfDays}
                      </div>
                    </li>
                  ))}
                </ul>
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
          ['numberOfDays', '>=', 7],
          ['numberOfDays', '<=', 30],
        ]}
        render={({ isLoading, data }) => {
          if (isLoading) {
            return <div>Still Loading...</div>;
          } else {
            return (
              <div id="kindOfSoonItems">
                <h2 className="itemsLabel">Kind of Soon Items</h2>
                <ul>
                  {data.map(item => (
                    <li
                      id={item.id}
                      key={item.id}
                      className={calculateIfPurchased(item)}
                    >
                      <div
                        className={item.name}
                        onClick={handlePurchase}
                        id={item.id}
                        aria-label="Kind of soon Item"
                        aria-required="true"
                      >
                        {item.name}
                        {item.numberOfDays}
                      </div>
                    </li>
                  ))}
                </ul>
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
          ['numberOfDays', '>', 30],
          ['numberOfDays', '<', 60],
        ]}
        render={({ isLoading, data }) => {
          if (isLoading) {
            return <div>Still Loading...</div>;
          } else {
            return (
              <div id="notSoonItems">
                <h2 className="itemsLabel">Not soon Items</h2>
                <ul>
                  {data.map(item => (
                    <li
                      id={item.id}
                      key={item.id}
                      className={calculateIfPurchased(item)}
                    >
                      <div
                        className={item.name}
                        onClick={handlePurchase}
                        id={item.id}
                        aria-label="Not so soon Item"
                        aria-required="true"
                      >
                        {item.name}
                      </div>
                    </li>
                  ))}
                </ul>
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
            const item = data.map(item => {
              let doubleEstimate = item.numberOfDays * 2;
              let lastPurchaseDate = item.dateOfPurchase.toDate();
              let doublePurchaseEstimate = dayjs(lastPurchaseDate)
                .add(doubleEstimate.toString(), 'day')
                .toDate();

              let estimateCheck = dayjs(doublePurchaseEstimate) < today;

              if (estimateCheck) {
                return (
                  <ul>
                    <li>{item.id}</li>
                  </ul>
                );
              } else {
                return null;
              }
            });

            // return (
            //   <div id="inactiveItems">
            //     <h2 className="itemsLabel">Inactive Items</h2>
            //     <ul>
            //       {data.map(item => (

            //         <li
            //           id={item.id}
            //           key={item.id}
            //           className={calculateIfPurchased(item)}
            //         >
            //           <div
            //             className={item.name}
            //             onClick={handlePurchase}
            //             id={item.id}
            //             aria-label="Inactive item"
            //             aria-required="true"
            //           >
            //             {item.name}
            //           </div>
            //         </li>
            //       ))}
            //     </ul>
            //   </div>
            // );
          }
        }}
      />
    </section>
  );
};

export default withFirestore(SortedList);
