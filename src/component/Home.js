import React from "react";
import GetToken from './GetToken';
import { Link } from 'react-router-dom';

function Home({token, setToken}) {
  return (
      <div className="homeWrap">
        <h1>New Shopping List</h1>
        <GetToken token={token} setToken={setToken}/>
        <Link to="/join" className="button-link">Join Existing List</Link>
      </div>
  );
}

export default Home;
