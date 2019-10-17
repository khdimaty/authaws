import React from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Animated
} from "react-native";
import Auth from "@aws-amplify/auth";
import { Container, Item, Input, Icon } from "native-base";
export default class ProfileScreen extends React.Component {
  state = { username: "" };
  componentDidMount = async () => {
    await this.getusername();
  };
  // Remember logged in users
  getusername = async () => {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          username: user.username
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>hello this is {this.state.username} Profile</Text>
        <Text>
          {" "}
          {JSON.stringify(this.props.navigation.getParam("toto", "NO-toto"))}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF7",
    alignItems: "center",
    justifyContent: "center"
  }
});
