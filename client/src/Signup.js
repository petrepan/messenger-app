import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  FormControl,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import AuthLayout from "./components/AuthLayout";

const Signup = ({ user, register }) => {
  const history = useHistory();
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthLayout
      title="Create an account."
      actionHelper="Already have an account?"
      actionLabel="Login"
      onClick={() => history.push("/login")}
      handleFormSubmit={handleRegister}
      submitBtnLabel="Create">
      <Grid container align="center" justify="center" direction="column">
        <FormControl>
          <TextField
            aria-label="username"
            label="Username"
            name="username"
            type="text"
            required
            fullWidth
          />
        </FormControl>
        <FormControl>
          <TextField
            label="E-mail address"
            aria-label="e-mail address"
            type="email"
            name="email"
            required
          />
        </FormControl>
        <FormControl error={!!formErrorMessage.confirmPassword}>
          <TextField
            aria-label="password"
            label="Password"
            type="password"
            inputProps={{ minLength: 6 }}
            name="password"
            required
          />
          <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
        </FormControl>
        <FormControl error={!!formErrorMessage.confirmPassword}>
          <TextField
            label="Confirm Password"
            aria-label="confirm password"
            type="password"
            inputProps={{ minLength: 6 }}
            name="confirmPassword"
            required
          />
          <FormHelperText>{formErrorMessage.confirmPassword}</FormHelperText>
        </FormControl>
      </Grid>
    </AuthLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
