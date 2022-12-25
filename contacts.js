const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const list = JSON.parse(data);
  return list;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id == contactId);
  contact
    ? console.log("in contacts.js:", contact)
    : console.log(`contact with id ${contactId} not found`);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContactsList = contacts.filter(
    (contact) => contact.id != contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = nanoid();
  const newContact = { id, name, email, phone };
  const contactsList = JSON.stringify([...contacts, newContact], null, "\t");
  await fs.writeFile(contactsPath, contactsList);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
