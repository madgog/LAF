const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    socket.onAny((event, ...args) => {
        console.log(event, args);
    });

    socket.on("join", ({ username, room }) => {
        socket.join(room);
        socket.to(room).emit("message", { username: "LAF", message: `${username} has joined` })
    });

    socket.on("message", ({ username, message, room }) => {
        socket.to(room).emit("message", { username, message });
    });
})

httpServer.listen(3001);