import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles, useTheme, fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import styled from "styled-components";
import cred from '../../cred.json'
import Content from "../../components/Content"


const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    // marginLeft: theme.spacing(5),
    marginLeft: theme.spacing(11),
    marginTop: theme.spacing(5)
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: '20px',
    width: '50%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '70ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }
}));

const StyledToggleButton = styled(ToggleButton)`
  && {
    color: white;
    border-color: white;
    padding: 5px;
  }
`;


export default function HomePage() {
  const classes = useStyles();
  let history = useHistory();
  var userLS;
  const [input, setinput] = useState("")
  const [filter, setFilter] = useState(null);

  if(localStorage.getItem('user')){
    userLS = JSON.parse(localStorage.getItem('user'))
  }

  function renderContent() {
    if(input===""){
      return(
        userLS.savedContent.map((content) => (
            <Content key={content.id} props={content}></Content>
          ))
      )
    }
    else{
      return(
        userLS.savedContent.map((content) => (
          content.title
          ? ((content.title.toLowerCase().includes(input) || content.selftext.toLowerCase().includes(input) || content.subreddit.toLowerCase().includes(input))
            ? <Content key={content.id} props={content}></Content> : null)
          : ((content.link_title.toLowerCase().includes(input) || content.body.toLowerCase().includes(input) || content.subreddit.toLowerCase().includes(input))
            ? <Content key={content.id} props={content}></Content> : null)
        ))
      )
    }
  }

  const handleFilter = (event, newFilter) => {
    setFilter(newFilter);
  };

  console.log(filter)

  if(userLS.redditName){
    return (
      <div>
      <div className={classes.grow}>
        <AppBar position="static" style={{ boxShadow: 'none', background: '#808080'}}>
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Savedit
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={ (e) => setinput(e.target.value.toLowerCase()) }
              />
            </div>
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilter}
              aria-label="text alignment"
            >
              <StyledToggleButton value="post">Post</StyledToggleButton>
              <StyledToggleButton value="comment">Comment</StyledToggleButton>
            </ToggleButtonGroup>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <p>{userLS.redditName}</p>
            </div>
          </Toolbar>
        </AppBar>
      </div>

      <Container maxWidth="lg" className={classes.container}>
        <div>
          {renderContent()}
        </div>
      </Container>

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
