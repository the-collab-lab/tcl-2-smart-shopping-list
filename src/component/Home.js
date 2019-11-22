import React from "react";
import JoinList from './JoinList';
import GetToken from './GetToken';

function Home() {
  return (
    <div>
      <h1>congrats this is the home page</h1>
      <GetToken />
      <JoinList />
    </div>
  );
}

export default Home;
