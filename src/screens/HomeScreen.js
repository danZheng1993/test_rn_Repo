import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

import { YellowButton, BackArrow } from "../components";
import { getMe, setDefaultsForApi } from "../api";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2D"
  }
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  logout = async () => {
    const { navigation } = this.props;
    await AsyncStorage.removeItem("session");
    await setDefaultsForApi(null);
    await navigation.navigate("Main");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>home</Text>
        <TouchableOpacity onPress={() => this.logout()}>
          <Text>logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
