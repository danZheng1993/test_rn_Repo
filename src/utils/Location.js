import { Alert, AsyncStorage } from "react-native";
import { Permissions, Location } from "expo";

const GetLocationPermissions = async () => {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  return status === "granted";
};

const GetUserLocation = async () => {
  const locationPermissionGranted = await GetLocationPermissions();

  if (locationPermissionGranted) {
    const locationEnabled = await Location.getProviderStatusAsync();

    if (locationEnabled) {
      const location = await Location.getCurrentPositionAsync({
        enableHighAccuracy: false,
        maximumAge: 1000 * 60 * 10 // 10 minutes
      });
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
