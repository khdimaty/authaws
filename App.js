import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
//navigation imports
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
//import Screens
import AuthLoadingScreen from "./src/components/screens/AuthLoadingScreen";
import WelcomeScreen from "./src/components/screens/WelcomeScreen";
import SignUpScreen from "./src/components/screens/SignUpScreen";
import SignInScreen from "./src/components/screens/SignInScreen";
import ForgetPasswordScreen from "./src/components/screens/ForgetPasswordScreen";
import HomeScreen from "./src/components/screens/HomeScreen";
import SettingsScreen from "./src/components/screens/SettingsScreen";
import ProfileScreen from "./src/components/screens/ProfileScreen";
import TestScreen from "./src/components/screens/test";
import SurveyScreen from "./src/components/screens/survey/index";
//graphql client
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({
  uri: "https://eu1.prisma.sh/public-quickmoth-103/khdimbackend/dev"
});
// Amplify imports and config
import Amplify, { Storage } from "@aws-amplify/core";
import config from "./aws-exports";

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
const AppNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppTabNavigator,
  test: TestScreen,
  survey: SurveyScreen
});
const Navigator = createAppContainer(AppNavigator);
export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigator />
    </ApolloProvider>
  );
}
