import React from "react"

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
        link_title
    },
    unsave
}) => {
  // for posts having video
  if (is_video) {
      if (domain === "v.redd.it") {
          return (
              <div>
                <a target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
                  <h3>{title} - {subreddit}</h3>
                </a>
                  <video preload="auto" controls>
                      <source
                          src={secure_media.reddit_video.fallback_url}
                          type="video/webm"
                      ></source>
                  </video>
                  <p>--------------------------------------------------</p>
              </div>
          )
      }
  }

  // for posts having image
  else if (post_hint === "image") {
      return (
        <div>
          <a target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
          <h3>{title} - {subreddit}</h3>
          <img src={url} width='50%'/>
          </a>
          <p>--------------------------------------------------</p>
        </div>
      )
  }
  else if (post_hint === "link" && domain === "i.imgur.com") {
      return (
          <div>
            <a target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
              <h3>{title} - {subreddit}</h3>
              <video preload="auto" controls>
                  <source
                      src={url.substring(0, url.length - 4) + "mp4"}
                      type="video/webm"
                  ></source>
              </video>
            </a>
              <p>--------------------------------------------------</p>
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
        <div>
          <a target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
            <h3>{title} - {subreddit}</h3>
            <p>{selftext.slice(0,250)}...</p>
          </a>
          <p>--------------------------------------------------</p>
        </div>
      )
  }

  // for comments only: <div dangerouslySetInnerHTML={{ __html: body_html }} />
  else if (link_title) {
      return (
        <div>
          <a target="_blank" href={"https://reddit.com" + permalink} rel="noopener noreferrer">
            <h3>Commented on: {link_title} in {subreddit}</h3>
            <p>{body.slice(0,250)}...</p>
          </a>
          <p>--------------------------------------------------</p>
        </div>
      )
  }
  else if (thumbnail === "self") {
       return <div>no thumbnail</div>
  }
  else {
      return <div>{body}</div>
  }
}

export default Content
