import React, { useState, Fragment } from "react";
import { database } from "../../firebase";
import { Button, Form, Icon, Input, Menu, Modal } from "semantic-ui-react";

const Channels = (props) => {
  const [channels, setChannels] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    channelName: "",
    channelDetails: "",
  });
  const [channelsRef] = useState(database.ref("/channels"));
  const [user] = useState(props.currentUser);

  const addChannel = async ({ channelName, channelDetails }) => {
    try {
      const key = channelsRef.push().key;

      const newChannel = {
        id: key,
        name: channelName,
        details: channelDetails,
        createdBy: {
          name: user.displayName,
          avatar: user.photoURL,
        },
      };

      await channelsRef.child(key).update(newChannel);
      setFormData({
        channelName: "",
        channelDetails: "",
      });
      closeModal();
      console.log("Channel added");
    } catch (err) {
      console.error("error", err);
    }
  };

  const isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (isFormValid(formData)) {
      try {
        addChannel(formData);
        console.log("Channel Created");
      } catch (err) {
        console.error("error", err);
      }
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <Fragment>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" />
            CHANNELS
          </span>{" "}
          ({channels.length}) <Icon name="add" onClick={openModal} />
        </Menu.Item>
      </Menu.Menu>

      <Modal basic open={isOpen} onClose={closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onSubmitForm}>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                onChange={onChange}
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                onChange={onChange}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" inverted onClick={onSubmitForm}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
};

export default Channels;
