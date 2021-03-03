import React, { Fragment } from "react";
import { Comment, Segment } from "semantic-ui-react";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";

const Messages = () => {
  return (
    <Fragment>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages"></Comment.Group>
      </Segment>
      <MessagesForm />
    </Fragment>
  );
};

export default Messages;
