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
      navigation: {
        state: {
          params: { type }
        }
      }
    } = this.props;
    switch (type) {
      case "phone":
        return <PhoneLogin {...this.props} />;
      case "email":
        return <EmailLogin {...this.props} />;
      case "username":
        return <UsernameLogin {...this.props} />;
      default:
        return <UsernameLogin {...this.props} />;
    }
  }
}

export default LoginScreen;
