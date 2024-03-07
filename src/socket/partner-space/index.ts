module.exports = (namespace) => {
  namespace.on('connection', (socket) => {
    console.log('a partner connected', socket.id);
    socket.on('disconnect', () => {
      console.log('partner disconnected');
    });
    socket.on('accept', (msg) => {
      console.log('accept');
    });
  });
};
