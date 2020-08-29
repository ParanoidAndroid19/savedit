var express = require('express');
var cors = require("cors");
const bodyParser = require("body-parser");
const snoowrap = require("snoowrap")
const fetch = require("node-fetch")
const base64 = require("base-64")
const cred = require('./cred.json')

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post('/reddit/getRedditAccessToken', (req, res) => {
  const redirectUrl = cred.redirectUrl
  const code = req.body.code

  const redditClientId = cred.clientId
  const redditClientSecret = cred.clientSecret

  const callApi = "https://www.reddit.com/api/v1/access_token?grant_type=authorization_code&code=" + code + "&redirect_uri=" + redirectUrl

  console.log(callApi)

  fetch(callApi, {
      method: "POST",
      headers: { Authorization: "Basic " + base64.encode(redditClientId + ":" + redditClientSecret)}
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        if (typeof data.access_token !== "undefined" || data.access_token !== null) {
            res.json({ redditAccessToken: data.access_token })
        }
    })
    .catch((err) => { res.status(500).json({ error: "error1 " + err }) })

  // console.log(callApi)
  console.log(code)
})


app.post('/reddit/getSavedContent', (req, res) => {
  var savedContent = []
  var username = ""

  console.log(req.body)
  const ruser = new snoowrap({
      userAgent: cred.userAgent,
      clientId: cred.clientId,
      clientSecret: cred.clientSecret,
      accessToken: req.body.accessToken
  })

  ruser.getMe().then((data) => {
      // var allData = JSON.stringify(data)
      username = data.name
  })

  ruser.getMe().getSavedContent()/* .fetchAll() */
      .then((data) => {
          savedContent = data
      })
      .then(() => {
          res.json({ redditName: username, savedContent: savedContent })
      })
      .catch((err) => {
          res.status(500).json({
              error: err,
              test: "test" + "nKAvbCUe5ZVaSVAcPPfkkiAsKKs"
          })
      })
})


app.listen(5000, () => {
  console.log(`Server listening on port 5000`)
});
