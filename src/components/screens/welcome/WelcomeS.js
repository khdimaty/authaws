import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet
} from "react-native";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Icon from "react-native-vector-icons/FontAwesome";

import RoundedButton from "./components/RoundedButton";

const khdimatyLogo = require("./assets/kkk.png");
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
  blue: "#4278A4",
  gold: "#E2A829"
};
export default class LoggedOut extends Component {
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
    console.log(token);
  };
  componentDidMount = () => {
    this.registerForPushNotification();
  };
  render() {
    return (
      <ScrollView style={styles.wrapper}>
        <View style={styles.welcomeWrapper}>
          <Image source={khdimatyLogo} style={styles.logo} />
          <Text style={styles.welcomeText}>Bienvenue à Khdimaty !</Text>
          <RoundedButton
            text="Se connecter"
            textColor={colors.white}
            background={"rgba(224, 224, 224, 0.3)"}
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
            text="Créer un compte"
            textColor={colors.white}
            handleOnPress={() => this.props.navigation.navigate("SignUp")}
          />

          <TouchableHighlight
            style={styles.moreOptionsButton}
            onPress={() => this.props.navigation.navigate("ForgetPassword")}
          >
            <Text style={styles.moreOptionsButtonText}>
              Mot de passe oublié ?
            </Text>
          </TouchableHighlight>
          <View style={styles.termsAndConditions}>
            <Text style={styles.termsText}>
              En continuant, vous acceptez les
            </Text>

            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}> conditions d'utilisation </Text>
            </TouchableHighlight>
            <Text style={styles.termsText}> et la </Text>
            <TouchableHighlight style={styles.linkButton}>
              <Text style={styles.termsText}>
                Politique de confidentialité de Khdimaty.
              </Text>
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
    padding: 20,
    alignItems: "center"
  },
  logo: {
    width: 130,
    height: 140,
    //marginTop: 50,
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
