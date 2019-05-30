import { Alert } from "react-native";
import { Permissions, Contacts } from "expo";

const GetContactsPermissions = async () => {
  const { status } = await Permissions.askAsync(Permissions.CONTACTS);
  return status === "granted";
};

const GetContacts = async () => {
  const contactsPermissionGranted = await GetContactsPermissions();

  if (contactsPermissionGranted) {
    const contacts = await Contacts.getContactsAsync();
    console.log(contacts);

    // TODO: Finish
  }
};

export { GetContactsPermissions, GetContacts };
