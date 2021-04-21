import React, { useEffect, useState, Suspense } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Home from './pages/Home/index'
import Login from './pages/Login/index'
import Landing from './pages/Landing/index'
import Loading from './Loading'
import LoadingScreen from './pages/LoadingScreen/index'
import NotFoundPage from './pages/NotFoundPage/index'
import './App.css';

if(!localStorage.getItem('mode')){
  localStorage.setItem('mode', JSON.stringify({dark: false}));
}
//
// var modeL = JSON.parse(localStorage.getItem('mode'))
// console.log(modeL.dark)

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      main: '#ffffff'
    },
    // type: modeL.dark ? "dark" : "light",
  },
  status: {
    danger: 'orange',
  }
});
theme = responsiveFontSizes(theme);


function App() {
  var history = useHistory()

  return (
    <MuiThemeProvider theme={theme}>
    <CssBaseline />
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
        {/* <Route
          path={`/loading`}
          exact
          component={LoadingScreen}
        /> */}
        <Route
          path={`/`}
          exact
          component={Landing}
        />
        {/* <Route path='*' exact component={NotFoundPage} /> */}
      </Router>
    </Suspense>
    </MuiThemeProvider>
  );
}

export default App;
