import * as Permissions from "expo-permissions";

const GetNotificationPermissions = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  return status === "granted";
};

export default GetNotificationPermissions;
