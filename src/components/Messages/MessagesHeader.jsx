import React from "react";
import { Header, Icon, Input, Segment } from "semantic-ui-react";

const MessagesHeader = () => {
  return (
    <Segment clearing>
      <Header as="h2" floated="left" fluid="true" style={{ marginBottom: 0 }}>
        <span>
          Channel <Icon name="star outline" color="black" />
        </span>
        <Header.Subheader>2 Users</Header.Subheader>
      </Header>

      <Header floated="right">
        <Input
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;
