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

            const items = data.map(item => {
              if (item.numberOfDays <= 7) {
                filteredItems.soon.push(item);
              } else if (item.numberOfDays > 7 && item.numberOfDays < 30) {
                filteredItems.prettySoon.push(item);
              } else if (item.numberOfDays >= 30) {
                filteredItems.notSoon.push(item);
              }
            });

            console.log(filteredItems);

            return (
              <React.Fragment>
                <div className="soonItems">
                  <h2 className="itemsLabel">Soon Items</h2>
                  <ul>
                    {filteredItems.soon.map(item => (
                      <li id={item.id} key={item.id} className="listItem">
                        <div
                          className={calculateIfPurchased(item)}
                          onClick={handlePurchase}
                          id={item.id}
                          aria-label="Soon item"
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
                <div className="prettySoonItems">
                  <h2 className="itemsLabel">Pretty-Soon Items</h2>
                  <ul>
                    {filteredItems.prettySoon.map(item => (
                      <li id={item.id} key={item.id} className="listItem">
                        <div
                          className={calculateIfPurchased(item)}
                          onClick={handlePurchase}
                          id={item.id}
                          aria-label="Pretty soon item"
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
                <div className="Not-Soon Items">
                  <h2 className="itemsLabel">Not-Soon Items</h2>
                  <ul>
                    {filteredItems.notSoon.map(item => (
                      <li id={item.id} key={item.id} className="listItem">
                        <div
                          className={calculateIfPurchased(item)}
                          onClick={handlePurchase}
                          id={item.id}
                          aria-label="Not soon item"
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
              </React.Fragment>
            );
          }
        }}
      />
    </section>
  );
};

export default withFirestore(SortedList);
