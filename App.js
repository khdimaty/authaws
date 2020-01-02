import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

//navigation imports
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { fromLeft } from "react-navigation-transitions";
//import Screens
import AuthLoadingScreen from "./src/components/screens/AuthLoadingScreen";
//import WelcomeScreen from "./src/components/screens/WelcomeScreen";
import SignUpScreen from "./src/components/screens/SignUpScreen";
import SignInScreen from "./src/components/screens/SignInScreen";
import ForgetPasswordScreen from "./src/components/screens/ForgetPasswordScreen";
import HomeScreen from "./src/components/screens/Home/HomeScreen";
import SettingsScreen from "./src/components/screens/SettingsScreen";
import ProfileScreen from "./src/components/screens/Profile/ProfileScreen";
import SurveyScreen from "./src/components/screens/survey/index";
import Welc from "./src/components/screens/welcome/WelcomeS";
import InfoPerso from "./src/components/screens/SelfInfo";
import Rewards from "./src/components/screens/rewards/index";
import Myrewards from "./src/components/screens/myreward";
import Mymodal from "./src/components/screens/Home/components/modal";

//graphql client
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import prismauri from "./apiVariable";
const client = new ApolloClient({
  uri: prismauri
});
// Amplify imports and config
import Amplify from "@aws-amplify/core";
import config from "./aws-exports";

Amplify.configure(config);

const AuthStackNavigator = createStackNavigator({
  Welcome: {
    screen: Welc,
    navigationOptions: () => ({
      headerBackTitle: "Retour",
      headerStyle: {
        backgroundColor: "#4278A4"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: () => ({
      title: `Créer un compte`,
      headerStyle: {
        backgroundColor: "#4278A4"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },
  SignIn: {
    screen: SignInScreen,
    navigationOptions: () => ({
      title: `Se connecter `,
      headerStyle: {
        backgroundColor: "#4278A4"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },
  ForgetPassword: {
    screen: ForgetPasswordScreen,
    navigationOptions: () => ({
      title: `Changer le mot de passe`,
      headerStyle: {
        backgroundColor: "#4278A4"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },
  InfoPerso: {
    screen: InfoPerso,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: "#4278A4"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  },
  Myrewards: {
    screen: Myrewards,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: "#4278A4"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    })
  }
});

const reward = createStackNavigator(
  {
    Main: {
      screen: HomeScreen
    },
    Rewards: {
      screen: Rewards,
      navigationOptions: {
        gestureResponseDistance: { vertical: 135 } // default is 135 },
      }
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
      screen: reward
    },
    Profile: {
      screen: ProfileScreen
    }

    //Vs: { screen: Vs }
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
      inactiveTintColor: "gray",
      activeTintColor: "#E2A829"
    }
  }
);
const AppNavigator = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: AppTabNavigator,
  //test: Test,
  survey: SurveyScreen
  // rewards: Rewards
});
const Navigator = createAppContainer(AppNavigator);
export default function App() {
  return (
    <ApolloProvider client={client}>
      <Navigator />
    </ApolloProvider>
  );
}
