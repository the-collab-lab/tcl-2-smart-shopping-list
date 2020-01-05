import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { withFirestore, FirestoreCollection } from 'react-firestore';
import Navbar from './Navbar';
import dayjs from 'dayjs';
import ListContents from './ListContents';
import shoppingCartIllustration from '../lib/images/shopping-cart-illustration2.svg';
// import shoppingCartIcon from '../lib/images/shoppingcart-icon.png';
import TopBar from './TopBar';

const FetchItems = ({ token, setToken, firestore }) => {
  const [empty, setEmpty] = useState(true);
  const concatPath = `/lists/${token}/items`;
  const today = dayjs(new Date());
  const [filteredInput, setFilteredInput] = useState('');

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
        <TopBar token={token} setToken={setToken} isOnListView={true} />
        <Link className="button-link" id="emptyListAddItem" to="/add">
          Add your first Item
        </Link>
        <Navbar />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <TopBar token={token} setToken={setToken} isOnListView={true} />
      <section className="listFrame">
        <img
          alt="illustration of man next to shopping cart"
          src={shoppingCartIllustration}
          id="shopping-cart-illustration"
        />
        {/* <img
            src={shoppingCartIcon}
            className="shoppingCart"
            alt="Illustration of a shopping cart"
          ></img> */}
        <h1 className="listTitle">Shopping List</h1>
        {/* could also use &#128717; which is shopping bags */}

        <FirestoreCollection
          path={concatPath}
          sort="numberOfDays:asc"
          render={({ isLoading, data }) => {
            if (isLoading) {
              return <div>Still Loading...</div>;
            } else {
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

              // Update state whenever filter input changes
              const handleFilterChange = event => {
                setFilteredInput(event.target.value.toLowerCase());
              };

              // function filters items off arr which chars are not equal to filteredInput
              const filterArr = arr => {
                return arr.filter(
                  item =>
                    item.id.slice(0, filteredInput.length) === filteredInput,
                );
              };

              // update value of the items arrays within the lists object to only include
              // the item(s) that remain after running through filterArr function
              lists.soon.items = filterArr(lists.soon.items);
              lists.prettySoon.items = filterArr(lists.prettySoon.items);
              lists.notSoon.items = filterArr(lists.notSoon.items);
              lists.inactive.items = filterArr(lists.inactive.items);

              return (
                <React.Fragment>
                  <div className="listFilter">
                    <input
                      placeholder="search item"
                      type="search"
                      className="filterField"
                      onChange={handleFilterChange}
                      value={filteredInput}
                    ></input>
                  </div>
                  <div className="listContents">
                    <ListContents listData={lists.soon} token={token} />
                    <ListContents listData={lists.prettySoon} token={token} />
                    <ListContents listData={lists.notSoon} token={token} />
                    <ListContents listData={lists.inactive} token={token} />
                  </div>
                  <Navbar />
                </React.Fragment>
              );
            }
          }}
        />
      </section>
    </React.Fragment>
  );
};

export default withFirestore(FetchItems);
