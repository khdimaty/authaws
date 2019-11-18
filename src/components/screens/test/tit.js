import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
export default function Log() {
  state = {
    username: "",
    password: ""
  };

  return (
    <ImageBackground
      source={require("./assets/tramlogin.jpeg")}
      style={styles.container}
      blurRadius={20}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={{ alignSelf: "center" }}>
          <Image
            source={require("./assets/tram_.png")}
            style={styles.images}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            marginTop: 30,
            alignItems: "center",
            alignContent: "center"
          }}
        >
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Username"
            placeholderTextColor="#ffff"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Password"
            placeholderTextColor="#ffff"
            autoCapitalize="none"
          />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}> LOGIN </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%"
  },
  images: {
    width: 120,
    height: 120,
    marginTop: 100
  },
  input: {
    margin: 15,
    fontSize: 16,
    height: 52,
    width: "80%",
    paddingLeft: 20,

    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 10
  },
  submitButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,

    margin: 30,
    height: 52,
    width: "80%",
    borderColor: "white"
  },
  submitButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    paddingLeft: 100,
    paddingRight: 80,
    paddingTop: 5
  }
});
