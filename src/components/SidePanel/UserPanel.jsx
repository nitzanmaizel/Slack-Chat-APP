import React from "react";
import { Dropdown, Grid, Header, Icon } from "semantic-ui-react";
import { firebase } from "../../firebase";

const UserPanel = () => {
  const dropDownOptions = () => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>User</strong>
        </span>
      ),
      disabled: true,
    },
    {
      key: "avatar",
      text: <span>Change Avatar</span>,
    },
    {
      key: "signOut",
      text: <span onClick={handleSignOut}>Sign Out</span>,
    },
  ];

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      console.log("Sign Out");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          {/*App Header */}
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>DevChat</Header.Content>
          </Header>
        </Grid.Row>
        {/*User DropDown*/}
        <Header style={{ padding: "0.25em" }} as="h4" inverted>
          <Dropdown trigger={<span>User</span>} options={dropDownOptions()} />
        </Header>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;
