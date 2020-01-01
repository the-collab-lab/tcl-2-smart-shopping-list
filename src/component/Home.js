import React from 'react';
import GetToken from './GetToken';
import { Link } from 'react-router-dom';
import groceries from '../backgrounds/groceries.svg';

const toggleGuide = {
  fontSize: '50px',
  display: 'none',
};

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
      <div style={toggleGuide}>BBBBBBASDFASDF</div>
      <div
        onMouseOver={() => {
          console.log('hi');
        }}
        className="button-link"
        id="homeGuide"
      >
        How Does It Work?
      </div>
    </div>
  );
}

export default Home;
