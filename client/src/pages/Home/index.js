import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  useTheme,
  fade,
  MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import Brightness7Icon from "@material-ui/icons/Brightness7";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Tooltip from "@material-ui/core/Tooltip";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import axios from "axios";
import styled from "styled-components";
// import cred from "../../cred.json";
import Content from "../../components/Content";
import "./index.css";
import Masonry from "react-masonry-css";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import RefreshIcon from "@material-ui/icons/Refresh";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import { SnackbarProvider, useSnackbar } from "notistack";
import LoadingScreen from "../LoadingScreen";
import GetAppIcon from "@material-ui/icons/GetApp";
import { ExportToCsv } from "export-to-csv";

const useStyles = makeStyles((darkTheme) => ({
  container: {
    flexGrow: 1,
    marginLeft: darkTheme.spacing(9.5),
    marginTop: darkTheme.spacing(4),
    paddingBottom: darkTheme.spacing(5),
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [darkTheme.breakpoints.up("sm")]: {
      display: "block",
    },
    color: "black",
    paddingTop: "3px",
    paddingRight: "6px",
  },
  search: {
    position: "relative",
    borderRadius: "10px",
    // backgroundColor: (darkTheme.palette.type !== 'light') ? 'blue' : 'green',
    // '&:hover': {
    //   backgroundColor: fade("#f1f1f1", 0.8),
    // },
    marginRight: darkTheme.spacing(1),
    marginLeft: "20px",
    width: "45%",
    color: "black",
  },
  searchIcon: {
    padding: darkTheme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "grey",
  },
  inputInput: {
    // top right bottom left
    padding: darkTheme.spacing(1.4, 1, 1.4, 0),
    // vertical padding + font size from searchIcon
    fontSize: "18px",
    paddingLeft: `calc(1em + ${darkTheme.spacing(4)}px)`,
    transition: darkTheme.transitions.create("width"),
    width: "100%",
    [darkTheme.breakpoints.up("md")]: {
      width: "70ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [darkTheme.breakpoints.up("md")]: {
      display: "flex",
    },
    color: "black",
    paddingTop: "3px",
  },
  "@global": {
    "*::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.1)",
      // backgroundColor: 'rgba(0,0,0,0.5)'
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "#cccccc",
      borderRadius: "10px",
    },
  },
  fab: {
    // margin: theme.spacing.unit, // You might not need this now
    position: "fixed",
    bottom: darkTheme.spacing.unit * 2,
    right: darkTheme.spacing.unit * 3,
  },
  backdrop: {
    zIndex: darkTheme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

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

export default function HomePage(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  var userLS;
  const [input, setinput] = useState("");
  const [filter, setFilter] = useState(null);
  const [subs, setSubs] = useState([]);
  const [drop, setDrop] = useState(false);
  const [go, setGo] = useState(false);
  const [dataList, setDataList] = useState(null);
  const [morePresent, setMorePresent] = useState(true);
  const [openBackdrop, setBackdrop] = useState(false);
  const [subredditsList, setSubredditsList] = useState([]);
  var apiurl = process.env.REACT_APP_apiUrl;

  var modeL = JSON.parse(localStorage.getItem("mode"));

  const [darkState, setDarkState] = useState(modeL.dark);

  const darkTheme = createMuiTheme({
    ...theme,
    palette: {
      type: darkState ? "dark" : "light",
      primary: {
        main: "#ffffff",
      },
      secondary: {
        main: "#000000",
      },
      background: {
        main: "#ffffff",
        light: "#DAE0E6",
        dark: "black",
      },
    },
    typography: {
      fontSize: 17,
      useNextVariants: true,
      fontFamily: ['"Source Sans Pro"', "sans-serif"].join(","),
      h5: {
        fontFamily: ['"Pacifico"', "cursive"].join(","),
      },
    },
  });

  const handleThemeChange = () => {
    modeL.dark = !modeL.dark;
    localStorage.setItem("mode", JSON.stringify(modeL));
    setDarkState(modeL.dark);
  };

  if (localStorage.getItem("user")) {
    userLS = JSON.parse(localStorage.getItem("user"));
  }

  // getting savedContent
  useEffect(() => {
    setDataList(userLS);
    setGo(true);
  }, []);

  // Updating accessToken using refreshToken
  useEffect(() => {
    if (userLS) {
      if (userLS.tokenTime && userLS.refreshToken) {
        var myDate = userLS.tokenTime;

        function refreshToken() {
          if (Date.now() - myDate > 3600000) {
            axios
              .post(
                apiurl + "/reddit/refreshAccessToken",
                { refreshToken: userLS.refreshToken },
                { "Content-Type": "application/json" }
              )
              .then((res) => {
                if (res.data.redditAccessToken && res.status === 200) {
                  // localStorage.setItem('user', JSON.stringify({accessToken: res.data.redditAccessToken, tokenTime: Date.now(), refreshToken: res.data.redditRefreshToken}))
                  userLS["accessToken"] = res.data.redditAccessToken;
                  userLS["tokenTime"] = Date.now();
                  localStorage.setItem("user", JSON.stringify(userLS));
                  console.log("updated access token");
                } else {
                  console.log("failed!");
                }
              })
              .catch((error) => {
                console.log(error);
              });

            myDate = Date.now();
          }
        }

        const interval = setInterval(() => refreshToken(), 10000);
        return () => {
          clearInterval(interval);
        };
      }
    }
  }, []);

  function refreshContent() {
    if (userLS) {
      setBackdrop(true);
      console.log("refreshing saved content");

      axios
        .post(
          apiurl + "/reddit/getSavedContent",
          { accessToken: userLS.accessToken },
          { "Content-Type": "application/json" }
        )
        .then((res) => {
          console.log(res);
          userLS["savedContent"] = res.data.savedContent;
          localStorage.setItem("user", JSON.stringify(userLS));

          setDataList({
            ...dataList,
            savedContent: res.data.savedContent,
          });

          setMorePresent(true);

          setBackdrop(false);
        })
        .catch((error) => {
          console.log(error);
          setBackdrop(false);
        });
    }
  }

  function loadMoreContent() {
    if (userLS) {
      setBackdrop(true);

      axios
        .post(
          apiurl + "/reddit/getMoreContent",
          {
            accessToken: userLS.accessToken,
            after: dataList.savedContent[dataList.savedContent.length - 1].name,
            userName: userLS.redditName,
          },
          { "Content-Type": "application/json" }
        )
        .then((res) => {
          console.log("fetching more saved content");
          console.log(res.data.moreContent);

          setDataList({
            ...dataList,
            savedContent: dataList.savedContent.concat(res.data.moreContent),
          });

          setMorePresent(res.data.more);

          setBackdrop(false);
        })
        .catch((error) => {
          console.log(error);
          setBackdrop(false);
        });
    }
  }

  function renderContent() {
    if (input === "") {
      if (filter === null) {
        if (subs.length === 0) {
          return dataList.savedContent.map((content) => (
            <Content key={content.id} props={content}></Content>
          ));
        } else {
          return dataList.savedContent.map((content) =>
            subs.includes(content.subreddit.toLowerCase()) ? (
              <Content key={content.id} props={content}></Content>
            ) : null
          );
        }
      } else if (filter === "posts") {
        if (subs.length === 0) {
          return dataList.savedContent.map((content) =>
            content.title ? (
              <Content key={content.id} props={content}></Content>
            ) : null
          );
        } else {
          return dataList.savedContent.map((content) =>
            content.title ? (
              subs.includes(content.subreddit.toLowerCase()) ? (
                <Content key={content.id} props={content}></Content>
              ) : null
            ) : null
          );
        }
      } else {
        if (subs.length === 0) {
          return dataList.savedContent.map((content) =>
            content.link_title ? (
              <Content key={content.id} props={content}></Content>
            ) : null
          );
        } else {
          return dataList.savedContent.map((content) =>
            content.link_title ? (
              subs.includes(content.subreddit.toLowerCase()) ? (
                <Content key={content.id} props={content}></Content>
              ) : null
            ) : null
          );
        }
      }
    } else {
      if (filter === null) {
        return dataList.savedContent.map((content) =>
          content.title ? (
            input.some((v) => content.title.toLowerCase().includes(v)) ||
            input.some((v) => content.selftext.toLowerCase().includes(v)) ||
            input.some((v) => content.subreddit.toLowerCase().includes(v)) ? (
              <Content key={content.id} props={content}></Content>
            ) : null
          ) : input.some((v) => content.link_title.toLowerCase().includes(v)) ||
            input.some((v) => content.body.toLowerCase().includes(v)) ||
            input.some((v) => content.subreddit.toLowerCase().includes(v)) ? (
            <Content key={content.id} props={content}></Content>
          ) : null
        );
      } else if (filter === "posts") {
        return dataList.savedContent.map((content) =>
          content.title ? (
            input.some((v) => content.title.toLowerCase().includes(v)) ||
            input.some((v) => content.selftext.toLowerCase().includes(v)) ||
            input.some((v) => content.subreddit.toLowerCase().includes(v)) ? (
              <Content key={content.id} props={content}></Content>
            ) : null
          ) : null
        );
      } else {
        return dataList.savedContent.map((content) =>
          content.link_title ? (
            input.some((v) => content.link_title.toLowerCase().includes(v)) ||
            input.some((v) => content.body.toLowerCase().includes(v)) ||
            input.some((v) => content.subreddit.toLowerCase().includes(v)) ? (
              <Content key={content.id} props={content}></Content>
            ) : null
          ) : null
        );
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

  function handleInput(e) {
    var arrKeywords = e.target.value.toLowerCase().split(/[ ,]+/);
    var keywords = arrKeywords.filter(function (el) {
      return el !== "" && el !== null;
    });

    if (keywords.length === 0) {
      setinput("");
    } else {
      setinput(keywords);
    }
  }

  function exportCSV() {
    setBackdrop(true);
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "My Saves",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: "reddit_saves",
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);

    axios
      .post(
        apiurl + "/reddit/getCSV",
        { accessToken: userLS.accessToken },
        { "Content-Type": "application/json" }
      )
      .then((res) => {
        console.log(res);
        csvExporter.generateCsv(res.data.csvData);
        setBackdrop(false);
      })
      .catch((error) => {
        console.log(error);
        setBackdrop(false);
      });
  }

  function handleLogout() {
    console.log("Logging out");
    localStorage.removeItem("user");
    localStorage.removeItem("unsave");

    history.push(`/`);
  }

  useEffect(() => {
    if (dataList) {
      var myset = new Set();

      console.log(dataList);
      dataList.savedContent.map((content) => myset.add(content.subreddit));

      var temparr = [...myset];
      setSubredditsList(temparr.sort());
    }
  }, [dataList]);


  if (localStorage.getItem("user")) {
    if (userLS.redditName) {
      if (go === true) {
        return (
          <MuiThemeProvider theme={darkTheme}>
            <CssBaseline />
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
              <div
                style={{
                  backgroundColor: darkState ? "black" : "#DAE0E6",
                  minHeight: "100vh",
                }}
              >
                <div className={classes.grow}>
                  <StyledAppBar
                    position="fixed"
                    style={{
                      boxShadow: "none",
                      background: darkState ? "#1A1A1B" : "white",
                      borderColor: darkState ? "#343536" : "#d9d9d9",
                    }}
                  >
                    <Toolbar style={{ paddingLeft: "18px" }}>
                      <Typography
                        className={classes.title}
                        variant="h5"
                        noWrap
                        style={{ color: darkState ? "#C0C0C0" : "black" }}
                      >
                        Savedit
                      </Typography>

                      <div
                        className={classes.search}
                        style={{
                          backgroundColor: darkState ? "#343536" : "#e8e8e8",
                        }}
                      >
                        <div className={classes.searchIcon}>
                          <SearchIcon />
                        </div>
                        <InputBase
                          placeholder="Search…"
                          classes={{
                            input: classes.inputInput,
                          }}
                          inputProps={{ "aria-label": "search" }}
                          onChange={handleInput}
                          style={{ color: darkState ? "white" : "inherit" }}
                        />
                      </div>

                      <Tooltip
                        title={
                          <p style={{ fontSize: 14, margin: 4 }}>
                            Filter by subreddits
                          </p>
                        }
                        arrow
                      >
                        <IconButton
                          onClick={() => {
                            setDrop(!drop);
                          }}
                          style={{
                            color: "#cccccc",
                            padding: 0,
                            marginRight: "8px",
                          }}
                        >
                          {drop ? (
                            <ExpandLessIcon fontSize="large" />
                          ) : (
                            <ExpandMoreIcon fontSize="large" />
                          )}
                        </IconButton>
                      </Tooltip>

                      <ToggleButtonGroup
                        value={filter}
                        exclusive
                        onChange={handleFilter}
                        aria-label="text alignment"
                      >
                        <ToggleButton
                          value="posts"
                          style={{
                            color: "#A9A9A9",
                            padding: "5px",
                            borderColor: darkState ? "#343536" : "#cccccc",
                          }}
                        >
                          Posts
                        </ToggleButton>

                        <ToggleButton
                          value="comments"
                          style={{
                            color: "#A9A9A9",
                            padding: "5px",
                            borderColor: darkState ? "#343536" : "#cccccc",
                          }}
                        >
                          Comments
                        </ToggleButton>
                      </ToggleButtonGroup>

                      <Tooltip
                        title={
                          <p style={{ fontSize: 14, margin: 4 }}>Refresh</p>
                        }
                        arrow
                      >
                        <IconButton
                          onClick={refreshContent}
                          style={{
                            color: "#cccccc",
                            padding: 0,
                            marginLeft: "8px",
                          }}
                        >
                          <RefreshIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title={
                          <p style={{ fontSize: 14, margin: 4 }}>
                            Export to excel
                          </p>
                        }
                        arrow
                      >
                        <IconButton
                          onClick={exportCSV}
                          style={{
                            color: "#cccccc",
                            padding: 0,
                            marginLeft: "12px",
                          }}
                        >
                          <GetAppIcon />
                        </IconButton>
                      </Tooltip>

                      <div className={classes.grow} />

                      <div className={classes.sectionDesktop}>
                        <Tooltip
                          title={
                            <p style={{ fontSize: 14, margin: 4 }}>
                              Toggle light/dark theme
                            </p>
                          }
                          arrow
                        >
                          <IconButton
                            onClick={handleThemeChange}
                            style={{ marginRight: "10px" }}
                          >
                            {darkState ? (
                              <Brightness7Icon />
                            ) : (
                              <Brightness4Icon />
                            )}
                          </IconButton>
                        </Tooltip>
                        <p style={{ color: darkState ? "#C0C0C0" : "black" }}>
                          {userLS.redditName}
                        </p>
                        <Tooltip
                          title={
                            <p style={{ fontSize: 14, margin: 4 }}>Logout</p>
                          }
                          arrow
                        >
                          <IconButton
                            onClick={handleLogout}
                            style={{ paddingRight: 0 }}
                          >
                            <ExitToAppIcon />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </Toolbar>

                    <Divider />

                    <Collapse in={drop}>
                      <div className={classes.grow}>
                        <FilterAppBar
                          position="static"
                          style={{
                            boxShadow: "none",
                            background: darkState ? "#1A1A1B" : "white",
                          }}
                        >
                          <Toolbar>
                            <ToggleButtonGroup
                              value={subs}
                              onChange={handleSubs}
                              aria-label="text formatting"
                            >
                              {subredditsList.map((sub) => (
                                <ToggleButton
                                  key={sub}
                                  value={sub.toLowerCase()}
                                  style={{
                                    marginRight: "15px",
                                    textTransform: "none",
                                    color: "#A9A9A9",
                                    borderStyle: "solid",
                                    borderRadius: "5px",
                                    borderColor: darkState
                                      ? "#343536"
                                      : "#cccccc",
                                  }}
                                >
                                  {sub}
                                </ToggleButton>
                              ))}
                            </ToggleButtonGroup>
                          </Toolbar>
                        </FilterAppBar>
                      </div>
                    </Collapse>
                  </StyledAppBar>
                </div>

                <Toolbar id="back-to-top-anchor" />

                <Container
                  maxWidth="lg"
                  style={{ marginTop: drop ? "120px" : null }}
                  className={classes.container}
                >
                  <Masonry
                    breakpointCols={3}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                  >
                    {renderContent()}
                  </Masonry>

                  {morePresent ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={loadMoreContent}
                    >
                      Load More
                    </Button>
                  ) : null}
                </Container>

                <ScrollTop {...props}>
                  <Fab
                    style={{
                      backgroundColor: darkState ? "#1A1A1B" : "white",
                      color: darkState ? "#343536" : "#707070",
                    }}
                    size="small"
                    aria-label="scroll back to top"
                    className={classes.fab}
                  >
                    <KeyboardArrowUpIcon />
                  </Fab>
                </ScrollTop>
              </div>

              <Backdrop className={classes.backdrop} open={openBackdrop}>
                <CircularProgress color="inherit" />
              </Backdrop>
            </SnackbarProvider>
          </MuiThemeProvider>
        );
      } else {
        return <LoadingScreen />;
      }
    } else {
      return (
        <div style={{ textAlign: "center", margin: "auto", marginTop: "35vh" }}>
          <h3>Reddit name is missing?</h3>
        </div>
      );
    }
  } else {
    return (
      <div style={{ textAlign: "center", margin: "auto", marginTop: "35vh" }}>
        <h3>Please Login first</h3>
        {history.push(`/`)}
      </div>
    );
  }
}
