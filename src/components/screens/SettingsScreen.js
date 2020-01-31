import React from "react";

import {
  AsyncStorage,
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
  TextInput
} from "react-native";
import Auth from "@aws-amplify/auth";
import { Container, Item, Input, Icon, Button } from "native-base";
export default class SettingsScreen extends React.Component {
  state = {
    password1: "",
    password2: ""
  };
  // Change user password for the app
  changePassword = async () => {
    const { password1, password2 } = this.state;
    await Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, password1, password2);
      })
      .then(data => {
        console.log("Password changed successfully", data);
        Alert.alert("password changed successfully ! ");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error changing password: ", err);
          Alert.alert("Error changing password: ", err);
        } else {
          console.log("Error changing password: ", err.message);
          Alert.alert("Error changing password: ", err.message);
        }
      });
  };
  onChangeText(key, value) {
    this.setState({ [key]: value });
  }
  // Sign out from the app
  signOutAlert = async () => {
    await Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out from the app?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Canceled"),
          style: "cancel"
        },
        // Calling signOut
        { text: "OK", onPress: () => this.signOut() }
      ],
      { cancelable: false }
    );
  };
  // Confirm sign out
  signOut = async () => {
    await Auth.signOut()
      .then(() => {
        console.log("Sign out complete");
        this.props.navigation.navigate("AuthLoading");
      })
      .catch(err => console.log("Error while signing out!", err));
  };
  render() {
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
                  placeholder="Ancien Mot de passe"
                  placeholderTextColor="#ffff"
                  autoCapitalize="none"
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={value => this.onChangeText("password1", value)}
                />

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
                  onChangeText={value => this.onChangeText("password2", value)}
                />
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={this.changePassword}
                >
                  <Text style={styles.submitButtonText}>
                    Changer le mot de passe{" "}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={this.signOutAlert}
                >
                  <Text style={styles.submitButtonText}>Se deconnecter </Text>
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
    backgroundColor: "#1D7B9D",
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
