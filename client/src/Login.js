import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  InputAdornment,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import AuthLayout from "./components/AuthLayout";

const useStyles = makeStyles((theme) => ({
  forgotPasswordCta: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.fontSizeSm,
    fontWeight: theme.typography.fontWeightBold,
    cursor: "pointer",
  },
}));

const Login = ({ user, login }) => {
  const classes = useStyles();
  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <AuthLayout
      title="Welcome back!"
      actionHelper="Don’t have an account?"
      actionLabel="Create account"
      onClick={() => history.push("/register")}
      handleFormSubmit={handleLogin}
      submitBtnLabel="Login">
      <Grid container align="center" justify="center" direction="column">
        <FormControl margin="normal" required>
          <TextField
            aria-label="Email address"
            label="E-mail address"
            name="username"
            type="text"
          />
        </FormControl>
        <Box my={2} />
        <FormControl margin="normal" required>
          <TextField
            aria-label="password"
            label="Password"
            type="password"
            name="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span className={classes.forgotPasswordCta}>Forgot?</span>
                </InputAdornment>
              ),
            }}
          />
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
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
