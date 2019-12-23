import React from 'react';
import { withFirestore } from 'react-firestore';
import { Link } from 'react-router-dom';

const ListContents = ({ data, calculateIfPurchased, handlePurchase }) => {
  return (
    <ul>
      {data.map(item => (
        <li id={item.id} key={item.id} className="listItem">
          <div
            className={calculateIfPurchased(item)}
            onClick={handlePurchase}
            id={item.id}
            aria-required="true"
          >
            {item.name}
          </div>
          <Link className="viewMore" to={'/' + item.id}>
            >>>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default withFirestore(ListContents);
