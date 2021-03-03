import React, { Fragment } from "react";
import { Comment, Segment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";

const Messages = () => {
  return (
    <Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages"></Comment.Group>
      </Segment>
    </Fragment>
  );
};

export default Messages;
