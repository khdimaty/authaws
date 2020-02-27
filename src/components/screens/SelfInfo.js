import React from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";
import RNPickerSelect from "react-native-picker-select";
import MultiSelect from "react-native-multiple-select";
import Modal from "react-native-modal";
const userList = {
  "123": "Tom",
  "124": "Michael",
  "125": "Christin"
};
const update = gql`
  mutation updateUser(
    $username: String!
    $age: Int
    $location: String
    $sex: String
  ) {
    updateUser(
      where: { username: $username }
      data: { age: $age, location: $location, sex: $sex }
    ) {
      id
    }
  }
`;

export default class PersoInfo extends React.Component {
  state = {
    username: "",
    password: "",
    sexe: "",
    token: "",
    isHidden: false,
    selectedItems: []
  };

  componentDidMount = async () => {
    await this.getusername();
    //use this to query user info
  };
  // Remember logged in users
  getusername = async () => {
    console.log(this.props.navigation.getParam("username", "anasio"));
    this.setState({
      token: this.props.navigation.getParam("username", "anasio")
    });
  };
  async signIn(mutation) {
    const { username, password, sexe, token } = this.state;
    console.log(this.state);
    mutation({
      variables: {
        username: token,
        age: parseInt(username),
        location: password,
        sex: sexe
      }
    })
      .then(() => {
        console.log(this.state.username);
        this.props.navigation.navigate("Pref", {
          username: this.state.token
        });
      })
      .catch(function(e) {
        console.log(e.message);
        console.log("error");
      });
  }

  onChangeText(key, value) {
    this.setState({ [key]: value });
  }
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    //Set Selected Items
  };

  render() {
    return (
      <ImageBackground
        source={require("./assets/66.jpg")}
        style={styles.container}
        blurRadius={5}
      >
        <ScrollView>
          <SafeAreaView style={styles.container}>
            <StatusBar />
            <KeyboardAvoidingView
              style={styles.container}
              behavior="padding"
              enabled
            >
              <TouchableWithoutFeedback
                style={styles.container}
                onPress={Keyboard.dismiss}
              >
                <View style={styles.container}>
                  <View style={styles.Logo}>
                    <View
                      style={{
                        flex: 1
                      }}
                    />
                    <View
                      style={{
                        marginBottom: 6,
                        marginLeft: 2,
                        marginRight: 3
                      }}
                    >
                      <Image
                        source={require("./assets/khditt.png")}
                        style={styles.images}
                        resizeMode="contain"
                      />
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: 30,
                      marginBottom: 30,
                      alignItems: "center",
                      alignContent: "center"
                    }}
                  >
                    <TextInput
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      placeholder="Age"
                      keyboardType={"numeric"}
                      placeholderTextColor="#ffff"
                      autoCapitalize="none"
                      returnKeyType="next"
                      autoCapitalize="none"
                      autoCorrect={false}
                      onChangeText={value =>
                        this.onChangeText("username", value)
                      }
                    />

                    <TextInput
                      style={styles.input}
                      underlineColorAndroid="transparent"
                      placeholder="Ville"
                      placeholderTextColor="#ffff"
                      autoCapitalize="none"
                      returnKeyType="go"
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="next"
                      ref="SecondInput"
                      onChangeText={value =>
                        this.onChangeText("password", value)
                      }
                    />
                    <View style={[styles.input]}>
                      <RNPickerSelect
                        placeholder={{ label: "Sexe" }}
                        underlineColorAndroid="transparent"
                        placeholderTextColor="#ffff"
                        autoCapitalize="none"
                        onValueChange={value =>
                          this.onChangeText("sexe", value)
                        }
                        items={[
                          { label: "Homme", value: "Homme" },
                          { label: "Femme", value: "Femme" }
                        ]}
                      ></RNPickerSelect>
                    </View>

                    <Mutation mutation={update}>
                      {(updateUser, { data }) => (
                        <TouchableOpacity
                          style={styles.submitButton}
                          onPress={() => this.signIn(updateUser)}
                        >
                          <Text style={styles.submitButtonText}>
                            Bienvenue{" "}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </Mutation>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
    flexDirection: "column"
  },

  logoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 400,
    bottom: 180,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  Logo: {
    height: 111,
    alignSelf: "center"
  },

  images: {
    width: 300,
    height: 130
  },
  input: {
    margin: 15,
    fontSize: 16,
    height: 52,
    width: "80%",
    paddingLeft: 20,
    color: "#fff",

    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: 10
  },
  submitButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    margin: 30,
    height: 52,
    width: "80%",
    borderColor: "white"
  },
  submitButtonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",

    paddingTop: 5
  }
});
