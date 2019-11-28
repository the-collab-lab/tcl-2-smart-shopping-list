import React, { useState } from "react";
import GetToken from './GetToken';

function Home(props) {
  const { token: [token, setToken] } = { token: useState(null), ...(props.state || {}) };
  
  return (
    <div>
      <h1>New Shopping List</h1>
      <GetToken state={{ token: [token, setToken] }}/>
      <p><a href="/join">Join Existing List</a></p>
    </div>
  );
}

export default Home;
