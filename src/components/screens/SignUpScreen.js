import React from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  Keyboard,
  View,
  Alert,
  Animated,
  ScrollView
} from "react-native";
import Auth from "@aws-amplify/auth";

import { Item, Input, Icon } from "native-base";

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

    modalVisible: false,
    // users will receive a confirmation code
    authCode: ""
  };
  // Sign up user with AWS Amplify Auth
  async signUp() {
    const { username, password, email } = this.state;
    // rename variable to conform with Amplify Auth field phone attribute

    await Auth.signUp({
      username,
      password,
      attributes: { email }
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
    console.log(this.state.token);
    return (
      <View style={{ backgroundColor: "#4278A4", paddingTop: 30 }}>
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <ScrollView>
            <View style={styles.container}>
              {/* username section  */}
              <Item rounded style={styles.itemStyle}>
                <Icon active name="person" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Nom d'utilisateur"
                  placeholderTextColor="#adb4bc"
                  keyboardType={"email-address"}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onSubmitEditing={event => {
                    this.refs.SecondInput._root.focus();
                  }}
                  onChangeText={value => this.onChangeText("username", value)}
                  onFocus={() => this.fadeOut()}
                  onEndEditing={() => this.fadeIn()}
                />
              </Item>
              {/*  password section  */}
              <Item rounded style={styles.itemStyle}>
                <Icon active name="lock" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Mot de passe"
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
                  onChangeText={value => this.onChangeText("password", value)}
                  onFocus={() => this.fadeOut()}
                  onEndEditing={() => this.fadeIn()}
                />
              </Item>
              {/* email section */}
              <Item rounded style={styles.itemStyle}>
                <Icon active name="mail" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Adresse Email"
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

              {/* End of phone input */}
              <TouchableOpacity
                onPress={() => this.signUp()}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>S'inscrire</Text>
              </TouchableOpacity>
              {/* code confirmation section  */}
              <Item rounded style={styles.itemStyle}>
                <Icon active name="md-apps" style={styles.iconStyle} />
                <Input
                  style={styles.input}
                  placeholder="Code de confirmation"
                  placeholderTextColor="#adb4bc"
                  keyboardType={"numeric"}
                  returnKeyType="done"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={false}
                  onChangeText={value => this.onChangeText("authCode", value)}
                  onFocus={() => this.fadeOut()}
                  onEndEditing={() => this.fadeIn()}
                />
              </Item>
              <Mutation mutation={createUser}>
                {(createuser, { data }) => (
                  <TouchableOpacity
                    onPress={() => this.confirmSignUp(createuser)}
                    style={styles.submitButton}
                  >
                    <Text style={styles.submitButtonText}>
                      Confirmer l'inscription
                    </Text>
                  </TouchableOpacity>
                )}
              </Mutation>

              <TouchableOpacity
                onPress={() => this.resendSignUp()}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>Renvoyer le code</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#4278A4",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff"
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
    backgroundColor: "#4278A4"
  },
  itemStyle: {
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: "center"
  },
  iconStyle: {
    color: "#E2A829",
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
    backgroundColor: "transparent",
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
  },
  submitButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    margin: 30,

    height: 52,
    width: "80%",
    borderColor: "white"
  },
  submitButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",

    paddingTop: 5
  }
});
