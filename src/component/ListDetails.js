import React from 'react';
import DeleteToken from './DeleteToken';

const ListDetails = ({ token, setToken }) => {
  return (
    <aside>
      <h1>About</h1>
      <h2>Legend</h2>
      <ul id="listLegend">
        <li>
          <div id="soon-legend" />
          Items needed in the next 7 days
        </li>
        <li>
          <div id="pretty-soon-legend" />
          Items needed in the next 14 days
        </li>
        <li>
          <div id="not-soon-legend" />
          Items needed in the next 30 days
        </li>
        <li>
          <div id="inactive-legend" />
          Inactive items
        </li>
      </ul>
      <h2>Share Code</h2>
      <p>
        Would you like other people to contribute to this list? Share this code
        with them! When they first visit this site, they'll be prompted to start
        a new list or join an existing list. If they choose to join an existing
        list and enter this code, they'll have complete edit access to this
        list.
      </p>
      <h3>YOUR SHARE CODE:</h3>
      <span id="share-code">{token}</span>

      <h2>Delete List</h2>
      <p>
        Would you like to start over with a new list? Click the button below!
      </p>
      <DeleteToken token={token} setToken={setToken} />
    </aside>
  );
};

export default ListDetails;
