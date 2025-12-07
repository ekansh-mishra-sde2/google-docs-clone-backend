require("@dotenvx/dotenvx").config();
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const registerDocumentSocket = require("./sockets/documentSocket");

const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

connectDB();

const io = new Server(PORT, {
  cors: {
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"],
  },
});

registerDocumentSocket(io);

console.log(`Socket.io server running on port ${PORT}`);
console.log(`CORS origin: ${CORS_ORIGIN}`);
