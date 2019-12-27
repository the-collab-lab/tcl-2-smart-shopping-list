import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { withFirestore, FirestoreCollection } from 'react-firestore';
import Navbar from './Navbar';
import DeleteToken from './DeleteToken';
import dayjs from 'dayjs';
import ListContents from './ListContents';

const FetchItems = ({ token, setToken, firestore }) => {
  const [empty, setEmpty] = useState(true);
  const concatPath = `/lists/${token}/items`;
  const today = dayjs(new Date());

  if (!token) return <Redirect to="" />;

  firestore
    .collection('lists')
    .doc(token)
    .collection('items')
    .get()
    .then(items => {
      setEmpty(items.empty);
    });

  if (empty) {
    return (
      <React.Fragment>
        <Link className="button-link" id="emptyListAddItem" to="/add">
          Add your first Item
        </Link>
        <DeleteToken token={token} setToken={setToken} />
        <Navbar />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
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
              const onFilterChange = event => {
                let filtering = event.target.value;
                console.log(filtering);
              };

              // this object will organize the list items into lists
              const lists = {
                soon: {
                  items: [],
                  className: 'soonItems',
                  label: 'Soon Items',
                },
                prettySoon: {
                  items: [],
                  className: 'prettySoonItems',
                  label: 'Pretty Soon Items',
                },
                notSoon: {
                  items: [],
                  className: 'notSoonItems',
                  label: 'Not Soon Items',
                },
                inactive: {
                  items: [],
                  className: 'inactiveItems',
                  label: 'Inactive Items',
                },
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
                  lists.inactive.items.push(item);
                } else if (item.numberOfDays <= 7) {
                  lists.soon.items.push(item);
                } else if (item.numberOfDays > 7 && item.numberOfDays < 30) {
                  lists.prettySoon.items.push(item);
                } else if (item.numberOfDays >= 30) {
                  lists.notSoon.items.push(item);
                }
              });

              return (
                <React.Fragment>
                  {/* <div className="listFilter">
                    <input
                      type="text"
                      className="filterField"
                      onChange={onFilterChange}
                      type="text"
                    ></input>
                  </div> */}
                  <ListContents listData={lists.soon} token={token} />
                  <ListContents listData={lists.prettySoon} token={token} />
                  <ListContents listData={lists.notSoon} token={token} />
                  <ListContents listData={lists.inactive} token={token} />
                  <Navbar />
                  <DeleteToken token={token} setToken={setToken} />
                </React.Fragment>
              );
            }
          }}
        />
      </section>
      <DeleteToken token={token} setToken={setToken} />
      <Navbar />
    </React.Fragment>
  );
};

export default withFirestore(FetchItems);
