import React from "react";
import { StyleSheet, Text, View, AsyncStorage, TextInput } from "react-native";

import { YellowButton, BackArrow } from "../../components";
import {
  loginWithEmail,
  emailAvailability,
  setDefaultsForApi
} from "../../api";

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
  pageContainer: {
    height: "60%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
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
  input: {
    height: 40,
    marginTop: 12,
    fontFamily: "Gotham",
    fontSize: 28,
    lineHeight: 35,
    color: "#FFFFFF",
    textAlign: "center"
  }
});

class EmailLogin extends React.Component {
  state = {
    currentPage: 1,
    isDisabled: true,
    email: "",
    emailValid: false,
    emailError: null,
    password: "",
    passwordValid: false,
    passwordError: null
  };

  next = async () => {
    const { currentPage, passwordValid, emailValid, email } = this.state;
    if (currentPage === 1) {
      if (emailValid) {
        try {
          await emailAvailability(email);
          await this.setState({
            emailError: "Not a registered email."
          });
        } catch (error) {
          await this.setState({
            emailError: null,
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
    const { currentPage, isDisabled, email, password } = this.state;
    if (currentPage === 1 && isDisabled) {
      if (email.length > 0) {
        await this.setState({ isDisabled: false });
      }
    } else if (currentPage === 2 && isDisabled) {
      if (password.length > 0) {
        await this.setState({ isDisabled: false });
      }
    }
  };

  handleEmailChange = async email => {
    const { isDisabled } = this.state;
    await this.setState({ email });
    if (!isDisabled) await this.validateEmail(email);
    if (isDisabled) this.checkButtonStatus();
  };

  handlePasswordChange = async password => {
    const { isDisabled } = this.state;
    await this.setState({ password });
    if (!isDisabled) await this.validatePassword(password);
    if (isDisabled) this.checkButtonStatus();
  };

  validateEmail = async email => {
    /* eslint-disable no-useless-escape */
    const r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = r.test(String(email).toLowerCase());
    await this.setState({
      emailError: emailValid ? null : "Invalid email address.",
      emailValid
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
    const { email, password } = this.state;

    try {
      const resp = await loginWithEmail({ email, password });
      const { session } = resp.data;

      await AsyncStorage.setItem("session", JSON.stringify(session));
      await setDefaultsForApi(JSON.stringify(session));
      await navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      currentPage,
      email,
      emailError,
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
              email={email}
              updateEmail={e => this.handleEmailChange(e)}
              emailError={emailError}
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

const FirstPage = ({ email, updateEmail, emailError, next, isDisabled }) => (
  <View style={Style.pageContainer}>
    <Text style={Style.headerText}>What's your email?</Text>
    <TextInput
      style={Style.input}
      autoFocus
      selectionColor="#C2B48D"
      placeholderTextColor="#BFBFBF"
      placeholder="EMAIL"
      value={email}
      onChangeText={updateEmail}
      returnKeyType="next"
      onSubmitEditing={() => {
        next();
      }}
    />
    {emailError && (
      <Text style={[Style.headerText, Style.errorText]}>{emailError}</Text>
    )}
    <YellowButton
      width={256}
      height={50}
      fontSize={18}
      text="NEXT"
      disabled={isDisabled}
      onPress={next}
    />
  </View>
);

const SecondPage = ({
  password,
  updatePassword,
  passwordError,
  isDisabled,
  next
}) => (
  <View style={Style.pageContainer}>
    <Text style={Style.headerText}>What's your password?</Text>
    <Text style={[Style.headerText, Style.headerSubtext]}>
      Your password should be at least 6 characters.
    </Text>
    <TextInput
      style={Style.input}
      placeholder="PASSWORD"
      autoFocus
      selectionColor="#C2B48D"
      placeholderTextColor="#BFBFBF"
      secureTextEntry
      type="password"
      value={password}
      onChangeText={updatePassword}
      autoCorrect={false}
      ref={input => {
        this.passwordInput = input;
      }}
      onSubmitEditing={next}
    />
    {passwordError && <Text>{passwordError}</Text>}
    <YellowButton
      width={256}
      height={50}
      fontSize={18}
      text="NEXT"
      disabled={isDisabled}
      onPress={next}
    />
  </View>
);

export default EmailLogin;
