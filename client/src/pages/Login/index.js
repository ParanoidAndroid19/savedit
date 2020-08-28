import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import axios from "axios"
import { useHistory } from 'react-router-dom'
import queryString from "query-string"
import cred from '../../cred.json'

export default function Login(props) {
  let history = useHistory();
  // const [redditAccessToken, setRedditAccessToken] = useState("")
  var apiurl = cred.apiUrl
  var redirecturl = cred.redirectUrl

  const code = queryString.parse(props.location.search).code
  const randomString = queryString.parse(props.location.search).state

  console.log(code)
  console.log(randomString)
  console.log(redirecturl)

  // for getting the access token
  useEffect(() => {
      if (randomString === "RANDOM_STRING" && code) {
          axios.post(apiurl + "/reddit/getRedditAccessToken", { redirecturl, code })
            .then((res) => {console.log(res)})
            .catch((error) => { console.log(error) })
      } else {
          console.log('login failed')
      }
  }, [])


  function handleLogin(){
    localStorage.setItem('user', JSON.stringify({token: 'something'}))
    history.push(`/home`)
  }

  if(localStorage.getItem('user')){
    return (
      <div style={{ textAlign: 'center', margin: 'auto', marginTop: '35vh' }}>
        <h5>Redirecting to Home</h5>
        {history.push(`/home`)}
      </div>
    )
  }

  return (
    <div style={{ textAlign: 'center', margin: 'auto', marginTop: '35vh' }} >
      <p>Logging In!</p>
    </div>
  );
}
