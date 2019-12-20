import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FirestoreCollection, withFirestore } from 'react-firestore';
import Navbar from './Navbar';
import DeleteToken from './DeleteToken';
import calculateNewPurchaseValues from '../calculations';
import dayjs from 'dayjs';

const SortedList = ({ token, handlePurchase, calculateIfPurchased }) => {
  const concatPath = `/lists/${token}/items`;

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
        filter={['numberOfDays', '>', 30]}
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
        filter={['numberOfPurchases', '==', 1]}
        render={({ isLoading, data }) => {
          if (isLoading) {
            return <div>Still Loading...</div>;
          } else {
            return (
              <div id="inactiveItems">
                <h2 className="itemsLabel">Inactive Items</h2>
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
                        aria-label="Inactive item"
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
    </section>
  );
};

export default withFirestore(SortedList);
