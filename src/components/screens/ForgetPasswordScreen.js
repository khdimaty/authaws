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
  Animated,
  TextInput
} from "react-native";
import Auth from "@aws-amplify/auth";
import { Container, Item, Input, Icon } from "native-base";

export default class ForgetPasswordScreen extends React.Component {
  state = {
    username: "",
    authCode: "",
    newPassword: "",
    fadeIn: new Animated.Value(0), // Initial value for opacity: 0
    fadeOut: new Animated.Value(1), // Initial value for opacity: 1
    isHidden: false
  };
  componentDidMount() {
    this.fadeIn();
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
  // Request a new password
  async forgotPassword() {
    const { username } = this.state;
    await Auth.forgotPassword(username)
      .then(data => console.log("New code sent", data))
      .catch(err => {
        if (!err.message) {
          console.log("Error while setting up the new password: ", err);
          Alert.alert("Error while setting up the new password: ", err);
        } else {
          console.log("Error while setting up the new password: ", err.message);
          Alert.alert("Error while setting up the new password: ", err.message);
        }
      });
  }

  // Upon confirmation redirect the user to the Sign In page
  async forgotPasswordSubmit() {
    const { username, authCode, newPassword } = this.state;
    await Auth.forgotPasswordSubmit(username, authCode, newPassword)
      .then(() => {
        this.props.navigation.navigate("SignIn");
        console.log("the New password submitted successfully");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error while confirming the new password: ", err);
          Alert.alert("Error while confirming the new password: ", err);
        } else {
          console.log("Error while confirming the new password: ", err.message);
          Alert.alert("Error while confirming the new password: ", err.message);
        }
      });
  }
  render() {
    let { fadeOut, fadeIn, isHidden } = this.state;
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
              <View
                style={{
                  marginTop: 30,
                  marginBottom: 30,
                  alignItems: "center",
                  alignContent: "center"
                }}
              >
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Nom d'utilisateur"
                  placeholderTextColor="#ffff"
                  autoCapitalize="none"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={value => this.onChangeText("username", value)}
                />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => this.forgotPassword()}
                >
                  <Text style={styles.submitButtonText}>Envoyer le code</Text>
                </TouchableOpacity>

                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Nouveau Mot de passe"
                  placeholderTextColor="#ffff"
                  autoCapitalize="none"
                  returnKeyType="go"
                  autoCapitalize="none"
                  autoCorrect={false}
                  ref="SecondInput"
                  onChangeText={value =>
                    this.onChangeText("newPassword", value)
                  }
                />
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="code de confirmation"
                  placeholderTextColor="#ffff"
                  autoCapitalize="none"
                  returnKeyType="go"
                  autoCapitalize="none"
                  autoCorrect={false}
                  ref="SecondInput"
                  onChangeText={value => this.onChangeText("authCode", value)}
                />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => this.forgotPasswordSubmit()}
                >
                  <Text style={styles.submitButtonText}>
                    Confirmer le nouveau mot de passe
                  </Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: "#4278A4",
    justifyContent: "center",
    flexDirection: "column"
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
  Logo: {
    height: 111,
    alignSelf: "center"
  },

  images: {
    width: 300,
    height: 130
  },
  input: {
    margin: 15,
    fontSize: 16,
    height: 52,
    width: "80%",
    paddingLeft: 20,
    color: "#fff",

    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 10
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
