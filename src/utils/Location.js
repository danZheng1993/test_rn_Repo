import { Alert, AsyncStorage } from "react-native";
import { Permissions, Location } from "expo";

const GetLocationPermissions = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  return status === "granted";
};

const GetUserLocation = async () => {
  // TODO: Fix issue with hanging in getCurrentPositionAsync
  const locationPermissionGranted = await GetLocationPermissions();

  if (locationPermissionGranted) {
    const { locationServicesEnabled } = await Location.getProviderStatusAsync();
    let location;
    if (locationServicesEnabled) {
      try {
        location = await Location.getCurrentPositionAsync({});
      } catch (error) {
        Alert.alert(error);
        return;
      }
      AsyncStorage.setItem(
        "location",
        JSON.stringify({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        })
      );
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
    }
    Alert.alert("Location is not enabled.");
  } else {
    Alert.alert("Location permission required.");
  }
};

export { GetLocationPermissions, GetUserLocation };
