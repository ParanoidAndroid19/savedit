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
            res.json({ redditAccessToken: data.access_token, redditRefreshToken: data.refresh_token })
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

  fetch("https://oauth.reddit.com/api/v1/me", {
    method: "GET",
    headers: { 'Authorization': `bearer ${req.body.accessToken}` }
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data.name)
        username = data.name

        fetch(`https://oauth.reddit.com/user/${data.name}/saved/.json?limit=25&raw_json=1`, {
            method: "GET",
            headers: { 'Authorization': `bearer ${req.body.accessToken}` }
        })
            .then((response) => response.json())
            .then((data) => {
                data.data.children.map((child) => {
                    savedContent.push(child.data)
                })
                console.log(`fetching saved content till ${data.data.after}`)
            })
            .then(() => {
                res.json({ redditName: username, savedContent: savedContent })
            })
            .catch((err) => { console.log(err) })
    })
    // .then(() => {
    //     res.json({ redditName: username, savedContent: savedContent })
    // })
    .catch((err) => {
        res.status(500).json({
            error: err,
            test: "test" + "nKAvbCUe5ZVaSVAcPPfkkiAsKKs"
        })
    })

//   const ruser = new snoowrap({
//       userAgent: cred.userAgent,
//       clientId: cred.clientId,
//       clientSecret: cred.clientSecret,
//       accessToken: req.body.accessToken
//   })

//   ruser.getMe().then((data) => {
//       // var allData = JSON.stringify(data)
//       username = data.name
//   })

// //   ruser.getMe().getSavedContent().fetchAll()
//   ruser.getMe().getSavedContent().fetchMore({ amount: 20 })
//       .then((data) => {
//           savedContent = data
//       })
//       .then(() => {
//           res.json({ redditName: username, savedContent: savedContent })
//       })
//       .catch((err) => {
//           res.status(500).json({
//               error: err,
//               test: "test" + "nKAvbCUe5ZVaSVAcPPfkkiAsKKs"
//           })
//       })
})


app.post('/reddit/getMoreContent', (req, res) => {
  var moreContent = []
  var more = true

  console.log(req.body)
  
  fetch(`https://oauth.reddit.com/user/${req.body.userName}/saved/.json?limit=25&after=${req.body.after}`, {
      method: "GET",
      headers: { 'Authorization': `bearer ${req.body.accessToken}` }
    })
    .then((response) => response.json())
    .then((data) => {
        data.data.children.map((child) => {
            moreContent.push(child.data)
        })
        if(data.data.after == null){
            more = false
        }
        console.log(`fetching saved content till ${req.body.after}`)
    })
    .then(() => {
        res.json({ moreContent: moreContent, more: more })
    })
    .catch((err) => {
        res.status(500).json({
            error: err,
            test: "test" + "nKAvbCUe5ZVaSVAcPPfkkiAsKKs"
        })
    })

//   const ruser = new snoowrap({
//       userAgent: cred.userAgent,
//       clientId: cred.clientId,
//       clientSecret: cred.clientSecret,
//       accessToken: req.body.accessToken
//   })

//   ruser.getMe().getSavedContent().fetchMore({amount: 20, append: false})
//       .then((data) => {
//           moreContent = data
//       })
//       .then(() => {
//           res.json({ moreContent: moreContent })
//       })
//       .catch((err) => {
//           res.status(500).json({
//               error: err,
//               test: "test" + "nKAvbCUe5ZVaSVAcPPfkkiAsKKs"
//           })
//       })

})


app.post('/reddit/unsaveContent', (req, res) => {
  console.log(req.body)

  const ruser = new snoowrap({
      userAgent: cred.userAgent,
      clientId: cred.clientId,
      clientSecret: cred.clientSecret,
      accessToken: req.body.accessToken
  })

  if(req.body.type === 'comment'){
    ruser.getComment(req.body.unsave).unsave()
        .then(() => {
            res.status(200).json({ success: "successfully unsaved comment" })
        })
        .catch((err) => {
            res.status(500).json({ error: err.code, data: req.body })
        })
  }
  else{
    ruser.getSubmission(req.body.unsave).unsave()
        .then(() => {
            res.status(200).json({ success: "successfully unsaved" })
        })
        .catch((err) => {
            res.status(500).json({ error: err.code, data: req.body })
        })
  }

})


app.post('/reddit/getCSV', (req, res) => {
    var csvData = []
    console.log("exporting to csv")
    console.log(req.body)

    const ruser = new snoowrap({
        userAgent: cred.userAgent,
        clientId: cred.clientId,
        clientSecret: cred.clientSecret,
        accessToken: req.body.accessToken
    })

    ruser.getMe().getSavedContent().fetchAll()
    .then((data) => {
        data.map((save) => {
            csvData.push({
                Title: save.title ? save.title : save.link_title,
                Subreddit: save.subreddit.display_name,
                Link: "https://reddit.com" + save.permalink,
            })
        })
    })
    .then(() => {
        res.json({ csvData: csvData })
    })
    .catch((err) => {
        res.status(500).json({
            error: err,
            test: "test" + "nKAvbCUe5ZVaSVAcPPfkkiAsKKs"
        })
    })

})


app.post('/reddit/refreshAccessToken', (req, res) => {
  const redditClientId = cred.clientId
  const redditClientSecret = cred.clientSecret

  refreshToken = req.body.refreshToken

  const callApi = "https://www.reddit.com/api/v1/access_token?grant_type=refresh_token&refresh_token=" + refreshToken

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
})


app.listen(5000, () => {
  console.log(`Server listening on port 5000`)
});