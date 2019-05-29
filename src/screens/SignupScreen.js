/* eslint-disable no-nested-ternary */
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  Picker
} from "react-native";

import { YellowButton, RoundButton, BackArrow } from "../components";
import {
  userNameAvailability,
  emailAvailability,
  userRegistration,
  sendVerificationCode,
  resendVerificationCode,
  verifyCode,
  loginWithUsername,
  setDefaultsForApi
} from "../api";

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
  skipContainer: {},
  selectContainer: {},
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
  skipText: {},
  input: {
    height: 40,
    marginTop: 12,
    fontFamily: "Gotham",
    fontSize: 28,
    lineHeight: 35,
    color: "#FFFFFF",
    textAlign: "center"
  },
  picker: {
    height: 50,
    backgroundColor: "#747474",
    fontFamily: "CircularPro",
    fontSize: 28,
    lineHeight: 19,
    textAlign: "center",
    color: "#ffffff"
  }
});

class SignupScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    currentPage: 1,
    isMobileSignup: true,
    isDisabled: true,
    firstName: "",
    firstNameValid: false,
    firstNameError: null,
    lastName: "",
    lastNameValid: false,
    lastNameError: null,
    username: "",
    usernameValid: false,
    usernameError: null,
    password: "",
    passwordValid: false,
    passwordError: null,
    phone: "",
    phoneValid: false,
    phoneError: null,
    code: "",
    codeValid: false,
    codeError: null,
    email: "",
    emailValid: false,
    emailError: null,
    inviteCode: "",
    inviteCodeValid: false,
    inviteCodeError: null,
    dob: { month: "", date: "", year: "" },
    dobValid: false,
    dobError: null,
    inviteLimit: false
  };

  next = async () => {
    const { navigation } = this.props;
    const {
      currentPage,
      isMobileSignup,
      firstNameValid,
      lastNameValid,
      usernameValid,
      username,
      passwordValid,
      phoneValid,
      codeValid,
      emailValid,
      email,
      inviteCodeValid,
      dob,
      dobValid
    } = this.state;
    if (currentPage === 8) {
      if (inviteCodeValid) {
        try {
          await this.createAccount();
          navigation.navigate("Onboarding");
        } catch (error) {
          await this.setState({
            inviteCodeError: "Invite code not valid."
          });
        }
      }
    } else if (currentPage === 1) {
      if (dobValid) {
        const today = new Date();
        if (today.getFullYear() - Number(dob.year) < 13) {
          await this.setState({
            dobError: "You must be at least 13 years or older to use Zion."
          });
        } else {
          await this.setState({
            dobError: null,
            isDisabled: true,
            currentPage: currentPage + 1
          });
        }
      }
    } else if (currentPage === 2) {
      if (firstNameValid && lastNameValid) {
        await this.setState({
          firstNameError: null,
          lastNameError: null,
          isDisabled: true,
          currentPage: currentPage + 1
        });
      }
    } else if (currentPage === 3) {
      if (usernameValid) {
        try {
          await userNameAvailability(username);
          await this.setState({
            usernameError: null,
            isDisabled: true,
            currentPage: currentPage + 1
          });
        } catch (error) {
          await this.setState({
            usernameError: "This username already has an account."
          });
        }
      }
    } else if (currentPage === 4) {
      if (passwordValid) {
        await this.setState({
          passwordError: null,
          isDisabled: true,
          currentPage: currentPage + 1
        });
      }
    } else if (currentPage === 5) {
      if (phoneValid) {
        try {
          await this.sendVerificationCode();
          await this.setState({
            phoneError: null,
            isDisabled: true,
            currentPage: currentPage + 1
          });
        } catch (error) {
          await this.setState({
            phoneError: "This phone is already in use."
          });
        }
      }
    } else if (currentPage === 6) {
      if (codeValid) {
        await this.verifyPhoneCode();
        await this.setState({
          codeError: null,
          isDisabled: true,
          currentPage: currentPage + 1
        });
      }
    } else if (currentPage === 7 && !isMobileSignup) {
      if (emailValid) {
        try {
          await emailAvailability(email);
          await this.setState({
            emailError: null,
            isDisabled: true,
            currentPage: currentPage + 1
          });
        } catch (error) {
          await this.setState({
            emailError: "Email is already taken."
          });
        }
      }
    } else {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  prev = async () => {
    const { navigation } = this.props;
    const { currentPage } = this.state;
    if (currentPage === 1) {
      navigation.navigate("Main");
    } else if (currentPage === 7) {
      await this.setState({
        isMobileSignup: true,
        currentPage: 5
      });
    } else {
      await this.setState({ currentPage: currentPage - 1 });
    }
  };

  checkButtonStatus = async () => {
    const {
      currentPage,
      isDisabled,
      code,
      email,
      firstNameValid,
      lastNameValid,
      usernameValid,
      passwordValid,
      phoneValid,
      inviteCode,
      dobValid
    } = this.state;
    if (currentPage === 1) {
      if (dobValid) {
        await this.setState({ isDisabled: false });
      }
    } else if (currentPage === 2) {
      if (firstNameValid && lastNameValid) {
        await this.setState({ isDisabled: false });
      }
    } else if (currentPage === 3) {
      if (usernameValid) {
        await this.setState({ isDisabled: false });
      } else {
        await this.setState({ isDisabled: true });
      }
    } else if (currentPage === 4) {
      if (passwordValid) {
        await this.setState({ isDisabled: false });
      } else {
        await this.setState({ isDisabled: true });
      }
    } else if (currentPage === 5) {
      if (phoneValid) {
        await this.setState({ isDisabled: false });
      } else {
        await this.setState({ isDisabled: true });
      }
    } else if (currentPage === 6 && isDisabled) {
      if (code.length > 0) {
        await this.setState({ isDisabled: false });
      }
    } else if (currentPage === 7 && isDisabled) {
      if (email.length > 0) {
        await this.setState({ isDisabled: false });
      }
    } else if (currentPage === 8 && isDisabled) {
      if (inviteCode.length > 0) {
        await this.setState({ isDisabled: false });
      }
    }
  };

  handleFirstNameChange = async firstName => {
    await this.setState({ firstName });
    await this.validFirstName(firstName);
    this.checkButtonStatus();
  };

  handleLastNameChange = async lastName => {
    await this.setState({ lastName });
    await this.validLastName(lastName);
    this.checkButtonStatus();
  };

  handleUsernameChange = async name => {
    const username = name.toLowerCase();
    await this.setState({ username });
    await this.validateUsername(username);
    this.checkButtonStatus();
  };

  handlePasswordChange = async password => {
    await this.setState({ password });
    await this.validatePassword(password);
    this.checkButtonStatus();
  };

  handlePhoneChange = async phone => {
    await this.setState({ phone });
    await this.validatePhone(phone);
    this.checkButtonStatus();
  };

  handleCodeChange = async code => {
    const { isDisabled } = this.state;
    await this.setState({ code });
    if (!isDisabled) await this.validateCode(code);
    if (isDisabled) this.checkButtonStatus();
  };

  handleEmailChange = async email => {
    const { isDisabled } = this.state;
    await this.setState({ email });
    if (!isDisabled) await this.validateEmail(email);
    if (isDisabled) this.checkButtonStatus();
  };

  handleInviteCodeChange = async inviteCode => {
    const { isDisabled } = this.state;
    await this.setState({ inviteCode });
    if (!isDisabled) await this.validateInviteCode(inviteCode);
    if (isDisabled) this.checkButtonStatus();
  };

  handleMonthChange = async month => {
    const { isDisabled, dob } = this.state;
    await this.setState({ dob: { ...dob, month } });
    await this.validateDOB({
      ...dob,
      month
    });
    if (isDisabled) this.checkButtonStatus();
  };

  handleDateChange = async date => {
    const { isDisabled, dob } = this.state;
    await this.setState({ dob: { ...dob, date } });
    await this.validateDOB({
      ...dob,
      date
    });
    if (isDisabled) this.checkButtonStatus();
  };

  handleYearChange = async year => {
    const { isDisabled, dob } = this.state;
    await this.setState({ dob: { ...dob, year } });
    await this.validateDOB({
      ...dob,
      year
    });
    if (isDisabled) this.checkButtonStatus();
  };

  validFirstName = async firstName => {
    const r = new RegExp("^[a-zA-Z ]*$");
    const firstNameValid =
      r.test(String(firstName).toLowerCase()) && firstName.length >= 2;
    await this.setState({
      firstNameError: firstNameValid
        ? null
        : "First name can only contain letters and must be at least 2 characters long.",
      firstNameValid
    });
  };

  validLastName = async lastName => {
    const r = new RegExp("^[a-zA-Z ]*$");
    const lastNameValid =
      r.test(String(lastName).toLowerCase()) && lastName.length >= 2;
    await this.setState({
      lastNameError: lastNameValid
        ? null
        : "Last name can only contain letters and must be at least 2 characters long.",
      lastNameValid
    });
  };

  validateNames = async (firstName, lastName) => {
    const r = new RegExp("^[a-zA-Z ]*$");
    const firstNameValid =
      r.test(String(firstName).toLowerCase()) && firstName.length >= 2;
    const lastNameValid =
      r.test(String(lastName).toLowerCase()) && lastName.length >= 2;
    await this.setState({
      firstNameError: firstNameValid
        ? null
        : "First name can only contain letters and must be at least 2 characters long.",
      lastNameError: lastNameValid
        ? null
        : "Last name can only contain letters and must be at least 2 characters long.",
      firstNameValid,
      lastNameValid
    });
  };

  validateUsername = async username => {
    const r = new RegExp("^[a-zA-Z0-9]*$");
    const usernameValid =
      r.test(String(username).toLowerCase()) && username.length > 0;
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

  validatePhone = async phone => {
    const r = new RegExp("^\\d{9}$");
    const phoneValid = r.test(parseInt(phone, 10)) && phone.length > 9;
    await this.setState({
      phoneError: phoneValid
        ? null
        : "phone should contain at least 10 numbers",
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

  validateEmail = async email => {
    /* eslint-disable no-useless-escape */
    const r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = r.test(String(email).toLowerCase());
    // TODO: Check if email in use
    await this.setState({
      emailError: emailValid ? null : "Invalid email address.",
      emailValid
    });
  };

  validateInviteCode = async code => {
    const inviteCodeValid = code.length > 0;
    await this.setState({
      inviteCodeError: inviteCodeValid ? null : "Code can't be blank.",
      inviteCodeValid
    });
  };

  validateDOB = async dob => {
    const dobValid = dob.month !== "" && dob.date !== "" && dob.year !== "";
    await this.setState({
      dobError: dobValid ? null : "All fields needs to be completed.",
      dobValid
    });
  };

  goToEmail = async () =>
    this.setState({ isMobileSignup: false, currentPage: 7 });

  createAccount = async () => {
    const { navigation } = this.props;
    const {
      firstName,
      firstNameValid,
      lastName,
      lastNameValid,
      username,
      usernameValid,
      password,
      passwordValid,
      phone,
      phoneValid,
      email,
      emailValid,
      dob,
      dobValid,
      inviteCode,
      inviteCodeValid
    } = this.state;

    let data = { country_code: "+1" };

    if (firstNameValid && firstName !== "") {
      data = { ...data, firstName };
    }
    if (lastNameValid && lastName !== "") {
      data = { ...data, lastName };
    }
    if (usernameValid && username !== "") {
      data = { ...data, username };
    }
    if (passwordValid && password !== "") {
      data = { ...data, password };
    }
    if (phoneValid && phone !== "") {
      data = { ...data, phone };
    }
    if (emailValid && email !== "") {
      data = { ...data, email };
    }
    if (dobValid) {
      const today = new Date();
      data = {
        ...data,
        date_of_birth: `${dob.year}-${dob.month}-${dob.day}`,
        age: today.getFullYear() - Number(dob.year)
      };
    }
    if (inviteCodeValid && inviteCode !== "") {
      data = { ...data, invite_code: inviteCode };
    }

    try {
      await userRegistration(data);
      const resp = await loginWithUsername({
        username,
        password
      });
      const { session } = resp.data;

      await AsyncStorage.setItem("session", JSON.stringify(session));
      await setDefaultsForApi(JSON.stringify(session));
      await navigation.navigate("Onboarding");
    } catch (e) {
      console.log(e);
      this.setState({
        inviteCodeError: "Something has gone wrong."
      });
      // TODO: Handle inviteLimit
    }
  };

  sendVerificationCode = async () => {
    const { phone } = this.state;

    const resp = await sendVerificationCode({
      phone,
      device: "postman8",
      register: 1
    });
    console.log(resp);
  };

  resendCode = async () => {
    const { phone } = this.state;

    const resp = await resendVerificationCode({
      phone,
      country_code: "+1"
    });
    console.log(resp);
  };

  verifyPhoneCode = async () => {
    const { phone, code } = this.state;

    const resp = await verifyCode({
      phone,
      code,
      device: "postman8"
    });
    console.log(resp);
  };

  requestInviteCode = async () => {
    // TODO: Implement
    // Create account without code
  };

  showModal = () => this.setState({ showModal: true });

  closeModal = () => this.setState({ showModal: false });

  render() {
    const {
      currentPage,
      isMobileSignup,
      firstName,
      firstNameError,
      lastName,
      lastNameError,
      userName,
      usernameError,
      password,
      passwordError,
      phone,
      phoneError,
      code,
      codeError,
      email,
      emailError,
      inviteCode,
      inviteCodeError,
      dob,
      dobError,
      isDisabled,
      showModal,
      inviteLimit
    } = this.state;
    return (
      <React.Fragment>
        {/* showModal && (
                         <View style={showModal ? { display: "block" } : { display: "none" }}>
                           <View style={Style.modalBackground}>
                             <ModalBody>
                               <InnerContainer>
                                 <ModalLogo>
                                   <Z>Z</Z>
                                 </ModalLogo>
                                 <ModalTitleText>
                                   {inviteLimit
                                     ? `This invite code has already been used 5 times today.`
                                     : `Your account has been created and invite reserved`}
                                 </ModalTitleText>
                                 <ModalText>
                                   {inviteLimit
                                     ? `Come back tomorrow and try this code again.`
                                     : `We'll email you soon once your invite code is ready.`}
                                 </ModalText>
                                 <ModalButtonContainer
                                   onClick={
                                     inviteLimit
                                       ? () => this.createAccount()
                                       : () => {
                                         this.setState({
                                           showModal: false
                                         });
                                       }
                                   }
                                 >
                                   <ModalButton>
                                     {inviteLimit ? `REQUEST INVITE` : `GOT IT`}
                                   </ModalButton>
                                 </ModalButtonContainer>
                               </InnerContainer>
                             </ModalBody>
                           </View>
                         </View>
                       ) */}
        <BackArrow onPress={() => this.prev()} />
        {currentPage === 7 && isMobileSignup && (
          <View
            style={Style.skipContainer}
            onClick={() => this.createAccount()}
          >
            <Text style={Style.skipText}>Skip</Text>
          </View>
        )}
        <View style={Style.container}>
          {currentPage === 1 ? (
            <DOBPage
              dob={dob}
              updateMonth={e => this.handleMonthChange(e)}
              updateDate={e => this.handleDateChange(e)}
              updateYear={e => this.handleYearChange(e)}
              dobError={dobError}
              isDisabled={isDisabled}
              next={() => this.next()}
            />
          ) : currentPage === 2 ? (
            <FirstPage
              firstName={firstName}
              updateFirstName={e => this.handleFirstNameChange(e)}
              firstNameError={firstNameError}
              lastName={lastName}
              updateLastName={e => this.handleLastNameChange(e)}
              lastNameError={lastNameError}
              isDisabled={isDisabled}
              next={() => this.next()}
            />
          ) : currentPage === 3 ? (
            <SecondPage
              userName={userName}
              updateUsername={e => this.handleUsernameChange(e)}
              usernameError={usernameError}
              isDisabled={isDisabled}
              next={() => this.next()}
            />
          ) : currentPage === 4 ? (
            <ThirdPage
              password={password}
              updatePassword={e => this.handlePasswordChange(e)}
              passwordError={passwordError}
              isDisabled={isDisabled}
              next={() => this.next()}
            />
          ) : currentPage === 5 ? (
            <FourthPage
              phone={phone}
              updatePhone={e => this.handlePhoneChange(e)}
              phoneError={phoneError}
              goToEmail={() => this.goToEmail()}
              isDisabled={isDisabled}
              next={() => this.next()}
            />
          ) : currentPage === 6 ? (
            <FifthPage
              code={code}
              updateCode={e => this.handleCodeChange(e)}
              codeError={codeError}
              resendCode={() => this.resendCode()}
              phone={phone}
              isDisabled={isDisabled}
              next={() => this.next()}
            />
          ) : currentPage === 7 ? (
            <SixthPage
              email={email}
              updateEmail={e => this.handleEmailChange(e)}
              emailError={emailError}
              isDisabled={isDisabled}
              next={() => this.next()}
            />
          ) : (
            <SeventhPage
              inviteCode={inviteCode}
              updateInviteCode={e => this.handleInviteCodeChange(e)}
              inviteCodeError={inviteCodeError}
              createAccount={() => this.createAccount()}
              showModal={() => this.showModal()}
              isDisabled={isDisabled}
              next={() => this.next()}
            />
          )}
        </View>
      </React.Fragment>
    );
  }
}

const DOBPage = ({
  dob,
  updateMonth,
  updateDate,
  updateYear,
  dobError,
  isDisabled,
  next
}) => {
  const months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  const dates = [];
  for (let j = 1; j <= 31; j++) {
    dates.push(j);
  }
  const today = new Date();
  const years = [];
  for (let k = 1900; k <= today.getFullYear(); k++) {
    years.push(k);
  }
  return (
    <View style={Style.pageContainer}>
      <Text style={Style.headerText}>When is your birthday?</Text>
      <View style={Style.selectContainer}>
        <Picker
          selectedValue={dob.month}
          onValueChange={updateMonth}
          style={Style.picker}
        >
          {months.map(m => (
            <Picker.Item value={m.toString()} label={m.toString()} />
          ))}
        </Picker>
        <Picker
          selectedValue={dob.date}
          onValueChange={updateDate}
          style={Style.picker}
        >
          {dates.map(d => (
            <Picker.Item value={d.toString()} label={d.toString()} />
          ))}
        </Picker>
        <Picker
          selectedValue={dob.year}
          onValueChange={updateYear}
          style={Style.picker}
        >
          {years.reverse().map(y => (
            <Picker.Item value={y.toString()} label={y.toString()} />
          ))}
        </Picker>
      </View>
      {dobError && (
        <Text style={[Style.headerText, Style.errorText]}>{dobError}</Text>
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
};

const FirstPage = ({
  firstName,
  updateFirstName,
  firstNameError,
  lastName,
  updateLastName,
  lastNameError,
  isDisabled,
  next
}) => (
  <View style={Style.pageContainer}>
    <Text style={Style.headerText}>What's your first name?</Text>
    <TextInput
      style={Style.input}
      autoFocus
      selectionColor="#C2B48D"
      placeholderTextColor="#BFBFBF"
      placeholder="FIRST NAME"
      value={firstName}
      onChangeText={updateFirstName}
      autoCorrect
      returnKeyType="next"
      onSubmitEditing={() => {
        this.lastNameInput.focus();
      }}
    />
    {firstNameError && (
      <Text style={[Style.headerText, Style.errorText]}>{firstNameError}</Text>
    )}
    <Text style={Style.headerText}>And last name?</Text>
    <TextInput
      style={Style.input}
      selectionColor="#C2B48D"
      placeholderTextColor="#BFBFBF"
      placeholder="LAST NAME"
      value={lastName}
      onChangeText={updateLastName}
      returnKeyType="next"
      autoCorrect
      ref={input => {
        this.lastNameInput = input;
      }}
      onSubmitEditing={next}
    />
    {lastNameError && (
      <Text style={[Style.headerText, Style.errorText]}>{lastNameError}</Text>
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
  username,
  updateUsername,
  usernameError,
  isDisabled,
  next
}) => (
  <View style={Style.pageContainer}>
    <Text style={Style.headerText}>Pick a username</Text>
    <TextInput
      style={Style.input}
      selectionColor="#C2B48D"
      placeholderTextColor="#BFBFBF"
      autoFocus
      placeholder="USERNAME"
      value={username}
      onChangeText={updateUsername}
      returnKeyType="next"
      autoCorrect={false}
      onSubmitEditing={next}
    />
    {usernameError && (
      <Text style={[Style.headerText, Style.errorText]}>{usernameError}</Text>
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

const ThirdPage = ({
  password,
  updatePassword,
  passwordError,
  isDisabled,
  next
}) => (
  <View style={Style.pageContainer}>
    <Text style={Style.headerText}>Set a password</Text>
    <Text style={Style.headerSubtext}>
      Your password should be at least 6 characters.
    </Text>
    <TextInput
      style={Style.input}
      autoFocus
      selectionColor="#C2B48D"
      placeholderTextColor="#BFBFBF"
      placeholder="PASSWORD"
      type="password"
      value={password}
      onChangeText={updatePassword}
      secureTextEntry
      autoCorrect={false}
      returnKeyType="next"
      onSubmitEditing={() => {
        next();
      }}
    />
    {passwordError && (
      <Text style={[Style.headerText, Style.errorText]}>{passwordError}</Text>
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

const FourthPage = ({
  phone,
  updatePhone,
  phoneError,
  goToEmail,
  isDisabled,
  next
}) => (
  <View style={Style.pageContainer}>
    <Text style={Style.headerText}>What's your mobile number?</Text>
    <TouchableOpacity onPress={goToEmail}>
      <Text style={Style.headerSubtext}>Sign up with email instead</Text>
    </TouchableOpacity>
    <TextInput
      style={Style.input}
      autoFocus
      selectionColor="#C2B48D"
      placeholderTextColor="#BFBFBF"
      placeholder="PHONE #"
      value={phone}
      onChangeText={updatePhone}
      type="tel"
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

const FifthPage = ({
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
    <Text style={Style.headerSubtext}>{`Sent to ${phone}`}</Text>
    <TextInput
      style={Style.input}
      autoFocus
      selectionColor="#C2B48D"
      placeholderTextColor="#BFBFBF"
      placeholder="CODE"
      value={code}
      onChangeText={updateCode}
      autoCorrect={false}
      returnKeyType="next"
      onSubmitEditing={() => {
        next();
      }}
    />
    {codeError && (
      <Text style={[Style.headerText, Style.errorText]}>{codeError}</Text>
    )}
    <TouchableOpacity onPress={resendCode}>
      <SubLabelLink style={Style.headerSubtext}>
        Didn't get it? Send new code
      </SubLabelLink>
    </TouchableOpacity>
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

const SixthPage = ({ email, updateEmail, emailError, isDisabled, next }) => (
  <View style={Style.pageContainer}>
    <Text style={Style.headerText}>What's your email?</Text>
    <Input
      style={Style.input}
      autoFocus
      selectionColor="#C2B48D"
      placeholderTextColor="#BFBFBF"
      placeholder="EMAIL"
      value={email}
      onChangeText={updateEmail}
      autoCorrect={false}
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

const SeventhPage = ({
  inviteCode,
  updateInviteCode,
  inviteCodeError,
  createAccount,
  showModal,
  isDisabled,
  next
}) => (
  <View style={Style.pageContainer}>
    <Text style={Style.headerText}>Enter invitation code</Text>
    <TextInput
      style={Style.input}
      autoFocus
      selectionColor="#C2B48D"
      placeholderTextColor="#BFBFBF"
      placeholder="CODE"
      value={inviteCode}
      onChangeText={updateInviteCode}
      autoCorrect={false}
      returnKeyType="next"
      onSubmitEditing={() => {
        next();
      }}
    />
    {inviteCodeError && (
      <Text style={[Style.headerText, Style.errorText]}>{inviteCodeError}</Text>
    )}
    <Text style={Style.headerSubtext}>No invite code?</Text>
    <RoundButton
      width={256}
      height={50}
      fontSize={18}
      text="Request Invite"
      onPress={() => {
        createAccount();
        showModal();
      }}
    />
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

export default SignupScreen;
