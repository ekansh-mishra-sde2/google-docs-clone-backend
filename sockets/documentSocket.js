const { CUSTOM_EVENTS, ACTION_EVENTS } = require("../constants/events");
const {
  findOrCreateDocument,
  saveDocument,
} = require("../controller/documentController");

function registerDocumentSocket(io) {
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on(ACTION_EVENTS.GET_DOCUMENT, async (documentId) => {
      const document = await findOrCreateDocument(documentId);

      socket.join(documentId);
      console.log("documentId", documentId);
      socket.emit(ACTION_EVENTS.LOAD_DOCUMENT, document.data);

      // Receive changes → broadcast to others
      socket.on(CUSTOM_EVENTS.SEND_CHANGES, (delta) => {
        socket.broadcast
          .to(documentId)
          .emit(CUSTOM_EVENTS.RECEIVE_CHANGES, delta);
      });

      // Save document
      socket.on("save-document", async (data) => {
        await saveDocument(documentId, data);
      });
    });
  });
}

module.exports = registerDocumentSocket;
