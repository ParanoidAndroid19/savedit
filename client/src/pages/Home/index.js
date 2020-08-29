import React from 'react';
import { useHistory } from 'react-router-dom'
import cred from '../../cred.json'

export default function HomePage() {
  let history = useHistory();
  var userLS;

  console.log(cred.redirectUrl)

  if(localStorage.getItem('user')){
    userLS = JSON.parse(localStorage.getItem('user'))
  }

  if(userLS.redditName){
    return (
      <div style={{ textAlign: 'center', margin: 'auto', marginTop: '35vh' }} >
        <p>Welcome Home, {userLS.redditName}!</p>
      </div>
    );
  }

  else{
    return (
      <div style={{ textAlign: 'center', margin: 'auto', marginTop: '35vh' }}>
        <h5>Please Login first</h5>
        {history.push(`/`)}
      </div>
    )
  }
}
