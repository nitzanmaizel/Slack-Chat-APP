import React, { useState } from "react";
import { firebase, database } from "../../firebase";
import { Link } from "react-router-dom";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import md5 from "md5";

const Register = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const isFormValid = () => {
    if (isFormEmpty(formData)) {
      setError([{ message: "Please fill in all fields" }]);
      return false;
    } else if (!isPasswordValid(formData)) {
      setError([{ message: "Password is invalid" }]);
      return false;
    } else {
      return true;
    }
  };

  const isFormEmpty = ({ userName, email, password, passwordConfirmation }) => {
    return (
      !userName.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };
  const isPasswordValid = ({ password, passwordConfirmation }) => {
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else if (password !== passwordConfirmation) {
      return false;
    } else {
      return true;
    }
  };

  const displayError = (error) =>
    error.map((err, i) => <p key={i}>{err.message}</p>);

  const handleInputError = (error, inputName) => {
    return error.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      try {
        setLoading(true);
        setError([]);
        const newUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        await newUser.user.updateProfile({
          displayName: userName,
          photoURL: `http://gravatar.com/avatar/${md5(
            newUser.user.email
          )}?d=identicon`,
        });
        await database.ref("/users").child(newUser.user.uid).set({
          name: newUser.user.displayName,
          avatar: newUser.user.photoURL,
        });
        setLoading(false);
        console.log("User Saved To Database");
      } catch (err) {
        console.error("error", err);
        setLoading(false);
        setError([{ message: err.message }]);
      }
    }
  };

  const { userName, email, password, passwordConfirmation } = formData;

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="orange" textAlign="center">
          <Icon name="puzzle piece" color="orange" />
          Register for DevChat
        </Header>
        <Form onSubmit={onSubmitForm} size="large">
          <Segment stacked>
            <Form.Input
              fluid
              name="userName"
              icon="user"
              iconPosition="left"
              placeholder="Username"
              type="text"
              value={userName}
              onChange={(e) => onChange(e)}
            />
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => onChange(e)}
              className={handleInputError(error, "email")}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => onChange(e)}
              className={handleInputError(error, "password")}
            />
            <Form.Input
              fluid
              name="passwordConfirmation"
              icon="repeat"
              iconPosition="left"
              placeholder="Password Confirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => onChange(e)}
              className={handleInputError(error, "password")}
            />
            <Button
              color="orange"
              fluid
              size="large"
              disabled={loading}
              className={loading ? "loading" : ""}
            >
              Register
            </Button>
          </Segment>
        </Form>
        {error.length > 0 && (
          <Message error>
            <h3>Error</h3>
            {displayError(error)}
          </Message>
        )}
        <Message>
          Already a user? <Link to="/login"> Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
