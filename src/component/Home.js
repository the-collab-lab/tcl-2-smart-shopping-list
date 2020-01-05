import React from 'react';
import GetToken from './GetToken';
import { Link } from 'react-router-dom';
import ProjectInfo from './ProjectInfo';
import homeIllustration from '../lib/images/list_illustration_2.svg';

function Home({ token, setToken }) {
  return (
    <div className="homeWrap">
      <div id="homeTopBar">
        <ProjectInfo />
      </div>
      <div id="homeIntro">Welcome to</div>
      <div id="homeTitle">Listably!</div>
      <img
        alt="illustration of shopping list"
        src={homeIllustration}
        id="homeIllustration"
      ></img>
      <div id="singlelayer">
        <GetToken token={token} setToken={setToken} />
        <h3>OR</h3>
        <Link to="/join" className="button-link" id="joinList">
          Join a List
        </Link>
      </div>
      <input
        type="checkbox"
        className="button-link"
        id="homeGuideClick"
      ></input>
      <label htmlFor="homeGuideClick" id="homeGuide">
        How does it work?
      </label>
      <div id="hiddenGuide">
        <ol>
          <li>
            Start a new list, or join a friend's list with the code they shared
          </li>
          <li>Begin by adding items that you'll need to buy in the future</li>
          <li>
            Your list will be sorted with those items you need to buy first at
            the top, and last at the bottom
          </li>
          <li>
            Click on an item to mark it as purchased, and let Listably figure
            out the next date you'll need to buy it again
          </li>
          <li>Click on the icon beside each item to check out its details</li>
          <li>Visit the menu if you want to start over with a new list</li>
        </ol>
      </div>
    </div>
  );
}

export default Home;
