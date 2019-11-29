import React from "react";
import GetToken from './GetToken';

function Home() {
  return (
    <React.Fragment>
      <div className="homeWrap">
        <h1>New Shopping List</h1>
        <GetToken />
        <p><a href="/join" className="joinLink">Join Existing List</a></p>
      </div>
    </React.Fragment>
  );
}

export default Home;
