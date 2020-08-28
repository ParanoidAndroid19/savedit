var express = require('express');
var cors = require("cors");
const bodyParser = require("body-parser");
const snoowrap = require("snoowrap")
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
  const redirectUrl = req.body.redirecturl
  const code = req.body.code

  const redditClientId = cred.clientId
  const redditClientSecret = cred.clientSecret

  console.log(redirectUrl)
  console.log(code)
})


app.listen(5000, () => {
  console.log(`Server listening on port 5000`)
});
