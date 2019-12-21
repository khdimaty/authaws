import React from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Animated,
  Image,
  TextInput
} from "react-native";

import Auth from "@aws-amplify/auth";
import { Container, Item, Input, Icon } from "native-base";

export default class SignInScreen extends React.Component {
  state = {
    username: "",
    password: "",

    isHidden: false
  };

  async signIn() {
    const { username, password } = this.state;
    await Auth.signIn(username, password)
      .then(user => {
        // this.setState({ user });
        console.log("done");
        this.props.navigation.navigate("AuthLoading");
      })
      .catch(err => {
        if (!err.message) {
          console.log("Error when signing in: ", err);
          Alert.alert("Error when signing in: ", err);
        } else {
          console.log("Error when signing in: ", err.message);
          Alert.alert("Error when signing in: ", err.message);
        }
      });
  }

  onChangeText(key, value) {
    this.setState({ [key]: value });
  }

  render() {
    return (
      <ImageBackground
        source={require("./assets/66.jpg")}
        style={styles.container}
        blurRadius={5}
      >
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
                <View style={styles.Logo}>
                  <View
                    style={{
                      flex: 1
                    }}
                  />
                  <View
                    style={{
                      marginBottom: 6,
                      marginLeft: 2,
                      marginRight: 3
                    }}
                  >
                    <Image
                      source={require("./assets/khditt.png")}
                      style={styles.images}
                      resizeMode="contain"
                    />
                  </View>
                </View>

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

                  <TextInput
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    placeholder="Mot de passe"
                    placeholderTextColor="#ffff"
                    autoCapitalize="none"
                    returnKeyType="go"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    ref="SecondInput"
                    onChangeText={value => this.onChangeText("password", value)}
                  />
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={() => this.signIn()}
                  >
                    <Text style={styles.submitButtonText}> Se connecter </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

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
