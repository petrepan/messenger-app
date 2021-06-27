import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  SvgIcon,
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import bgImage from "../assets/bg-img.png";
import { ReactComponent as Bubble } from "../assets/bubble.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflow: "hidden",
  },
  bgWithGradient: {
    backgroundImage: `
      linear-gradient(
        to bottom, ${theme.palette.gradient.start(
          80
        )}, ${theme.palette.gradient.end(80)}
      ),
      url("${bgImage}")
    `,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "center",
  },
  bubble: {
    width: "67px",
    height: "67px",
    marginBottom: theme.spacing(1),
  },
  authSidebar: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: "0 auto",
  },
  authSidebarText: {
    color: "white",
  },
  actionHelper: {
    color: theme.palette.secondary.main,
    fontSize: theme.typography.fontSize,
  },
  action: {
    width: "170px",
    height: "52px",
    marginLeft: theme.spacing(4),
    borderRadius: "5px",
    boxShadow: "0 2px 9px 0 rgba(74, 106, 149, 0.2)",
    color: theme.palette.primary.main,
  },
  heightFull: {
    height: "100%",
  },
  formWrapper: {
    width: "60%",
    minWidth: "300px",
    margin: "30px auto 0px",
  },
  form: {
    marginTop: "15px"
  },
  btnWrapper: {
    textAlign: "center",
  },
  submitBtn: {
    width: "160px",
    height: "56px",
    borderRadius: "3px",
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));

const AuthLayout = (props) => {
  const classes = useStyles();
  return (
    <Grid container component="main" spacing={0} className={classes.root}>
      <Hidden only={["xs", "sm"]}>
        <Grid item md={5} className={classes.bgWithGradient}>
          <Box className={classes.authSidebar} py={5}>
            <SvgIcon viewBox="0 0 67 67" className={classes.bubble}>
              <Bubble />
            </SvgIcon>
            <Box my={2} />
            <Typography
              variant="h5"
              component="h1"
              className={classes.authSidebarText}>
              Converse with anyone
            </Typography>
            <Typography
              variant="h5"
              component="h1"
              className={classes.authSidebarText}>
              with any language
            </Typography>
          </Box>
        </Grid>
      </Hidden>

      <Grid item xs={12} md={7}>
        <Grid container className={classes.heightFull} spacing={0}>
          <Grid item xs={12}>
            <Box p={3}>
              <Grid container alignItems="center" justify="flex-end">
                <Typography
                  variant="subtitle1"
                  component="h3"
                  className={classes.actionHelper}>
                  {props.actionHelper}
                </Typography>
                <Button onClick={props.onClick} className={classes.action}>
                  {props.actionLabel}
                </Button>
              </Grid>
            </Box>
          </Grid>
          <Grid item className={classes.heightFull} xs={12}>
            <Grid container spacing={0} justify="center" direction="column">
              <Box className={classes.formWrapper}>
                <Typography align="left" variant="h4" component="h4">
                  {props.title}
                </Typography>
                <form
                  className={classes.form}
                  onSubmit={props.handleFormSubmit}>
                  {props.children}
                  <Box className={classes.btnWrapper} my={4}>
                    <Button
                      className={classes.submitBtn}
                      type="submit"
                      variant="contained"
                      size="large">
                      {props.submitBtnLabel}
                    </Button>
                  </Box>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
