import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import AuthLoadingScreen from "../components/screens/AuthLoadingScreen";
import WelcomeScreen from "../components/screens/WelcomeScreen";
import SignUpScreen from "../components/screens/SignUpScreen";
import SignInScreen from "../components/screens/SignInScreen";
import ForgetPasswordScreen from "../components/screens/ForgetPasswordScreen";
import HomeScreen from "../components/screens/HomeScreen";
import SettingsScreen from "../components/screens/SettingsScreen";
import ProfileScreen from "../components/screens/ProfileScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import React from "react";
// Amplify imports and config
import Amplify from "@aws-amplify/core";
import config from "../../aws-exports";
Amplify.configure(config);
const AuthStackNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: () => ({
      title: `Welcome to this App`,
      headerBackTitle: "Back"
    })
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: `Create a new account`
    })
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Log in to your account`
    })
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: `Create a new password`
    })
  }
});
const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Profile: {
      screen: ProfileScreen
    },
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === "Home") {
          iconName = `ios-home`;
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
        } else if (routeName === "Settings") {
          iconName = `ios-options`;
        } else if (routeName === "Profile") {
          iconName = `ios-person`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      inactiveTintColor: "gray"
    }
  }
);

const Navigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppTabNavigator
});
export default titi;
