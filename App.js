import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, Platform, Image, View, Text } from "react-native";
//navigation imports
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { fromLeft } from "react-navigation-transitions";
//import Screens
import AuthLoadingScreen from "./src/components/screens/AuthLoadingScreen";
import WelcomeScreen from "./src/components/screens/WelcomeScreen";
import SignUpScreen from "./src/components/screens/SignUpScreen";
import SignInScreen from "./src/components/screens/SignInScreen";
import ForgetPasswordScreen from "./src/components/screens/ForgetPasswordScreen";
import HomeScreen from "./src/components/screens/Home/HomeScreen";
import SettingsScreen from "./src/components/screens/SettingsScreen";
import ProfileScreen from "./src/components/screens/Profile/ProfileScreen";
import SurveyScreen from "./src/components/screens/survey/index";
import Test from "./src/components/screens/test/Test";
import Profile from "./src/components/screens/profileTest/profile";
import Mymodal from "./src/components/screens/Home/components/modal";
//graphql client
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import prismauri from "./apiVariable";
const client = new ApolloClient({
  uri: prismauri
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

const HomeStack = createStackNavigator(
  {
    Main: {
      screen: HomeScreen
    },
    MyModal: {
      screen: Mymodal,
      navigationOptions: {
        gestureResponseDistance: { vertical: 1000 } // default is 135 },
      }
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    transparentCard: true
  }
);
const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack
    },
    Profile: {
      screen: Profile
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
  //AuthLoading: AuthLoadingScreen,
  //Auth: AuthStackNavigator,
  App: AppTabNavigator,
  test: Test,
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
