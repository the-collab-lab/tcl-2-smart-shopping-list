import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/list">List</Link>
      <Link to="/add">Add</Link>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/list">
          <List />
        </Route>
        <Route exact path="/add">
          <Add />
        </Route>
      </Switch>
    </Router>
  )
}

function Home() {
  return (
    <h1>congrats this is the home page</h1>
  )
}

function List() {
  return (
    <h1>This is the list page!</h1>
  )
}

function Add() {
  return (
    <h1>Add an item to your list here</h1>
  )
}

export default App;
