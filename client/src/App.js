import React, { useEffect, useState, Suspense } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import Home from './pages/Home/index'
import Login from './pages/Login/index'
import Landing from './pages/Landing/index'
import Loading from './Loading'
import './App.css';

// const snoowrap = require('snoowrap');

// console.log(r.getSubreddit('AskReddit').getWikiPage('bestof').content_md.then(console.log))

function App() {
  var history = useHistory()

  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Route
          path={`/auth`}
          exact
          component={Login}
        />
        <Route
          path={`/home`}
          exact
          component={Home}
        />
        <Route
          path={`/`}
          exact
          component={Landing}
        />
      </Router>
    </Suspense>
  );
}

export default App;
