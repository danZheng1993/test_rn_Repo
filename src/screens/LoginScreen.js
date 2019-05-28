import React from "react";

import PhoneLogin from "../components/Login/PhoneLogin";
import EmailLogin from "../components/Login/EmailLogin";
import UsernameLogin from "../components/Login/UsernameLogin";

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const {
      navigation,
      navigation: {
        state: {
          params: { type }
        }
      }
    } = this.props;
    switch (type) {
      case "phone":
        return <PhoneLogin navigation={navigation} />;
      case "email":
        return <EmailLogin navigation={navigation} />;
      case "username":
        return <UsernameLogin navigation={navigation} />;
      default:
        return <UsernameLogin navigation={navigation} />;
    }
  }
}

export default LoginScreen;
