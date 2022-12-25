const argv = require("yargs").argv;

const { listContacts, getContactById, removeContact, addContact } = require("./contacts");

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts)
      break;

    case "get":
      const contact = await getContactById(id);
      console.log("in index.js:", contact);
      break;

    case "add":
      await addContact(name, email, phone)
      break;

    case "remove":
      await removeContact(id)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv)