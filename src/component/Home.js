import React from 'react';
import GetToken from './GetToken';
import { Link } from 'react-router-dom';
import groceries from '../backgrounds/groceries.svg';

function Home({ token, setToken }) {
  return (
    <div className="homeWrap">
      <img
        alt="illustration of groceries"
        src={groceries}
        id="homeIllustration"
      ></img>
      <h1 id="homeTitle">Welcome to __(title)__!</h1>
      <GetToken token={token} setToken={setToken} />
      <Link to="/join" className="button-link" id="join-list">
        Join Existing List
      </Link>
      <div className="button-link" id="homeGuide">
        How Does It Work?
      </div>
      <div id="hiddenGuide">
        <ul>
          <li>
            1. Start a new list, or join a friend's list with the code they
            shared
          </li>
          <li>
            2. Begin by adding items that you'll need to buy in the future
          </li>
          <li>
            3. Your list will be sorted with those items you need to buy first
            at the top, and last at the bottom
          </li>
          <li>
            4. Click on an item to mark it as purchased, and let __App__ figure
            out the next date you'll need to buy it again
          </li>
          <li>
            5. Click on the icon beside each item to check out its details
          </li>
          <li>6. Visit the menu if you want to start over with a new list</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
