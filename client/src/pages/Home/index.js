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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
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
    color: "black",
    paddingTop: "3px"
  },
  search: {
    position: 'relative',
    borderRadius: "10px",
    backgroundColor: fade("#e8e8e8", 0.8),
    '&:hover': {
      backgroundColor: fade("#f1f1f1", 0.8),
    },
    marginRight: theme.spacing(2),
    marginLeft: '20px',
    width: '50%',
    color: "black"
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
    // top right bottom left
    padding: theme.spacing(1.4, 1, 1.4, 0),
    // vertical padding + font size from searchIcon
    fontSize: "18px",
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
    color: "black",
    paddingTop: "3px"
  },
  dropdown: {
    display: 'inline-block',
    margin: '0 32px 16px 0',
    width: '100%'
  },
  dropdownItem: {
    display: 'inline',
    float: 'left',
    width: '25%'
  }
}));

const StyledToggleButton = styled(ToggleButton)`
  && {
    font-color: #cccccc;
    border-color: #cccccc;
    padding: 5px;
  }
`;

const SubToggleButton = styled(ToggleButton)`
  && {
    margin-right: 15px;
    text-transform: none;
    border-style: solid;
    border-color: #d9d9d9;
    border-radius: 5px;
  }
`;

const StyledAppBar = styled(AppBar)`
  && {
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-color: #d9d9d9;
  }
`;

const FilterAppBar = styled(AppBar)`
  && {
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-color: #d9d9d9;
    display: inline-block;
    overflow: auto;
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;


export default function HomePage() {
  const classes = useStyles();
  let history = useHistory();
  var userLS;
  const [input, setinput] = useState("")
  const [filter, setFilter] = useState(null);
  const [subs, setSubs] = useState([]);

  if(localStorage.getItem('user')){
    userLS = JSON.parse(localStorage.getItem('user'))
  }

  function renderContent() {
    if(input===""){
      if(filter === null){
        return(
          userLS.savedContent.map((content) => (
              <Content key={content.id} props={content}></Content>
          ))
        )
      }
      else if(filter === "posts"){
        return(
          userLS.savedContent.map((content) => (
              content.title
              ? <Content key={content.id} props={content}></Content>
              : null
          ))
        )
      }
      else{
        return(
          userLS.savedContent.map((content) => (
              content.link_title
              ? <Content key={content.id} props={content}></Content>
              : null
          ))
        )
      }
    }
    else{
      if(filter===null){
        return(
          userLS.savedContent.map((content) => (
            content.title
            ? (( input.some(v => content.title.toLowerCase().includes(v)) || input.some(v => content.selftext.toLowerCase().includes(v)) || input.some(v => content.subreddit.toLowerCase().includes(v)) )
              ? <Content key={content.id} props={content}></Content> : null)
            : (( input.some(v => content.link_title.toLowerCase().includes(v)) || input.some(v => content.body.toLowerCase().includes(v)) || input.some(v => content.subreddit.toLowerCase().includes(v)) )
              ? <Content key={content.id} props={content}></Content> : null)
          ))
        )
      }
      else if(filter === "posts"){
        return(
          userLS.savedContent.map((content) => (
            content.title
            ? (( input.some(v => content.title.toLowerCase().includes(v)) || input.some(v => content.selftext.toLowerCase().includes(v)) || input.some(v => content.subreddit.toLowerCase().includes(v)) )
              ? <Content key={content.id} props={content}></Content> : null)
            : null
          ))
        )
      }
      else{
        return(
          userLS.savedContent.map((content) => (
            content.link_title
            ? (( input.some(v => content.link_title.toLowerCase().includes(v)) || input.some(v => content.body.toLowerCase().includes(v)) || input.some(v => content.subreddit.toLowerCase().includes(v)) )
              ? <Content key={content.id} props={content}></Content> : null)
            : null
          ))
        )
      }
    }
  }

  const handleFilter = (event, newFilter) => {
    setFilter(newFilter);
  };

  const handleSubs = (event, newSubs) => {
    setSubs(newSubs);
  };

  console.log(subs)

  function handleInput(e){
    var arrKeywords = e.target.value.toLowerCase().split(/[ ,]+/)
    var keywords = arrKeywords.filter(function (el) {
      return (el !== "" && el !== null);
    });

    if(keywords.length === 0){
      setinput("")
    }
    else{
      setinput(keywords)
    }
  }

  // console.log(input)

  var subredditsList = [];
  var myset = new Set();

  if(userLS.redditName){

    userLS.savedContent.map((content) => (
        myset.add(content.subreddit)
    ))

    return (
      <div>
      <div className={classes.grow}>
        <StyledAppBar position="static" style={{ boxShadow: 'none', background: 'white'}}>
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
                onChange={handleInput}
              />
            </div>
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilter}
              aria-label="text alignment"
            >
              <StyledToggleButton value="posts">Posts</StyledToggleButton>
              <StyledToggleButton value="comments">Comments</StyledToggleButton>
            </ToggleButtonGroup>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <p>{userLS.redditName}</p>
            </div>
          </Toolbar>
        </StyledAppBar>
      </div>

      <div className={classes.grow}>
        <FilterAppBar position="static" style={{ boxShadow: 'none', background: 'white'}}>
          <Toolbar>
            <ToggleButtonGroup
              value={subs}
              onChange={handleSubs}
              aria-label="text formatting"
            >
             {
               [...myset].map((sub) => (
                  <SubToggleButton key={sub} value={sub}>{sub}</SubToggleButton>
               ))
             }
            </ToggleButtonGroup>
          </Toolbar>
        </FilterAppBar>
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
