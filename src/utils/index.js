export { GetLocationPermissions, GetUserLocation } from "./Location";

export { GetCameraPermissions, GetCameraImage } from "./Camera";

export { GetCameraRollPermissions, GetCameraRollImage } from "./CameraRoll";

export { GetContactsPermissions, GetContacts } from "./Contacts";

export { GetNotificationPermissions } from "./Notifications";

export const formatNum = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
