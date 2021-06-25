import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@material-ui/core";
import { readMessage } from "../../store/utils/thunkCreators";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readMessage(props.otherUser.id, props.messages[0].conversationId));
  },[dispatch, props.otherUser.id]);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

export default Messages;
