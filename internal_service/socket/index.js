const { Server } = require("socket.io");

let io;

function initialize(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
}

function getIO() {
  return io;
}

function emit(event, payload) {
  if (!io) return;

  io.emit(event, payload);
}

module.exports = {
  initialize,
  getIO,
  emit,
};
