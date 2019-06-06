import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const GetCameraRollPermissions = async () => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  return status === "granted";
};

const GetCameraRollImage = async () => {
  const options = {
    quality: 0.5,
    base64: true,
    mediaTypes: "Images",
    allowsEditing: true,
    exif: true,
    aspect: [1, 1]
  };
  const permission = await GetCameraRollPermissions();
  if (permission) {
    const image = await ImagePicker.launchImageLibraryAsync(options);
    return image;
  }
  Alert.alert("Camera roll access required.");
  return null;
};

export { GetCameraRollPermissions, GetCameraRollImage };
