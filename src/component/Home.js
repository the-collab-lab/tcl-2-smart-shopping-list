import React from "react";
import GetToken from './GetToken';

function Home() {
  return (
    <div>
      <h1>New Shopping List</h1>
      <GetToken />
      <p><a href="/join">Join Existing List</a></p>
    </div>
  );
}

export default Home;
