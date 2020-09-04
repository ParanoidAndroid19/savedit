import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import axios from "axios"
import { useHistory } from 'react-router-dom'
import queryString from "query-string"
import cred from '../../cred.json'

export default function Login(props) {
  let history = useHistory();
  const [redditAccessToken, setRedditAccessToken] = useState("")
  const [loginSuccess, setLoginSuccess] = useState("loading")
  var apiurl = cred.apiUrl
  var redirecturl = cred.redirectUrl

  const code = queryString.parse(props.location.search).code
  const randomString = queryString.parse(props.location.search).state


  // for getting the access token
  useEffect(() => {
      if (randomString === "RANDOM_STRING" && code && !redditAccessToken && !localStorage.getItem('user')) {
          axios.post(apiurl + "/reddit/getRedditAccessToken", { redirecturl, code }, { "Content-Type": "application/json" })
            .then((res) => {
              if (res.data.redditAccessToken && res.status === 200) {
                setRedditAccessToken(res.data.redditAccessToken)
                localStorage.setItem('user', JSON.stringify({accessToken: res.data.redditAccessToken}))
              }
              else{
                console.log('failed!')
                setLoginSuccess(false)
              }
            })
            .catch((error) => { console.log(error) })
      } else {
          console.log('login failed')
          setLoginSuccess(false)
      }
  }, [])

  console.log(redditAccessToken)

  // for getting the saved content
  useEffect(() => {
    if(localStorage.getItem('user') && redditAccessToken){
      console.log('twice?')
      var userLS = JSON.parse(localStorage.getItem('user'))
      if(!userLS.redditName){
        console.log('Getting saved content?')
        axios.post(apiurl + "/reddit/getSavedContent", { accessToken: userLS.accessToken }, { "Content-Type": "application/json" })
          .then((res) => {
            console.log('Whereee?')
            console.log(res)
            userLS['redditName'] = res.data.redditName
            userLS['savedContent'] = res.data.savedContent
            localStorage.setItem('user', JSON.stringify(userLS))
            setLoginSuccess(true)
          })
          .catch((error) => { console.log(error) })

        // setTimeout(() => {
        //   return history.push(`/home`)
        // }, 1000)
      }
      else{
        history.push(`/home`)
      }
    }
  }, [redditAccessToken])

  // if(localStorage.getItem('user')){
  //   return (
  //     <div style={{ textAlign: 'center', margin: 'auto', marginTop: '35vh' }}>
  //       <h5>Redirecting to Home</h5>
  //       {history.push(`/home`)}
  //     </div>
  //   )
  // }

  return (
    <div style={{ textAlign: 'center', margin: 'auto', marginTop: '35vh' }} >
      {loginSuccess===true
      ? <div>
            <h1>Login succesfully</h1>
            {history.push(`/home`)}
        </div>
      : (loginSuccess==='loading'
        ? <h1>Loading...</h1>
        : <div>
            <h1>Sorry something went wrong</h1>
            <p>Please try again</p>
          </div>)
      }
    </div>
  )
}
