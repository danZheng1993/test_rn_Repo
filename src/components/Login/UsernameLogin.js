import React from "react";
import { StyleSheet, Text, View, AsyncStorage, TextInput } from "react-native";

import { YellowButton, BackArrow } from "../../components";
import { loginWithUsername, userNameAvailability } from "../../../api";

const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2D2D2D"
  },
  pageContainer: {},
  headerText: {},
  headerSubtext: {},
  errorText: {},
  inputContainer: {},
  input: {},
  buttonContainer: {}
});

class UsernameLogin extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    currentPage: 1,
    username: "",
    usernameValid: false,
    usernameError: null,
    password: "",
    passwordValid: false,
    passwordError: null
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
    const { history } = this.props;
    const { currentPage } = this.state;
    if (currentPage === 1) {
      history.push("/");
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

  handleUsernameChange = async e => {
    const { isDisabled } = this.state;
    const username = e.target.value.toLowerCase();
    await this.setState({ username });
    if (!isDisabled) await this.validateUsername(username);
    if (isDisabled) this.checkButtonStatus();
  };

  handlePasswordChange = async e => {
    const { isDisabled } = this.state;
    const password = e.target.value;
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
    const { navigation, updateUserCoins } = this.props;
    const { username, password } = this.state;
    const resp = await loginWithUsername({ username, password });
    const { session } = resp.data;

    updateUserCoins(resp.data.user.coins);
    await AsyncStorage.setItem("session", session);
    console.log(session);
    await navigation.navigate("Home");
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
          placeholder="USERNAME"
          value={username}
          onChange={updateUsername}
        />
        {usernameError && <Text style={Style.errorText}>{usernameError}</Text>}
      </View>
    </View>
    <View style={Style.buttonContainer}>
      <YellowButton
        width={256}
        height={50}
        text="NEXT"
        disabled={isDisabled}
        onClick={next}
      />
    </View>
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
      <Text style={Style.headerSubtext}>
        Your password should be at least 6 characters.
      </Text>
      <View style={Style.inputContainer}>
        <TextInput
          style={Style.input}
          placeholder="PASSWORD"
          type="password"
          value={password}
          onChange={updatePassword}
        />
        {passwordError && <Text style={Style.errorText}>{passwordError}</Text>}
      </View>
    </View>
    <View style={Style.buttonContainer}>
      <YellowButton
        width={256}
        height={50}
        text="NEXT"
        disabled={isDisabled}
        onClick={next}
      />
    </View>
  </React.Fragment>
);

export default UsernameLogin;
