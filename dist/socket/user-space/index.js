module.exports = (namespace) => {
    namespace.on('connection', (socket) => {
        console.log('a user connected', socket.id);
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('request', (msg) => {
            console.log('request');
        });
    });
};
//# sourceMappingURL=index.js.map