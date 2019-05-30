import { Alert } from "react-native";
import { Permissions, ImagePicker } from "expo";
import { GetCameraRollPermissions } from "./";

const GetCameraPermissions = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA);
  return status === "granted";
};

const GetCameraImage = async () => {
  const options = {
    quality: 0.5,
    base64: true,
    mediaTypes: "Images",
    allowsEditing: true,
    exif: true,
    aspect: [1, 1]
  };
  const permission = await GetCameraPermissions();
  const permission2 = await GetCameraRollPermissions();
  if (permission && permission2) {
    try {
      const image = await ImagePicker.launchCameraAsync(options);
      return image;
    } catch (err) {
      return null;
    }
  } else {
    Alert.alert("Camera access required.");
    return null;
  }
};

export { GetCameraPermissions, GetCameraImage };
