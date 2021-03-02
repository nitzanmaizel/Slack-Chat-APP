// import React, { useState, useEffect, Fragment } from "react";
// import { database } from "../../firebase";
// import { Button, Form, Icon, Input, Menu, Modal } from "semantic-ui-react";

// const Channels = (props) => {
//   const [channels, setChannels] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     channelName: "",
//     channelDetails: "",
//   });
//   const [channelsRef] = useState(database.ref("/channels"));
//   const [user] = useState(props.currentUser);

//   useEffect(() => {
//     addListeners();
//   }, []);

//   const addListeners = () => {
//     let channelsArry = [];
//     channelsRef.on("child_added", (snap) => {
//       channelsArry.push(snap.val());
//       setChannels(channelsArry);
//     });
//     console.log(channels);
//   };

//   // const displayChannels = (channels) => {
//   //   channels.length > 0 &&
//   //     channels.map((channel) => (
//   //       <Menu.Item
//   //         key={channel.id}
//   //         onClick={() => console.log(channel)}
//   //         name={channel.name}
//   //         style={{ opacity: 0.7 }}
//   //       >
//   //         # {console.log(channel.name)}
//   //       </Menu.Item>
//   //     ));
//   // };

//   const addChannel = async ({ channelName, channelDetails }) => {
//     try {
//       const key = channelsRef.push().key;

//       const newChannel = {
//         id: key,
//         name: channelName,
//         details: channelDetails,
//         createdBy: {
//           name: user.displayName,
//           avatar: user.photoURL,
//         },
//       };

//       await channelsRef.child(key).update(newChannel);
//       setFormData({
//         channelName: "",
//         channelDetails: "",
//       });
//       closeModal();
//       console.log("Channel added");
//     } catch (err) {
//       console.error("error", err);
//     }
//   };

//   const isFormValid = ({ channelName, channelDetails }) =>
//     channelName && channelDetails;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmitForm = async (e) => {
//     e.preventDefault();
//     if (isFormValid(formData)) {
//       try {
//         addChannel(formData);
//         console.log("Channel Created");
//       } catch (err) {
//         console.error("error", err);
//       }
//     }
//   };

//   const openModal = () => setIsOpen(true);
//   const closeModal = () => setIsOpen(false);
//   return (
//     <Fragment>
//       <Menu.Menu style={{ paddingBottom: "2em" }}>
//         <Menu.Item>
//           <span>
//             <Icon name="exchange" />
//             CHANNELS
//           </span>{" "}
//           ({channels.length}) <Icon name="add" onClick={openModal} />
//         </Menu.Item>
//         {channels.length > 0 &&
//           channels.map((channel) => {
//             return (
//               <Menu.Item
//                 key={channel.id}
//                 onClick={() => console.log(channel)}
//                 name={channel.name}
//                 style={{ opacity: 0.7 }}
//               >
//                 # {channel.name}
//               </Menu.Item>
//             );
//           })}
//       </Menu.Menu>

//       <Modal basic open={isOpen} onClose={closeModal}>
//         <Modal.Header>Add a Channel</Modal.Header>
//         <Modal.Content>
//           <Form onSubmit={onSubmitForm}>
//             <Form.Field>
//               <Input
//                 fluid
//                 label="Name of Channel"
//                 name="channelName"
//                 onChange={onChange}
//               />
//             </Form.Field>
//             <Form.Field>
//               <Input
//                 fluid
//                 label="About the Channel"
//                 name="channelDetails"
//                 onChange={onChange}
//               />
//             </Form.Field>
//           </Form>
//         </Modal.Content>
//         <Modal.Actions>
//           <Button color="green" inverted onClick={onSubmitForm}>
//             <Icon name="checkmark" /> Add
//           </Button>
//           <Button color="red" inverted onClick={closeModal}>
//             <Icon name="remove" /> Cancel
//           </Button>
//         </Modal.Actions>
//       </Modal>
//     </Fragment>
//   );
// };

// export default Channels;

import React from "react";
import { database } from "../../firebase";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Channels extends React.Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelsRef: database.ref("channels"),
    modal: false,
  };

  componentDidMount() {
    this.addListeners();
  }

  addListeners = () => {
    let loadedChannels = [];
    this.state.channelsRef.on("child_added", (snap) => {
      loadedChannels.push(snap.val());
      this.setState({ channels: loadedChannels });
    });
  };

  addChannel = () => {
    const { channelsRef, channelName, channelDetails, user } = this.state;

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

    channelsRef
      .child(key)
      .update(newChannel)
      .then(() => {
        this.setState({ channelName: "", channelDetails: "" });
        this.closeModal();
        console.log("channel added");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.addChannel();
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  displayChannels = (channels) =>
    channels.length > 0 &&
    channels.map((channel) => (
      <Menu.Item
        key={channel.id}
        onClick={() => console.log(channel)}
        name={channel.name}
        style={{ opacity: 0.7 }}
      >
        # {channel.name}
      </Menu.Item>
    ));

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  render() {
    const { channels, modal } = this.state;

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Channels;
