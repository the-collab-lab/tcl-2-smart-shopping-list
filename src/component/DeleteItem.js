import React from 'react';
import { FirestoreCollection, withFirestore } from 'react-firestore';

const deleteEntry = () => {
  console.log('hi');
};

const DeleteItem = () => {
  return (
    <button
      className="button-link deleteItemButton"
      onClick={e => {
        if (window.confirm('Are you sure you wish to delete this item?'))
          deleteEntry(e.target.value);
      }}
    >
      Delete this Item?
    </button>
  );
};

export default withFirestore(DeleteItem);
