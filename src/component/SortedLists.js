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
    <React.Fragment>
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
              <div>
                <h2>SWWOOON Items</h2>
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
              <div>
                <h2>Kind of Soon Items</h2>
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
              <div>
                <h2>Not soon Items</h2>
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
              <div>
                <h2>Inactive Items</h2>
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
    </React.Fragment>
  );
};

export default withFirestore(SortedList);
