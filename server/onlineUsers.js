const onlineUsers = [];

const isUserOnline = (id) => onlineUsers.includes(id);

const addUserOnline = (id) => {
  if (isUserOnline(id)) return;

  onlineUsers.push(id);
};

const removeUserOnline = (id) => {
  if (!isUserOnline(id)) return;

  userIndex = onlineUsers.indexOf(id);

  return onlineUsers.splice(userIndex, 1);
};

module.exports = { isUserOnline, addUserOnline, removeUserOnline };
