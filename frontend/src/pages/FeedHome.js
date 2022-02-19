import React from "react";
import NewPost from "../components/feed/NewPost";
import Thread from "../components/Thread";

const FeedHome = () => {
  return (
    <div className="feed">
      <div className="feed-header">
        <NewPost />
      </div>
      <Thread />
    </div>
  );
};

export default FeedHome;
