import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios"
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import Tooltip from '@material-ui/core/Tooltip';
import { SnackbarProvider, useSnackbar } from 'notistack';
// import cred from '../cred.json'

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
    overflowWrap: "break-word",
    wordWrap: "break-word"
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.type === 'dark' ? '#e6e6e6 !important' : 'black !important'
  },
  sub: {
    marginBottom: '0px',
    fontSize: '16px',
    color: '#737373'
  },
  unsaveStyle: {
    marginTop: '16px',
    padding: 0,
    color: '#707070'
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
    }
}) => {
  const classes = useStyles();
  var apiurl = process.env.REACT_APP_apiUrl
  const [unsave, setUnsave] = useState('')

  const { enqueueSnackbar } = useSnackbar();

  // const handleToastVariant = (variant) => () => {
  //   // variant could be success, error, warning, info, or default
  //   enqueueSnackbar('This is a success message!', { variant });
  //   console.log('where is the message??')
  // };

  var userLS = JSON.parse(localStorage.getItem('user'))

  if(!localStorage.getItem('unsave')){
    localStorage.setItem('unsave', JSON.stringify({list: []}));
  }

  var unsaveLS = JSON.parse(localStorage.getItem('unsave'))

  // useEffect(() => {
  //   if(unsave !== ''){
  //     // console.log('should execute only when unsave is clicked: '+unsave)
  //     axios.post(apiurl + "/reddit/unsaveContent", { unsave, accessToken: userLS.accessToken }, { "Content-Type": "application/json" })
  //       .then((res) => { console.log(res) })
  //       .catch((error) => { console.log(error) })
  //   }
  // }, [unsave])

  function handleUnsave(id, type){
    axios.post(apiurl + "/reddit/unsaveContent", { unsave: id, accessToken: userLS.accessToken, type: type }, { "Content-Type": "application/json" })
      .then((res) => {
        console.log(res)
        var unsaveLS = JSON.parse(localStorage.getItem('unsave'))
        unsaveLS.list.push(id)
        localStorage.setItem('unsave', JSON.stringify(unsaveLS));
        setUnsave(id)
        enqueueSnackbar('Unsaved successfully!', { variant: 'success' });
      })
      .catch((error) => { 
        console.log(error)
        enqueueSnackbar('Failed to unsave', { variant: 'error' });
      })
  }

  // for posts having video - preview.images[0].source.url
  if (is_video) {
      if (domain === "v.redd.it") {
          return (
            unsaveLS.list.includes(id)
            ? null
            : <div className={classes.card}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <p className={classes.sub}>r/{subreddit}</p>
                  <Grid container justify="flex-end">
                    <Tooltip title={<p style={{ fontSize: 14, margin: 4 }}>Unsave</p>} arrow>
                      <IconButton onClick={() => {handleUnsave(id)} } className={classes.unsaveStyle}>
                        <BookmarkIcon style={{ fontSize: 20 }}/>
                      </IconButton>
                    </Tooltip>
                  </Grid>
                </div>
                <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
                  <p className={classes.title}>{title}</p>
                  {
                    thumbnail != "self" & thumbnail != "default" & thumbnail != "nsfw" & thumbnail != "spoiler"
                    ? <img src={thumbnail} width='100%' style={{marginBottom: '10px'}} alt="is_video"/>
                    : null
                  }
                </a>
              </div>
          )
      }
  }

  // for posts having image
  else if (post_hint === "image") {
      return (
        unsaveLS.list.includes(id)
        ? null
        : <div className={classes.card}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <p className={classes.sub}>r/{subreddit}</p>
              <Grid container justify="flex-end">
                <Tooltip title={<p style={{ fontSize: 14, margin: 4 }}>Unsave</p>} arrow>
                  <IconButton onClick={() => {handleUnsave(id)} } className={classes.unsaveStyle}>
                    <BookmarkIcon style={{ fontSize: 20 }}/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </div>
            <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
              <p className={classes.title}>{title}</p>
              <img src={url} width='100%' style={{marginBottom: '10px'}} alt="post_hint is img"/>
            </a>
          </div>
      )
  }
  else if (post_hint === "link" && domain === "i.imgur.com") {
      return (
        unsaveLS.list.includes(id)
        ? null
        : <div className={classes.card}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <p className={classes.sub}>r/{subreddit}</p>
              <Grid container justify="flex-end">
                <Tooltip title={<p style={{ fontSize: 14, margin: 4 }}>Unsave</p>} arrow>
                  <IconButton onClick={() => {handleUnsave(id)} } className={classes.unsaveStyle}>
                    <BookmarkIcon style={{ fontSize: 20 }}/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </div>
            <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
              <p className={classes.title}>{title}</p>
              {
                preview
                ? <img src={preview.images[0].source.url} width='100%' style={{marginBottom: '10px'}} alt="post_hint is link and domain imgur"/>
                : null
              }
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
  }
  else if (post_hint === "link") {
      return (
        unsaveLS.list.includes(id)
        ? null
        : <div className={classes.card}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <p className={classes.sub}>r/{subreddit}</p>
              <Grid container justify="flex-end">
                <Tooltip title={<p style={{ fontSize: 14, margin: 4 }}>Unsave</p>} arrow>
                  <IconButton onClick={() => {handleUnsave(id)} } className={classes.unsaveStyle}>
                    <BookmarkIcon style={{ fontSize: 20 }}/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </div>
            <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
              <p className={classes.title}>{title}</p>
              <p>{url}</p>
              {
                thumbnail != "self" & thumbnail != "default"
                ? <img src={thumbnail} width='100%' style={{marginBottom: '10px'}} alt="post_hint is link"/>
                : null
              }
            </a>
          </div>
      )
  }

  // for posts having only text: <div dangerouslySetInnerHTML={{ __html: selftext_html }} />
  else if (selftext) {
      return (
        unsaveLS.list.includes(id)
        ? null
        : <div className={classes.card}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <p className={classes.sub}>r/{subreddit}</p>
              <Grid container justify="flex-end">
                <Tooltip title={<p style={{ fontSize: 14, margin: 4 }}>Unsave</p>} arrow>
                  <IconButton onClick={() => {handleUnsave(id)} } className={classes.unsaveStyle}>
                    <BookmarkIcon style={{ fontSize: 20 }}/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </div>
            <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
              <p className={classes.title}>{title}</p>
              <p>{selftext.slice(0,230)}...</p>
              {
                thumbnail != "self" & thumbnail != "default" & thumbnail != "nsfw" & thumbnail != "spoiler" & selftext != "[removed]"
                ? <img src={thumbnail} width='100%' style={{marginBottom: '10px'}} alt="selftext?"/>
                : null
              }
            </a>
          </div>
      )
  }

  // for comments only: <div dangerouslySetInnerHTML={{ __html: body_html }} />
  else if (link_title) {
      return (
        unsaveLS.list.includes(id)
        ? null
        : <div className={classes.card}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <p className={classes.sub}>r/{subreddit}</p>
              <Grid container justify="flex-end">
                <Tooltip title={<p style={{ fontSize: 14, margin: 4 }}>Unsave</p>} arrow>
                  <IconButton onClick={() => {handleUnsave(id, 'comment')} } className={classes.unsaveStyle}>
                    <BookmarkIcon style={{ fontSize: 20 }}/>
                  </IconButton>
                </Tooltip>
              </Grid>
            </div>
            <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
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
         unsaveLS.list.includes(id)
         ? null
         : <div className={classes.card}>
             <div style={{display: 'flex', alignItems: 'center'}}>
               <p className={classes.sub}>r/{subreddit}</p>
               <Grid container justify="flex-end">
                 <Tooltip title={<p style={{ fontSize: 14, margin: 4 }}>Unsave</p>} arrow>
                   <IconButton onClick={() => {handleUnsave(id)} } className={classes.unsaveStyle}>
                     <BookmarkIcon style={{ fontSize: 20 }}/>
                   </IconButton>
                 </Tooltip>
               </Grid>
             </div>
            <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
              <p className={classes.title}>{title}</p>
            </a>
          </div>
       )
  }
  else {
    return (
      unsaveLS.list.includes(id)
      ? null
      : <div className={classes.card}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <p className={classes.sub}>r/{subreddit}</p>
            <Grid container justify="flex-end">
              <Tooltip title={<p style={{ fontSize: 14, margin: 4 }}>Unsave</p>} arrow>
                <IconButton onClick={() => {handleUnsave(id)} } className={classes.unsaveStyle}>
                  <BookmarkIcon style={{ fontSize: 20 }}/>
                </IconButton>
              </Tooltip>
            </Grid>
          </div>
         <a className={classes.link} target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
           <p className={classes.title}>{title}</p>
         </a>
       </div>
    )
  }
}

export default Content
