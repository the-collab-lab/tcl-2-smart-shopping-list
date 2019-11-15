import React from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import RouterComponent from './RouterComponent'

// For now, the App simply returns our RouterComponent, which holds all the links
// and all of the components for each of those links.
function App() {
  return (
    // If we agree on these changes, we can delete all of the stuff below that I commented
    // out for the time being. The commented out code lives in RouterComponent.js, now.
    <RouterComponent />
    // <Router>
    //   <Link to="/">Home</Link>
    //   <Link to="/list">List</Link>
    //   <Link to="/add">Add</Link>
    //   <Switch>
    //     <Route exact path="/">
    //       <Home />
    //     </Route>
    //     <Route exact path="/list">
    //       <List />
    //     </Route>
    //     <Route exact path="/add">
    //       <Add />
    //     </Route>
    //   </Switch>
    // </Router>
  )
}

// function Home() {
//   return (
//     <h1>congrats this is the home page</h1>
//   )
// }

// function List() {
//   return (
//     <h1>This is the list page!</h1>
//   )
// }

// function Add() {
//   return (
//     <h1>Add an item to your list here</h1>
//   )
// }

export default App;
