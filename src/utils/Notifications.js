import { Permissions } from "expo";

const GetNotificationPermissions = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  return status === "granted";
};

export default GetNotificationPermissions;
