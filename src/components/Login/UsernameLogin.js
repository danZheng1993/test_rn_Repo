import React from "react";
import { StyleSheet, Text, View, AsyncStorage, TextInput } from "react-native";

import { YellowButton, BackArrow } from "../../components";
import { loginWithUsername, userNameAvailability } from "../../api";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2D",
    padding: 20,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  pageContainer: {},
  headerText: {
    fontFamily: "Gotham",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF"
  },
  headerSubtext: {
    fontSize: 12,
    color: "#BEBEBE"
  },
  errorText: {
    fontSize: 12,
    color: "#BD1E1E"
  },
  inputContainer: {
    width: "100%",
    height: 40,
    margin: 4
  },
  input: {
    width: "100%",
    height: "100%",
    fontFamily: "Gotham",
    fontSize: 28,
    lineHeight: 35,
    color: "#FFFFFF"
  }
});

class UsernameLogin extends React.Component {
  state = {
    currentPage: 1,
    username: "",
    usernameValid: false,
    usernameError: null,
    password: "",
    passwordValid: false,
    passwordError: null,
    isDisabled: true
  };

  next = async () => {
    const { currentPage, username, usernameValid, passwordValid } = this.state;
    if (currentPage === 1) {
      if (usernameValid) {
        try {
          await userNameAvailability(username);
          await this.setState({
            usernameError: "Not an existing username."
          });
        } catch (error) {
          await this.setState({
            usernameError: null,
            isDisabled: true,
            currentPage: currentPage + 1
          });
        }
      }
    } else if (currentPage === 2) {
      if (passwordValid) {
        try {
          await this.login();
        } catch (error) {
          await this.setState({
            passwordError: "Login failed."
          });
        }
      }
    }
  };

  prev = async () => {
    const { navigation } = this.props;
    const { currentPage } = this.state;
    if (currentPage === 1) {
      navigation.navigate("Main");
    } else {
      await this.setState({ currentPage: currentPage - 1 });
    }
  };

  checkButtonStatus = async () => {
    const { currentPage, isDisabled, username, password } = this.state;
    if (currentPage === 1 && isDisabled) {
      if (username.length > 0) {
        await this.setState({ isDisabled: false });
      }
    } else if (currentPage === 2 && isDisabled) {
      if (password.length > 0) {
        await this.setState({ isDisabled: false });
      }
    }
  };

  handleUsernameChange = async name => {
    const { isDisabled } = this.state;
    const username = name.toLowerCase();
    await this.setState({ username });
    if (!isDisabled) await this.validateUsername(username);
    if (isDisabled) this.checkButtonStatus();
  };

  handlePasswordChange = async password => {
    const { isDisabled } = this.state;
    await this.setState({ password });
    if (!isDisabled) await this.validatePassword(password);
    if (isDisabled) this.checkButtonStatus();
  };

  validateUsername = async username => {
    const r = new RegExp("^[a-zA-Z0-9]*$");
    const usernameValid = r.test(String(username).toLowerCase());
    await this.setState({
      usernameError: usernameValid
        ? null
        : "Username can only contain letters and numbers.",
      usernameValid
    });
  };

  validatePassword = async password => {
    const passwordValid = password.length > 5;
    await this.setState({
      passwordError: passwordValid
        ? null
        : "password should contain at least 6 characters",
      passwordValid
    });
  };

  login = async () => {
    const { navigation } = this.props;
    const { username, password } = this.state;
    try {
      const resp = await loginWithUsername({ username, password });
      console.log(resp);

      const { session } = resp.data;

      console.log(session);
      await AsyncStorage.setItem("session", session);
      await navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      currentPage,
      userName,
      usernameError,
      password,
      passwordError,
      isDisabled
    } = this.state;
    return (
      <React.Fragment>
        <BackArrow onPress={() => this.prev()} />
        <View style={Style.container}>
          {currentPage === 1 ? (
            <FirstPage
              userName={userName}
              updateUsername={e => this.handleUsernameChange(e)}
              usernameError={usernameError}
              isDisabled={isDisabled}
              next={() => this.next()}
            />
          ) : (
            <SecondPage
              password={password}
              updatePassword={e => this.handlePasswordChange(e)}
              passwordError={passwordError}
              isDisabled={isDisabled}
              next={() => this.next()}
            />
          )}
        </View>
      </React.Fragment>
    );
  }
}

const FirstPage = ({
  username,
  updateUsername,
  usernameError,
  isDisabled,
  next
}) => (
  <React.Fragment>
    <View style={Style.pageContainer}>
      <Text style={Style.headerText}>What's your username?</Text>
      <View style={Style.inputContainer}>
        <TextInput
          style={Style.input}
          selectionColor="#C2B48D"
          placeholderTextColor="#BFBFBF"
          placeholder="USERNAME "
          value={username}
          onChangeText={updateUsername}
        />
        {usernameError && (
          <Text style={[Style.headerText, Style.errorText]}>
            {usernameError}
          </Text>
        )}
      </View>
    </View>
    <YellowButton
      width={256}
      height={50}
      fontSize={16}
      text="NEXT"
      disabled={isDisabled}
      onPress={next}
    />
  </React.Fragment>
);
const SecondPage = ({
  password,
  updatePassword,
  passwordError,
  isDisabled,
  next
}) => (
  <React.Fragment>
    <View style={Style.pageContainer}>
      <Text style={Style.headerText}>What's your password?</Text>
      <Text style={[Style.headerText, Style.headerSubtext]}>
        Your password should be at least 6 characters.
      </Text>
      <View style={Style.inputContainer}>
        <TextInput
          style={Style.input}
          autoFocus
          selectionColor="#C2B48D"
          placeholder="PASSWORD "
          placeholderTextColor="#BFBFBF"
          secureTextEntry
          value={password}
          onChangeText={updatePassword}
        />
        {passwordError && (
          <Text style={[Style.headerText, Style.errorText]}>
            {passwordError}
          </Text>
        )}
      </View>
    </View>
    <YellowButton
      width={256}
      height={50}
      fontSize={16}
      text="NEXT"
      disabled={isDisabled}
      onPress={next}
    />
  </React.Fragment>
);

export default UsernameLogin;
