import React from 'react';
import { Link } from 'react-router-dom';
import listIcon from '../lib/images/list-icon.svg';
import addIcon from '../lib/images/add-icon.png';

// This Navbar allows users to navigate from the List view to the Add Item view
// It is used in the FetchItems.js component and the AddItem.js component

function Navbar() {
  return (
    <div className="Navbar">
      <Link className="NavItem" to="/list" data-cy="ListNavItem">
        <img src={listIcon} alt="view list" className="listIcon" />
      </Link>
      <Link className="NavItem" to="/add">
        <img src={addIcon} alt="go to add item" className="addIcon"></img>
      </Link>
    </div>
  );
}

export default Navbar;
