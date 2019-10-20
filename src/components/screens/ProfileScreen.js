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
import Test from "./test";
import { Container, Header, Body, Title } from "native-base";
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
      <Container>
        <Header>
          <Body style={{ backgroundColor: "#fff" }}>
            <Title
              style={{
                fontSize: 30,
                color: "#000"
              }}
            >
              Khdimaty
            </Title>
          </Body>
        </Header>
        <Test />
      </Container>
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
