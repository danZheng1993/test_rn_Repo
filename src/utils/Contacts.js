import { Alert } from "react-native";
import * as Contacts from "expo-contacts";
import * as Permissions from "expo-permissions";

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
  } else {
    Alert.alert("Contact permissions required.");
  }
};

export { GetContactsPermissions, GetContacts };
