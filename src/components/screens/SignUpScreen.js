import React from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Modal,
  FlatList,
  Animated
} from "react-native";
import Auth from "@aws-amplify/auth";
import data from "../countrydata/countryCode";
import { Container, Item, Input, Icon } from "native-base";

import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
const createUser = gql`
  mutation createUser($username: String!, $email: String!, $location: String!) {
    createUser(
      data: { username: $username, email: $email, location: $location }
    ) {
      id
      username
    }
  }
`;
// Default render of country flag
const defaultFlag = data.filter(obj => obj.name === "United Kingdom")[0].flag;

// Default render of country code
const defaultCode = data.filter(obj => obj.name === "United Kingdom")[0]
  .dial_code;
export default class SignUpScreen extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    phoneNumber: "",
    authCode: "",
    fadeIn: new Animated.Value(0), // Initial value for opacity: 0
    fadeOut: new Animated.Value(1), // Initial value for opacity: 1
    isHidden: false,
    token: "",
    flag: defaultFlag,
    modalVisible: false,
    // users will receive a confirmation code
    authCode: ""
  };
  // Sign up user with AWS Amplify Auth
  async signUp() {
    const { username, password, email, phoneNumber } = this.state;
    // rename variable to conform with Amplify Auth field phone attribute
    const phone_number = phoneNumber;
    await Auth.signUp({
      username,
      password,
      attributes: { email, phone_number }
    })
      .then(() => {
        console.log("sign up successful!");
        Alert.alert("Enter the confirmation code you received.");
        //create user
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error when signing up: ", err);
          Alert.alert("Error when signing up: ", err);
        } else {
          console.log("Error when signing up: ", err.message);
          Alert.alert("Error when signing up: ", err.message);
        }
      });
  }

  // Confirm users and redirect them to the SignIn page
  async confirmSignUp(mutation, data) {
    const { username, authCode, email, phoneNumber, token } = this.state;
    await Auth.confirmSignUp(username, authCode)
      .then(() => {
        console.log("Confirm sign up successful");
        mutation({
          variables: { username: username, email: email, location: token }
        }).then(() => this.props.navigation.navigate("SignIn"));
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error when entering confirmation code: ", err);
          Alert.alert("Error when entering confirmation code: ", err);
        } else {
          console.log("Error when entering confirmation code: ", err.message);
          Alert.alert("Error when entering confirmation code: ", err.message);
        }
      });
  }

  // Resend code if not received already
  async resendSignUp() {
    const { username } = this.state;
    await Auth.resendSignUp(username)
      .then(() => console.log("Confirmation code resent successfully"))
      .catch(err => {
        if (!err.message) {
          console.log("Error requesting new confirmation code: ", err);
          Alert.alert("Error requesting new confirmation code: ", err);
        } else {
          console.log("Error requesting new confirmation code: ", err.message);
          Alert.alert("Error requesting new confirmation code: ", err.message);
        }
      });
  } // Functions for Phone Input
  showModal() {
    this.setState({ modalVisible: true });
    console.log("Shown");
  }
  hideModal() {
    this.setState({ modalVisible: false });
    // Refocus on phone Input after modal is closed
    this.refs.FourthInput._root.focus();
    console.log("Hidden");
  }
  async getCountry(country) {
    // Get the country flag and phone code from users selection
    const countryData = await data;
    try {
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code;
      const countryFlag = await countryData.filter(
        obj => obj.name === country
      )[0].flag;
      // Set data from user choice of country
      this.setState({ phoneNumber: countryCode, flag: countryFlag });
      await this.hideModal();
    } catch (err) {
      console.log(err);
    }
  }
  registerForPushNotification = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    this.setState({ token: token });
  };
  componentDidMount() {
    this.fadeIn();
    this.registerForPushNotification();

    console.log(this.state.token);
  }
  fadeIn() {
    Animated.timing(this.state.fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: true });
  }
  fadeOut() {
    Animated.timing(this.state.fadeOut, {
      toValue: 0, // 1 in the SignInScreen component
      duration: 700,
      useNativeDriver: true
    }).start();
    this.setState({ isHidden: false });
  }
  onChangeText(key, value) {
    this.setState({ [key]: value });
  }
  render() {
    let { fadeOut, fadeIn, isHidden, flag } = this.state;

    const countryData = data;
    console.log(this.state.token);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.container}>
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  {/* username section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="person" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Username"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"email-address"}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onSubmitEditing={event => {
                        this.refs.SecondInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("username", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/*  password section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="lock" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="#adb4bc"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={true}
                      // ref={c => this.SecondInput = c}
                      ref="SecondInput"
                      onSubmitEditing={event => {
                        this.refs.ThirdInput._root.focus();
                      }}
                      onChangeText={value =>
                        this.onChangeText("password", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* email section */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="mail" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"email-address"}
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="ThirdInput"
                      onSubmitEditing={event => {
                        this.refs.FourthInput._root.focus();
                      }}
                      onChangeText={value => this.onChangeText("email", value)}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  {/* phone section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="call" style={styles.iconStyle} />
                    {/* country flag */}
                    <View>
                      <Text>{flag}</Text>
                    </View>
                    {/* open modal */}
                    <Icon
                      active
                      name="md-arrow-dropdown"
                      style={[styles.iconStyle, { marginLeft: 0 }]}
                      onPress={() => this.showModal()}
                    />
                    <Input
                      style={styles.input}
                      placeholder="+44766554433"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"phone-pad"}
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      ref="FourthInput"
                      value={this.state.phoneNumber}
                      onChangeText={val => {
                        if (this.state.phoneNumber === "") {
                          // render UK phone code by default when Modal is not open
                          this.onChangeText("phoneNumber", defaultCode + val);
                        } else {
                          // render country code based on users choice with Modal
                          this.onChangeText("phoneNumber", val);
                        }
                      }}
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                    {/* Modal for country code and flag */}
                    <Modal
                      animationType="slide" // fade
                      transparent={false}
                      visible={this.state.modalVisible}
                    >
                      <View style={{ flex: 1 }}>
                        <View
                          style={{
                            flex: 10,
                            paddingTop: 80,
                            backgroundColor: "#5059ae"
                          }}
                        >
                          <FlatList
                            data={countryData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                              <TouchableWithoutFeedback
                                onPress={() => this.getCountry(item.name)}
                              >
                                <View
                                  style={[
                                    styles.countryStyle,
                                    {
                                      flexDirection: "row",
                                      alignItems: "center",
                                      justifyContent: "space-between"
                                    }
                                  ]}
                                >
                                  <Text style={{ fontSize: 45 }}>
                                    {item.flag}
                                  </Text>
                                  <Text style={{ fontSize: 20, color: "#fff" }}>
                                    {item.name} ({item.dial_code})
                                  </Text>
                                </View>
                              </TouchableWithoutFeedback>
                            )}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => this.hideModal()}
                          style={styles.closeButtonStyle}
                        >
                          <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </Modal>
                  </Item>
                  {/* End of phone input */}
                  <TouchableOpacity
                    onPress={() => this.signUp()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Sign Up</Text>
                  </TouchableOpacity>
                  {/* code confirmation section  */}
                  <Item rounded style={styles.itemStyle}>
                    <Icon active name="md-apps" style={styles.iconStyle} />
                    <Input
                      style={styles.input}
                      placeholder="Confirmation code"
                      placeholderTextColor="#adb4bc"
                      keyboardType={"numeric"}
                      returnKeyType="done"
                      autoCapitalize="none"
                      autoCorrect={false}
                      secureTextEntry={false}
                      onChangeText={value =>
                        this.onChangeText("authCode", value)
                      }
                      onFocus={() => this.fadeOut()}
                      onEndEditing={() => this.fadeIn()}
                    />
                  </Item>
                  <Mutation mutation={createUser}>
                    {(createuser, { data }) => (
                      <TouchableOpacity
                        onPress={() => this.confirmSignUp(createuser)}
                        style={styles.buttonStyle}
                      >
                        <Text style={styles.buttonText}>Confirm Sign Up</Text>
                      </TouchableOpacity>
                    )}
                  </Mutation>

                  <TouchableOpacity
                    onPress={() => this.resendSignUp()}
                    style={styles.buttonStyle}
                  >
                    <Text style={styles.buttonText}>Resend code</Text>
                  </TouchableOpacity>
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4995cd",
    justifyContent: "center",
    flexDirection: "column"
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#5a52a5"
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 200,
    bottom: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    backgroundColor: "#4995cd"
  },
  itemStyle: {
    marginBottom: 20
  },
  iconStyle: {
    color: "#5a52a5",
    fontSize: 28,
    marginLeft: 15
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#667292",
    padding: 14,
    marginBottom: 20,
    borderRadius: 24
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff"
  },
  logoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 400,
    bottom: 180,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  textStyle: {
    padding: 5,
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold"
  },
  countryStyle: {
    flex: 1,
    backgroundColor: "#5059ae",
    borderTopColor: "#211f",
    borderTopWidth: 1,
    padding: 12
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    backgroundColor: "#b44666"
  }
});
