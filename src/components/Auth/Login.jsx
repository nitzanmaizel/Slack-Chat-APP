import React, { useState } from "react";
import { firebase } from "../../firebase";
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

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

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
    if (isFormValid(formData)) {
      try {
        setLoading(true);
        setError([]);
        setLoading(false);
        const user = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        console.log("User Login", user);
      } catch (err) {
        console.error("error", err);
        setLoading(false);
        setError([{ message: err.message }]);
      }
    }
  };

  const isFormValid = ({ email, password }) => email && password;

  const { email, password } = formData;

  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h1" icon color="violet" textAlign="center">
          <Icon name="puzzle piece" color="violet" />
          Login to DevChat
        </Header>
        <Form onSubmit={onSubmitForm} size="large">
          <Segment stacked>
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
            <Button
              color="violet"
              fluid
              size="large"
              disabled={loading}
              className={loading ? "loading" : ""}
            >
              Log In
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
          Don't have an accunt? <Link to="/register"> Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
