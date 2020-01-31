import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ScrollView,
  ImageBackground
} from "react-native";
import { Button } from "native-base";
import Auth from "@aws-amplify/auth";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";

const update = gql`
  mutation updateUser($username: String!, $preference: [String!]) {
    updateUser(
      where: { username: $username }
      data: { preference: { set: $preference } }
    ) {
      id
    }
  }
`;
const preflist = ["test1", "test2", "test3"];
export default class Pref extends React.Component {
  state = {
    questionNumber: 0,

    value: null,
    valueList: [],
    resp: "",
    resplist: [],
    metadata: {},
    press: false,
    optionText: "",
    userName: ""
  };
  componentDidMount = async () => {
    await this.loadUsername();
  };
  // Remember logged in users
  loadUsername = async () => {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          userName: user.signInUserSession.accessToken.payload.username
        });
      })
      .catch(err => console.log(err));
  };
  async click(mutation) {
    await mutation({
      variables: {
        username: this.state.userName,
        preference: this.state.valueList
      }
    });
    this.props.navigation.navigate("SignIn");
  }
  render() {
    // console.log(this.state.valueList);
    return (
      <ImageBackground
        source={require("./assets/66.jpg")}
        style={styles.container}
        blurRadius={5}
      >
        <View style={styles.info}>
          <Text style={styles.header}>
            Choisissez vos {"     "} preferences :{" "}
          </Text>
        </View>

        <View style={styles.options}>
          <ScrollView>
            {preflist.map(optionText => {
              let added = this.state.valueList.includes(optionText)
                ? {
                    borderColor: "#fff"
                    //borderWidth: 3
                    //shadowOpacity: 1
                  }
                : {};
              return (
                <TouchableOpacity
                  key={optionText}
                  onPress={() => {
                    this.state.valueList.includes(optionText)
                      ? this.setState({
                          // valueList: [...this.state.valueList, id],
                          press: true,
                          resplist: [...this.state.resplist, optionText],
                          valueList: this.state.valueList.filter(
                            value => value !== optionText
                          ),
                          resplist: this.state.resplist.filter(
                            value => value !== optionText
                          )
                        })
                      : this.setState({
                          valueList: [...this.state.valueList, optionText],
                          press: true,
                          resplist: [...this.state.resplist, optionText]
                        });
                    // console.log(this.state.optionText);
                  }}
                >
                  <View style={[styles.Rsp1, added]}>
                    <Text style={[styles.text_]}>{optionText}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.buttons}>
          {this.state.press && (
            <Mutation mutation={update}>
              {(update, { data }) => (
                <Button
                  onPress={() => this.click(update)}
                  style={{ backgroundColor: "#E2A829" }}
                >
                  <Text
                    style={{ marginLeft: 50, marginRight: 50, color: "#fff" }}
                  >
                    Bienvenue
                  </Text>
                </Button>
              )}
            </Mutation>
          )}
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
    //marginBottom: 10,
    // backgroundColor: "#FFF"

    // alignItems: "center"
  },

  info: {
    flex: 0.2,
    //width: 318,

    marginBottom: 5,
    //alignSelf: "center",
    paddingTop: 50
    // backgroundColor: "black"
  },

  options: {
    flex: 0.7,
    //backgroundColor: "rgba(230, 230, 230,1)",
    //borderRadius: 22,
    // borderColor: "#000000",
    // borderWidth: 1,
    marginBottom: 10,
    //alignSelf: "center",
    // padding: 10,
    alignItems: "stretch"
  },
  text: {
    marginRight: 5,
    color: "#fff",
    fontSize: 20,
    flex: 1,
    fontWeight: "bold"
  },
  textbutt: {
    padding: 30
  },
  buttonNext: {
    flex: 0.1,
    width: 318,
    marginBottom: 10,
    alignItems: "center"
  },
  lines: {
    width: 320,
    height: 3,
    backgroundColor: "#E2A829",
    marginTop: 2,
    marginLeft: 10
  },
  header: {
    fontFamily: "HelveticaNeue",
    color: "#fff",
    // marginTop: 90,
    fontSize: 28,
    marginLeft: 15
    // alignSelf: "center"
  },
  Rsp1: {
    color: "#000",
    //height: 52,
    width: "90%",

    borderColor: "#E2A829",
    borderWidth: 3,
    //justifyContent: "space-between",
    //paddingLeft: 20,
    //paddingRight: 10,
    borderRadius: 15,

    margin: 10,
    alignContent: "center"

    //backgroundColor: "transparent"
  },
  text_: {
    fontFamily: "HelveticaNeue",
    color: "#fff",
    fontSize: 20,

    margin: 10
  },
  buttons: {
    marginTop: 10,
    flex: 0.1,
    alignItems: "center",
    alignSelf: "center",

    // marginTop: 10,
    padding: 10
  },
  Images: {
    position: "absolute",
    alignSelf: "stretch",
    height: "100%",
    width: "100%"
  }
});
