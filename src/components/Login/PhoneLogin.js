import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  TouchableOpacity
} from "react-native";

import { YellowButton, BackArrow } from "../../components";
import {
  loginWithPhone,
  resendVerificationCode,
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

class PhoneLogin extends React.Component {
  state = {
    currentPage: 1,
    isDisabled: true,
    phone: "",
    phoneValid: false,
    phoneError: null,
    code: "",
    codeValid: false,
    codeError: null
  };

  next = async () => {
    const { currentPage, phoneValid, codeValid } = this.state;
    if (currentPage === 1) {
      if (phoneValid) {
        try {
          await this.resendCode();
          await this.setState({
            phoneError: null,
            isDisabled: true,
            currentPage: currentPage + 1
          });
        } catch (error) {
          await this.setState({
            phoneError: "Phone number already in use."
          });
        }
      }
    } else if (currentPage === 2) {
      if (codeValid) {
        try {
          await this.login();
        } catch (error) {
          await this.setState({
            codeError: "Login failed."
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
    const { currentPage, isDisabled, phone, code } = this.state;
    if (currentPage === 1 && isDisabled) {
      if (phone.length > 0) {
        await this.setState({ isDisabled: false });
      }
    } else if (currentPage === 2 && isDisabled) {
      if (code.length > 0) {
        await this.setState({ isDisabled: false });
      }
    }
  };

  handlePhoneChange = async phone => {
    const { isDisabled } = this.state;
    await this.setState({ phone });
    if (!isDisabled) await this.validatePhone(phone);
    if (isDisabled) this.checkButtonStatus();
  };

  handleCodeChange = async code => {
    const { isDisabled } = this.state;
    await this.setState({ code });
    if (!isDisabled) await this.validateCode(code);
    if (isDisabled) this.checkButtonStatus();
  };

  validatePhone = async phone => {
    const phoneValid = phone.length > 9;
    // TODO: Check if phone number in use
    await this.setState({
      phoneError: phoneValid
        ? null
        : "phone should contain at least 10 characters",
      phoneValid
    });
  };

  validateCode = async code => {
    const codeValid = code.length > 0;
    await this.setState({
      codeError: codeValid ? null : "Wrong code, try again.",
      codeValid
    });
  };

  resendCode = async () => {
    const { phone } = this.state;

    await resendVerificationCode({
      phone,
      country_code: "+1"
    });
  };

  login = async () => {
    const { navigation } = this.props;
    const { phone, code } = this.state;

    try {
      const resp = await loginWithPhone({ phone, code, device: "android" });
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
      phone,
      phoneError,
      code,
      codeError,
      isDisabled
    } = this.state;
    return (
      <React.Fragment>
        <BackArrow onPress={() => this.prev()} />
        <View style={Style.container}>
          {currentPage === 1 ? (
            <FirstPage
              phone={phone}
              updatePhone={e => this.handlePhoneChange(e)}
              phoneError={phoneError}
              isDisabled={isDisabled}
              next={() => this.next()}
            />
          ) : (
            <SecondPage
              code={code}
              updateCode={e => this.handleCodeChange(e)}
              codeError={codeError}
              resendCode={() => this.resendCode()}
              phone={phone}
              isDisabled={isDisabled}
              next={() => this.next()}
            />
          )}
        </View>
      </React.Fragment>
    );
  }
}

const FirstPage = ({ phone, updatePhone, phoneError, isDisabled, next }) => (
  <View style={Style.pageContainer}>
    <Text style={Style.headerText}>What's your mobile number?</Text>
    <TextInput
      style={Style.input}
      autoFocus
      selectionColor="#C2B48D"
      placeholderTextColor="#BFBFBF"
      placeholder="PHONE #"
      value={phone}
      type="tel"
      onChangeText={updatePhone}
      autoCorrect={false}
      returnKeyType="next"
      onSubmitEditing={() => {
        next();
      }}
    />
    {phoneError && (
      <Text style={[Style.headerText, Style.errorText]}>{phoneError}</Text>
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
  code,
  updateCode,
  codeError,
  phone,
  resendCode,
  isDisabled,
  next
}) => (
  <View style={Style.pageContainer}>
    <Text style={Style.headerText}>
      We sent you a code to verify your number
    </Text>
    <Text style={[Style.headerText, Style.headerSubtext]}>
      {`Sent to ${phone}`}
    </Text>
    <TextInput
      style={Style.input}
      autoFocus
      selectionColor="#C2B48D"
      placeholderTextColor="#BFBFBF"
      placeholder="CODE"
      value={code}
      onChangeText={updateCode}
      autoCorrect={false}
      onSubmitEditing={() => {
        next();
      }}
    />
    <TouchableOpacity onPress={() => resendCode()}>
      <Text style={[Style.headerText, Style.headerSubtext]}>
        Didn't get it? Send new code
      </Text>
    </TouchableOpacity>
    {codeError && (
      <Text style={[Style.headerText, Style.errorText]}>{codeError}</Text>
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

export default PhoneLogin;
