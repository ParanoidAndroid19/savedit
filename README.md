<h1 align="center"><a href="https://savedit.herokuapp.com/" target="_blank">Savedit</a> for Reddit</h1>
<h3 align="center">Filter, manage and search through all your reddit saved posts and comments easily</h1>
<!-- <img src="https://user-images.githubusercontent.com/30766392/115850066-2b3b4200-a443-11eb-911d-1ff9e31e5853.png"> -->
<img src="https://user-images.githubusercontent.com/30766392/143483233-ef5bda68-7c03-490d-9f09-5e4ef89d12a6.png">

## Overview
Reddit allows its users to save posts and comments, however does not allow users to search through the saved content or filter based on subreddits, posts or comments. Savedit is a Single Page Application (SPA) built using React.js, Node.js, Material UI and Reddit API.

## Privacy
This is a javascript application that runs completely in the user's browser, all reddit data is stored in each user's individual browser. There is no backend server. All reddit data is visible and accessable only to each individual user, no user details are sent to any external servers. Reddit authentication is done 
using OAuth2 access flow provided by the Reddit API. The reddit API access is only requested for an hour.

## Features
- All saved posts and comments are retreived from Reddit and displayed in a single page, in a clear and simple manner.
- All subreddits with saved posts are displayed.
- Filter saves by only posts, only comments, or only specific subreddit.
- Search through all the saved content or only through posts/comments.
- Export all your saves to excel
- Post thumbnails are displayed
- Dark mode
- Linked to the original post/comment on reddit.

## ToDo
- [X] Unsave option
- [X] Pagination
- [X] Export all saved posts in a csv file
- [X] Deploy
