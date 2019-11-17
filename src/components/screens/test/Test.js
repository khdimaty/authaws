import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import RoundedButton from "./components//RoundedButton";

const khdimatyLogo = require("./assets/tram_.png");
const colors = {
  black: "#000000",
  lightBlack: "#484848",
  white: "#ffffff",
  green01: "#008388",
  green02: "#02656b",
  darkOrange: "#d93900",
  lightGray: "#d8d8d8",
  pink: "#fc4c54",
  gray01: "#f3f3f3",
  gray02: "#919191",
  gray03: "#b3b3b3",
  gray04: "#484848",
  gray05: "#dadada",
  gray06: "#ebebeb",
  gray07: "#f2f2f2",
  brown01: "#ad8763",
  brown02: "#7d4918",
  blue: "#4995cd"
};
export default class LoggedOut extends Component {
  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <Image source={khdimatyLogo} style={styles.logo} />
          <Text style={styles.welcomeText}>Welcome to Khdimaty.</Text>
          <RoundedButton
            text="Sign in"
            textColor={colors.green01}
            background={colors.white}
            icon={
              <Icon
                name="sign-in"
                size={20}
                style={styles.facebookButtonIcon}
              />
            }
            handleOnPress={() => {
              this.props.navigation.navigate("SignIn");
            }}
          />
          <RoundedButton
            text="Create Account"
            textColor={colors.white}
            handleOnPress={() => this.props.navigation.navigate("SignUp")}
          />

          <TouchableHighlight
            style={styles.moreOptionsButton}
            onPress={() => this.props.navigation.navigate("ForgetPassword")}
          >
            <Text style={styles.moreOptionsButtonText}>More options</Text>
          </TouchableHighlight>
          <View style={styles.termsAndConditions}>
            <Text style={styles.termsText}>
              By tapping Continue, Create Account or More
            </Text>
            <Text style={styles.termsText}>{" options,"}</Text>
            <Text style={styles.termsText}>{"I agree to Khdimaty's "}</Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>Terms of Service</Text>
            </TouchableHighlight>
            <Text style={styles.termsText}> and</Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>Privacy Policy .</Text>
            </TouchableHighlight>
          </View>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    display: "flex",
    backgroundColor: colors.blue
  },
  welcomeWrapper: {
    flex: 1,
    display: "flex",
    marginTop: 30,
    padding: 20
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 50,
    marginBottom: 40
  },
  welcomeText: {
    fontSize: 26,
    color: colors.white,
    fontWeight: "300",
    marginBottom: 40
  },
  facebookButtonIcon: {
    color: colors.blue,
    position: "relative",
    left: 20,
    zIndex: 8
  },
  moreOptionsButton: {
    marginTop: 10
  },
  moreOptionsButtonText: {
    color: colors.white,
    fontSize: 16
  },
  termsAndConditions: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 30
  },
  termsText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "600"
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white
  }
});
