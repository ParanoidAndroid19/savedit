import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
// import Masonry from "./Masonry"

var modeL = JSON.parse(localStorage.getItem('mode'))

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: 600,
    fontSize: '19px',
    marginTop: '5px'
  },
  card: {
    backgroundColor: theme.palette.type === 'dark' ? '#1A1A1B' : 'white',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderStyle: 'solid',
    borderWidth: '1px',
    borderColor: theme.palette.type === 'dark' ? '#343536' : '#a4a6a8',
    '&:hover': {
      borderColor: theme.palette.type === 'dark' ? '#737373' : 'black',
    },
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.type === 'dark' ? '#e6e6e6' : 'black'
  },
  sub: {
    marginBottom: '0px',
    fontSize: '16px',
    color: '#737373'
  }
}))

const Content = ({
    props: {
        title,
        id,
        body_html,
        body,
        created_utc,
        permalink,
        subreddit,
        post_hint,
        is_video,
        thumbnail,
        url,
        over_18,
        domain,
        secure_media_embed,
        secure_media,
        selftext,
        selftext_html,
        link_title,
        preview
    },
    unsave
}) => {
  const classes = useStyles();

  // for posts having video
  if (is_video) {
      if (domain === "v.redd.it") {
          return (
              <div className={classes.card}>
                <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
                  <p className={classes.sub}>r/{subreddit}</p>
                  <p className={classes.title}>{title}</p>
                  <img src={preview.images[0].source.url} width='100%' style={{marginBottom: '10px'}}/>
                </a>
              </div>
          )
      }
  }

  // for posts having image
  else if (post_hint === "image") {
      return (
        <div className={classes.card}>
          <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
            <p className={classes.sub}>r/{subreddit}</p>
            <p className={classes.title}>{title}</p>
            <img src={url} width='100%' style={{marginBottom: '10px'}}/>
          </a>
        </div>
      )
  }
  else if (post_hint === "link" && domain === "i.imgur.com") {
      return (
          <div className={classes.card}>
            <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
              <p className={classes.sub}>r/{subreddit}</p>
              <p className={classes.title}>{title}</p>
              <video preload="auto" controls width='100%' style={{marginBottom: '10px'}}>
                  <source
                      src={url.substring(0, url.length - 4) + "mp4"}
                      type="video/webm"
                  ></source>
              </video>
            </a>
          </div>
      )
  }

  else if (post_hint === "rich:video" && domain === "redgifs.com") {
      return (
          <div>
              <iframe
                  src={secure_media_embed.media_domain_url}
                  frameborder="0"
                  scrolling="no"
                  width="100%"
                  height="100%"
                  allowfullscreen
              ></iframe>
          </div>
      )
  } else if (post_hint === "link") {
      return ( <div>link</div> )
  }

  // for posts having only text: <div dangerouslySetInnerHTML={{ __html: selftext_html }} />
  else if (selftext) {
      return (
          <div className={classes.card}>
            <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
              <p className={classes.sub}>r/{subreddit}</p>
              <p className={classes.title}>{title}</p>
              <p>{selftext.slice(0,230)}...</p>
              {
                preview
                ? <img src={preview.images[0].source.url} width='100%' style={{marginBottom: '10px'}}/>
                : null
              }
            </a>
          </div>
      )
  }

  // for comments only: <div dangerouslySetInnerHTML={{ __html: body_html }} />
  else if (link_title) {
      return (
        <div className={classes.card}>
          <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
            <p className={classes.sub}>r/{subreddit}</p>
            <p className={classes.title}>{link_title}</p>
            <p style={{borderLeftStyle: 'dotted', borderColor: '#737373',
            borderWidth: '3px',paddingLeft: '10px', marginLeft: '3px'}}>
            {body.slice(0,230)}...</p>
          </a>
        </div>
      )
  }
  else if (thumbnail === "self") {
       return (
         <div className={classes.card}>
          <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
            <p className={classes.sub}>r/{subreddit}</p>
            <p className={classes.title}>{title}</p>
          </a>
         </div>
       )
  }
  else {
      return <div>{body}</div>
  }
}

export default Content
