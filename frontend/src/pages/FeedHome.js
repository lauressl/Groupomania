import React from "react";
import NewPost from "../components/feed/NewPost";
import Thread from "../components/Thread";

const FeedHome = () => {
  return (
    <div className="feed">
      <h1>Fil</h1>
      <div className="feed-header">
        <NewPost />
      </div>
      <Thread />
    </div>
  );
};

export default FeedHome;
