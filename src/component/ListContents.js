import React from 'react';
import { withFirestore } from 'react-firestore';

const ListContents = ({ data, calculateIfPurchased, handlePurchase }) => {
  return (
    <ul>
      {data.map(item => (
        <li id={item.id} key={item.id} className={calculateIfPurchased(item)}>
          <div
            className={item.name}
            onClick={handlePurchase}
            id={item.id}
            aria-required="true"
          >
            {item.name}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default withFirestore(ListContents);
