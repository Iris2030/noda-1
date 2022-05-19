const uniqid = require("uniqid");
const path = require("path");
const fs = require("fs").promises;
const contactsPath = path.resolve("./db/contacts.json");

async function getListContact() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function listContacts(){
    try {
        const contacts = await getListContact();
        console.table(contacts);
      } catch (error) {
        console.log(error);
      }
}


async function getContactById(contactId) {
  try {
    const contacts = await getListContact();
    const neededContact = await contacts.filter((contact) => {
      return contact.id === contactId;
    });
    console.table(neededContact);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: uniqid(),
    name,
    email,
    phone,
  };
  try {
    const contacts = await getListContact();
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
    console.table(updatedContacts)
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await getListContact();
    const updatedContacts = await contacts.filter((contact) => {
      return contact.id !== contactId;
    });
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts), "utf8");
    console.table(updatedContacts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, addContact, removeContact };
