import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity
} from "react-native";

export default function Log() {
  state = {
    username: "",
    password: ""
  };
  handleEmail = text => {
    this.setState({ username: text });
  };
  handlePassword = text => {
    this.setState({ password: text });
  };
  return (
    <ImageBackground
      source={{
        uri:
          "https://www.usinenouvelle.com/mediatheque/4/4/8/000223844_image_896x598/tramway-casablanca.jpg"
      }}
      style={styles.container}
      blurRadius={20}
    >
      <View style={{ alignSelf: "center" }}>
        <Image
          source={require("./assets/tram_.png")}
          style={styles.images}
          resizeMode="contain"
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Username"
          placeholderTextColor="#ffff"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#ffff"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.email, this.state.password)}
        >
          <Text style={styles.submitButtonText}> LOGIN </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
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
    width: 300,
    paddingLeft: 20,
    marginLeft: 50,
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 10
  },
  submitButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    marginLeft: 50,
    margin: 30,
    height: 52,
    width: 300,
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
