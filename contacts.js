const fs = require("fs/promises");
const path = require("path");

const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const list = JSON.parse(data);
  return list;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => Number(item.id) === contactId);
  contact
    ? console.log("in contacts.js:", contact)
    : console.log(`contact with id ${contactId} not found`);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const newContactsList = contacts.filter(
    (contact) => contact.id !== contactId
  );
  console.log(newContactsList);
  await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const id = nanoid();
  const newContact = { id, name, email, phone };
  console.log("newContact:", newContact);
  const contactsList = JSON.stringify([...contacts, newContact], null, "\t");
  await fs.writeFile(contactsPath, JSON.stringify(contactsList));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
