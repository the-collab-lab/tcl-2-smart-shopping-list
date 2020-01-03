import React from 'react';
import { Link } from 'react-router-dom';
import shoppingCartIcon from '../lib/images/shoppingcart-icon.png';

// This Navbar allows users to navigate from the List view to the Add Item view
// It is used in the FetchItems.js component and the AddItem.js component

function BackButton() {
  return (
    <div className="BackButton" data-cy="Back">
      <Link className="BackButton_List" to="/list">
        <img
          src={shoppingCartIcon}
          className="shoppingCart"
          alt="Illustration of a shopping cart"
        ></img>
        Back To List
      </Link>
    </div>
  );
}

export default BackButton;
