import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core'
import GitHubIcon from '@material-ui/icons/GitHub';
import { useHistory } from 'react-router-dom'
// import cred from '../../cred.json'
import './index.css';

export default function Login() {
  let history = useHistory();

  const [more, setMore] = useState(false)

  // console.log(process.env)

  const oauthLink =
      "https://www.reddit.com/api/v1/authorize?client_id=" +
      process.env.REACT_APP_clientId +
      "&response_type=code&state=RANDOM_STRING&redirect_uri=" +
      process.env.REACT_APP_redirectUrl +
      "&duration=permanent&scope=identity history save"

  if(localStorage.getItem('user')){
    var userLS = JSON.parse(localStorage.getItem('user'))
    if(userLS.redditName){
      return (
        <div style={{ textAlign: 'center', margin: 'auto', marginTop: '35vh' }}>
          <h5>Redirecting to Home</h5>
          {history.push(`/home`)}
        </div>
      )
    }
  }

  else{
    return (
      <div className='body'>
        <Grid container style={{marginTop: '50px'}}>
          <Grid item xs={7}>
            <img src={require("../../assets/final.png")} style={{width: '820px', height: 'auto'}}/>
          </Grid>

          <Grid item xs={5} style={{paddingRight: '10px'}}>
          <p className="cursive" style={{ fontSize: '50px', marginBottom: '15px' }}>Savedit</p>

          <div className="normal">
            <p style={{ fontSize: '25px', margin: 0, fontWeight: 'bold' }}>Filter, manage and search through all your reddit saved posts and comments easily.</p>
            <p style={{ margin: 0, marginTop: '40px', fontSize: '20px'}}>Organise and declutter by unsaving unnecessary content. Filter saves by posts, comments and specific subreddits.
            Search through all the saved content or only through posts/comments. All saves are linked to the original post/comment on reddit. Dark mode &#9829;</p>
            <p
              style={{ margin: 0, marginTop: '20px', fontSize: '20px'}}
              onClick={ () => {setMore(!more)} }>
              Safely login using your reddit account.
              {
                more
                ? <span> This application runs completely in the user's browser, all reddit data is stored in each user's individual browser. There is no backend server.
                All reddit data is visible and accessable only to each individual user, no user data is sent to any external servers. Reddit authentication is done using
                OAuth2 access flow provided by the Reddit API.</span>
                : <span> Read more about safety and privacy...</span>
              }
            </p>
            <a href={oauthLink}>
              <Button variant="contained" color="secondary" style={{marginTop: '40px', fontWeight: 'bold', padding: '15px'}}>
                Login with Reddit
              </Button>
            </a>
          </div>
          </Grid>

          <p className='normal' style={{ position: 'absolute', right: 0, bottom: 0, left: 0, padding: '0.5rem', textAlign: 'center' }}>
            <a target="_blank" href='https://github.com/ParanoidAndroid19'>Made by Simran Bhake. </a>
            <a target="_blank" href='https://github.com/ParanoidAndroid19/savedit/issues'>Issues and Support.</a></p>
        </Grid>
      </div>
    );
  }
}
