import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  unreadPreviewText: {
    fontWeight: "bold",
    fontSize: 13,
    color: "#000",
    letterSpacing: -0.17,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  notification: {
    height: 18,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser, unread } = conversation;

  const lastMessageArr =
    conversation.messages[conversation.messages.length - 1];

  const getPreviewTextStyle = () => {
    const isPreview =
      conversation.otherUser.id !== lastMessageArr.senderId ||
      lastMessageArr.isRead === true;
    return isPreview ? classes.previewText : classes.unreadPreviewText;
  };
  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>

        <Typography className={getPreviewTextStyle()}>
          {latestMessageText}
        </Typography>
      </Box>
      {unread > 0 && (
        <Badge
          classes={{ badge: `${classes.notification}` }}
          badgeContent={unread}
        />
      )}
    </Box>
  );
};

export default ChatContent;
