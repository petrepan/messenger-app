const onlineUsers = [];

const findUser = (id) => {
  return onlineUsers.includes(id);
};

const addUserOnline = (id) => {
  if (findUser(id)) return;

  onlineUsers.push(id);

  return id;
};

const removeUserOnline = (id) => {
  if (!findUser(id)) return;

  userIndex = onlineUsers.indexOf(id);

  return onlineUsers.splice(userIndex, 1);
};

module.exports = { findUser, addUserOnline, removeUserOnline };
