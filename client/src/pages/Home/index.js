import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles, useTheme, fade, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Collapse from '@material-ui/core/Collapse';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import styled from "styled-components";
import cred from '../../cred.json'
import Content from "../../components/Content"
import './index.css';
import Masonry from 'react-masonry-css'


const useStyles = makeStyles((darkTheme) => ({
  container: {
    flexGrow: 1,
    marginLeft: darkTheme.spacing(9.5),
    marginTop: darkTheme.spacing(4),
    paddingBottom: darkTheme.spacing(5)
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [darkTheme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: "black",
    paddingTop: "3px",
    paddingRight: "6px"
  },
  search: {
    position: 'relative',
    borderRadius: "10px",
    // backgroundColor: (darkTheme.palette.type !== 'light') ? 'blue' : 'green',
    // '&:hover': {
    //   backgroundColor: fade("#f1f1f1", 0.8),
    // },
    marginRight: darkTheme.spacing(1),
    marginLeft: '20px',
    width: '50%',
    color: "black"
  },
  searchIcon: {
    padding: darkTheme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'grey'
  },
  inputInput: {
    // top right bottom left
    padding: darkTheme.spacing(1.4, 1, 1.4, 0),
    // vertical padding + font size from searchIcon
    fontSize: "18px",
    paddingLeft: `calc(1em + ${darkTheme.spacing(4)}px)`,
    transition: darkTheme.transitions.create('width'),
    width: '100%',
    [darkTheme.breakpoints.up('md')]: {
      width: '70ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [darkTheme.breakpoints.up('md')]: {
      display: 'flex',
    },
    color: "black",
    paddingTop: "3px"
  },
}));


const StyledAppBar = styled(AppBar)`
  && {
    border-bottom-style: solid;
    border-bottom-width: 1px;
    /* border-color: #d9d9d9; */
  }
`;

const FilterAppBar = styled(AppBar)`
  && {
    /* border-bottom-style: solid;
    border-bottom-width: 1px;
    border-color: #d9d9d9; */
    display: inline-block;
    overflow: auto;
    padding-top: 5px;
    padding-bottom: 5px;
  }
`;


export default function HomePage() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  var userLS;
  const [input, setinput] = useState("")
  const [filter, setFilter] = useState(null);
  const [subs, setSubs] = useState([]);
  const [drop, setDrop] = useState(false);
  const [go, setGo] = useState(false);
  const [dataList, setDataList] = useState(null)
  // var dataList;

  useEffect(() => {
    var request = indexedDB.open("Adb", 1);

    request.onerror = function (event) {
      console.log("Why didn't you allow my web app to use IndexedDB?!");
    };

    request.onsuccess = function (event) {
      console.log("success");
      var db = event.target.result;
      db.transaction("saved").objectStore("saved").get("user").onsuccess = function (event) {
        // console.log(event.target.result);
        setDataList(event.target.result)
        // console.log(dataList.savedContent);
        setGo(true)
      };
    };
  }, [])

  var modeL = JSON.parse(localStorage.getItem('mode'))

  const [darkState, setDarkState] = useState(modeL.dark);

  const darkTheme = createMuiTheme({
    ...theme,
    palette: {
      type: darkState ? "dark" : "light",
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#000000',
      },
      background: {
        main: '#ffffff',
        light: '#DAE0E6',
        dark: 'black'
      },
    },
    typography: {
      fontSize: 17,
      useNextVariants: true,
      fontFamily: [
        '"Source Sans Pro"',
        'sans-serif'
      ].join(','),
      h5: {
        fontFamily: [
          '"Pacifico"',
          'cursive'
        ].join(','),
      },
    }
  });

  const handleThemeChange = () => {
    modeL.dark = !modeL.dark
    localStorage.setItem('mode', JSON.stringify(modeL));
    setDarkState(modeL.dark);
  }

  if(localStorage.getItem('user')){
    userLS = JSON.parse(localStorage.getItem('user'))
  }

  function renderContent() {
    if(input===""){
      if(filter === null){
        if(subs.length === 0){
          return(
            dataList.savedContent.map((content) => (
                <Content key={content.id} props={content}></Content>
            ))
          )
        }
        else{
          return(
            dataList.savedContent.map((content) => (
                subs.includes(content.subreddit.toLowerCase())
                ? <Content key={content.id} props={content}></Content>
                : null
            ))
          )
        }
      }
      else if(filter === "posts"){
        if(subs.length === 0){
          return(
            dataList.savedContent.map((content) => (
                content.title
                ? <Content key={content.id} props={content}></Content>
                : null
            ))
          )
        }
        else{
          return(
            dataList.savedContent.map((content) => (
                content.title
                ? (subs.includes(content.subreddit.toLowerCase()) ? <Content key={content.id} props={content}></Content> : null)
                : null
            ))
          )
        }
      }
      else{
        if(subs.length === 0){
          return(
            dataList.savedContent.map((content) => (
                content.link_title
                ? <Content key={content.id} props={content}></Content>
                : null
            ))
          )
        }
        else{
          return(
            dataList.savedContent.map((content) => (
                content.link_title
                ? (subs.includes(content.subreddit.toLowerCase()) ? <Content key={content.id} props={content}></Content> : null)
                : null
            ))
          )
        }
      }
    }

    else{
      if(filter===null){
        return(
          dataList.savedContent.map((content) => (
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
          dataList.savedContent.map((content) => (
            content.title
            ? (( input.some(v => content.title.toLowerCase().includes(v)) || input.some(v => content.selftext.toLowerCase().includes(v)) || input.some(v => content.subreddit.toLowerCase().includes(v)) )
              ? <Content key={content.id} props={content}></Content> : null)
            : null
          ))
        )
      }
      else{
        return(
          dataList.savedContent.map((content) => (
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

  // console.log(subs)

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

  if(localStorage.getItem('user')){
    if(userLS.redditName){
      if(go===true){
        // console.log(dataList)

        dataList.savedContent.map((content) => (
            myset.add(content.subreddit)
        ))

        return (
          <MuiThemeProvider theme={darkTheme}>
            <CssBaseline />
          <div style={{backgroundColor: darkState ? 'black' : '#DAE0E6', minHeight: '100vh'}}>
          <div className={classes.grow}>
            <StyledAppBar position="static" style={{ boxShadow: 'none',
              background: darkState ? '#1A1A1B' : 'white', borderColor: darkState ? '#343536' : '#d9d9d9'}}>
              <Toolbar style={{paddingLeft: '18px'}}>
                <Typography className={classes.title} variant="h5" noWrap style={{color: darkState ? '#C0C0C0' : 'black'}}>
                  Savedit
                </Typography>

                <div className={classes.search} style={{backgroundColor: darkState ? '#343536' : '#e8e8e8'}}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleInput}
                    style={{color: darkState ? 'white' : 'inherit',}}
                  />
                </div>

                <Tooltip title={<p style={{ fontSize: 14, margin: 4 }}>Filter by subreddits</p>} arrow>
                  <IconButton onClick={ () => {setDrop(!drop)} } style={{color: '#cccccc', padding: 0, marginRight: '8px'}}>
                    {
                      drop
                      ? <ExpandLessIcon fontSize="large"/>
                      : <ExpandMoreIcon fontSize="large"/>
                    }
                  </IconButton>
                </Tooltip>

                <ToggleButtonGroup
                  value={filter}
                  exclusive
                  onChange={handleFilter}
                  aria-label="text alignment"
                >
                  <ToggleButton value="posts"
                  style={{color: '#A9A9A9', padding: '5px', borderColor: darkState ? '#343536' : '#cccccc'}}
                  >Posts</ToggleButton>

                  <ToggleButton value="comments"
                  style={{color: '#A9A9A9', padding: '5px', borderColor: darkState ? '#343536' : '#cccccc'}}
                  >Comments</ToggleButton>
                </ToggleButtonGroup>

                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <Tooltip title={<p style={{ fontSize: 14, margin: 4 }}>Toggle light/dark theme</p>} arrow>
                    <IconButton onClick={handleThemeChange} style={{ marginRight: '10px' }}>
                      {darkState
                        ? <Brightness7Icon />
                        : <Brightness4Icon />
                      }
                    </IconButton>
                  </Tooltip>
                  <p style={{color: darkState ? '#C0C0C0' : 'black'}}>{userLS.redditName}</p>
                </div>
              </Toolbar>
            </StyledAppBar>
          </div>

          <Collapse in={drop}>
            <div className={classes.grow}>
              <FilterAppBar position="static" style={{ boxShadow: 'none', background: darkState ? '#1A1A1B' : 'white'}}>
                <Toolbar>
                  <ToggleButtonGroup
                    value={subs}
                    onChange={handleSubs}
                    aria-label="text formatting"
                  >
                   {
                     [...myset].map((sub) => (
                        <ToggleButton
                          key={sub} value={sub.toLowerCase()}
                          style={{marginRight: '15px', textTransform: 'none', color: '#A9A9A9' ,borderStyle: 'solid', borderRadius: '5px', borderColor: darkState ? '#343536' : '#cccccc'}}
                        >{sub}</ToggleButton>
                     ))
                   }
                  </ToggleButtonGroup>
                </Toolbar>
              </FilterAppBar>
              </div>
          </Collapse>

          <Container maxWidth="lg" className={classes.container}>
          <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
              {renderContent()}
          </Masonry>
          </Container>
          </div>
          </MuiThemeProvider>
        );
      }
      else{
        return (
          <div style={{ textAlign: 'center', margin: 'auto', marginTop: '35vh' }}>
            <h2>Loading</h2>
          </div>
        )
      }
    }
  }

  else{
    return (
      <div style={{ textAlign: 'center', margin: 'auto', marginTop: '35vh' }}>
        <h3>Please Login first</h3>
        {history.push(`/`)}
      </div>
    )
  }
}
