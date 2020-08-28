import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'
import cred from '../../cred.json'

export default function Login() {
  let history = useHistory();

  const oauthLink =
      "https://www.reddit.com/api/v1/authorize?client_id=" +
      cred.clientId +
      "&response_type=code&state=RANDOM_STRING&redirect_uri=" +
      cred.redirectUrl +
      "&duration=temporary&scope=identity history save"

  if(localStorage.getItem('user')){
    return (
      <div style={{ textAlign: 'center', margin: 'auto', marginTop: '35vh' }}>
        <h5>Redirecting to Home</h5>
        {history.push(`/home`)}
      </div>
    )
  }

  else{
    return (
      <div style={{ textAlign: 'center', margin: 'auto', marginTop: '35vh' }} >
        <p>Landing!</p>
          <a href={oauthLink}>
            <Button variant="contained" color="primary">
              Login with Reddit
            </Button>
          </a>
      </div>
    );
  }
}
