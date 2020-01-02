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
  Alert
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
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 100
            }}
          />
          <TouchableOpacity
            style={[
              styles.buttonOutStyle,
              {
                flexDirection: "row",
                justifyContent: "center"
              }
            ]}
            onPress={this.signOutAlert}
          >
            <Icon name="md-power" style={{ color: "#fff", paddingRight: 10 }} />
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    flexDirection: "column",
    marginVertical: 15
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#1D7B9D"
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
    backgroundColor: "#fff"
  },
  itemStyle: {
    marginBottom: 20
  },
  iconStyle: {
    color: "#1D7B9D",
    fontSize: 28,
    marginLeft: 15
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#1D7B9D",
    padding: 14,
    marginBottom: 20,
    borderRadius: 24
  },
  buttonOutStyle: {
    alignItems: "center",
    backgroundColor: "#1D7B9D",
    padding: 14,
    marginBottom: 100,
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
  }
});
