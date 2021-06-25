import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@material-ui/core";
import { readMessage } from "../../store/utils/thunkCreators";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = ({ messages, otherUser, userId }) => {
  const firstConvoId = messages[0].conversationId;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readMessage(otherUser.id, firstConvoId));
  }, [dispatch, otherUser.id, firstConvoId]);

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
