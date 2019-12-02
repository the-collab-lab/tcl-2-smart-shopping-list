import React from "react";
import GetToken from './GetToken';

function Home({token, setToken}) {
  return (
      <div className="homeWrap">
        <h1>New Shopping List</h1>
        <GetToken token={token} setToken={setToken}/>
        <p><a href="/join" className="joinLink">Join Existing List</a></p>
      </div>
  );
}

export default Home;
