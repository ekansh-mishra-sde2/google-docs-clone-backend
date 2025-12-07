const Document = require("../models/Document");
const { defaultData } = require("../constants/defaults");

async function findOrCreateDocument(id) {
  if (!id) return null;

  const existingDoc = await Document.findById(id);
  if (existingDoc) return existingDoc;

  return await Document.create({ _id: id, data: defaultData });
}

async function saveDocument(id, data) {
  return Document.findByIdAndUpdate(id, { data });
}

module.exports = {
  findOrCreateDocument,
  saveDocument,
};
