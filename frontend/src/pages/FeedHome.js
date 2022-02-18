import React from "react";
import NewPost from "../components/feed/NewPost";
import Thread from "../components/Thread";

const FeedHome = () => {
  return (
    <div className="feed">
      <div className="main">
        <div className="feed-header">
          <NewPost />
        </div>
        <Thread />
      </div>
    </div>
  );
};

export default FeedHome;
