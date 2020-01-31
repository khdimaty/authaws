import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from "react-native";
import Auth from "@aws-amplify/auth";
import { Icon } from "native-base";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

import { Ionicons } from "@expo/vector-icons";

import Constants from "expo-constants";

import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";

import { Query } from "@apollo/react-components";

const updateUser = gql`
  mutation updateUser($username: String!, $imageUrl: String) {
    updateUser(where: { username: $username }, data: { imageUrl: $imageUrl }) {
      id
    }
  }
`;
const GetUser = gql`
  query userinfo($username: String!) {
    user(where: { username: $username }) {
      imageUrl
    }
  }
`;
const Havatar = require("./assets/Havatar.png");
const Favatar = require("./assets/Favatar.png");

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: "key0",
      image: null,
      username: ""
    };
  }

  componentDidMount = async () => {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          username: user.username
        });
      })
      .catch(err => console.log(err));
    this.getPermissionAsync();
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      console.log(status);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  _pickImage = async update => {
    console.log("clic");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      //
      update({
        variables: { imageUrl: result.uri, username: this.state.username }
      }).then(() => this.setState({ image: result.uri }));
    }
  };

  onValueChange(value) {
    console.log("walo");
  }
  // Sign out from the app
  signOutAlert = async () => {
    await Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out from the app?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Canceled"),
          style: "cancel"
        },
        // Calling signOut
        { text: "OK", onPress: () => this.signOut() }
      ],
      { cancelable: false }
    );
  };
  // Confirm sign out
  signOut = async () => {
    await Auth.signOut()
      .then(() => {
        console.log("Sign out complete");
        this.props.navigation.navigate("AuthLoading");
      })
      .catch(err => console.log("Error while signing out!", err));
  };

  render() {
    let {
      score,
      local,
      mytaskCount,
      username,
      statut,
      sex,
      level,
      myrewards,
      age
    } = this.props;
    let { image } = this.state;
    //console.log(image);
    // console.log(this.props.navigation);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignSelf: "center", alignItems: "center" }}>
            <Mutation mutation={updateUser}>
              {(update, { data }) => (
                <TouchableOpacity onPress={() => this._pickImage(update)}>
                  <View style={styles.profileImage}>
                    <Query
                      query={GetUser}
                      variables={{ username: this.state.username }}
                      onCompleted={data => {
                        this.setState({ image: data.user.imageUrl });
                      }}
                    >
                      {({ loading, error, data }) => {
                        if (loading)
                          return (
                            <Image
                              source={Havatar}
                              style={styles.Image}
                              //resizeMode="center"
                            />
                          );
                        if (error) return `Error! ${error.message}`;

                        return (
                          <Image
                            source={{ uri: image }}
                            style={styles.Image}
                            //resizeMode="center"
                          />
                        );
                      }}
                    </Query>

                    <View style={styles.edit}>
                      <Ionicons
                        name="ios-camera"
                        size={30}
                        color="#DFD8C8"
                      ></Ionicons>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </Mutation>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {username}
            </Text>
            <Text
              style={[
                styles.text,
                { color: "#E2A829", fontSize: 20, fontWeight: "bold" }
              ]}
            >
              {statut}
            </Text>
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statbox}>
              <Text style={[styles.text, { fontSize: 24 }]}>{level}</Text>
              <Text style={[styles.text, styles.subText]}>Niveau</Text>
            </View>
            <View
              style={[
                styles.statbox,
                {
                  borderColor: "#DFD8C8",
                  borderLeftWidth: 1,
                  borderRightWidth: 1
                }
              ]}
            >
              <Text style={[styles.text, { fontSize: 24 }]}>{score}</Text>
              <Text style={[styles.text, styles.subText]}>Score</Text>
            </View>
            <View style={styles.statbox}>
              <Text style={[styles.text, { fontSize: 24 }]}>{mytaskCount}</Text>
              <Text style={[styles.text, styles.subText]}>Tâches</Text>
            </View>
          </View>

          <View style={{ marginTop: 10 }}>
            <View style={styles.lines}>
              <View style={styles.rect} />
            </View>
            <View style={styles.Box}>
              <View style={styles.infos}>
                <Text
                  style={[styles.text, { fontSize: 18, fontWeight: "bold" }]}
                >
                  Sexe{" "}
                </Text>
                <Text
                  style={[
                    styles.text,
                    { fontSize: 18, marginTop: 10, fontWeight: "bold" }
                  ]}
                >
                  Age
                </Text>
                <Text
                  style={[
                    styles.text,
                    { fontSize: 18, marginTop: 10, fontWeight: "bold" }
                  ]}
                >
                  Localisation
                </Text>
              </View>

              <View style={styles.infospers}>
                <Text style={[styles.text, { fontSize: 18 }]}>{sex} </Text>
                <Text style={[styles.text, { fontSize: 18, marginTop: 10 }]}>
                  {age}
                </Text>
                <Text style={[styles.text, { fontSize: 18, marginTop: 10 }]}>
                  {local.toUpperCase()}
                </Text>
              </View>
            </View>
            <TouchableHighlight
              style={[
                styles.buttonOutStyle,
                {
                  flexDirection: "row",
                  justifyContent: "center"
                }
              ]}
              onPress={this.signOutAlert}
            >
              <>
                <Icon
                  name="md-power"
                  style={{ color: "#000", paddingRight: 10 }}
                />
                <Text style={styles.buttonText}>Sign out</Text>
              </>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  rect: {
    width: "90%",
    height: 1,
    backgroundColor: "#DFD8C8",
    marginTop: 2,
    alignSelf: "center"
    // marginLeft: 20
  },
  text: {
    color: "#52575D"
  },
  subText: {
    fontSize: 12,
    color: "#E2A829",
    textTransform: "uppercase",
    fontWeight: "bold"
  },
  Image: {
    flex: 1,
    width: 120,
    height: 120
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  profileImage: {
    marginTop: 10,
    width: 120,
    height: 120,
    borderRadius: 200,
    overflow: "hidden"
    // marginLeft: "10%"
  },
  edit: {
    backgroundColor: "#414448",
    position: "absolute",
    right: 5,
    bottom: 10,
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10
  },
  statbox: {
    alignItems: "center",
    flex: 1
  },
  Box: {
    flexDirection: "row",
    marginLeft: "10%",
    marginTop: 5,
    margin: 5
  },
  infospers: {
    fontSize: 16,
    color: "#DFD8C8",
    fontWeight: "500",
    marginLeft: 80,
    marginTop: 20
  },
  infos: {
    fontSize: 16,
    color: "#DFD8C8",
    fontWeight: "500",
    marginTop: 20
  },
  interets: {
    width: 150,
    height: 60,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
    marginTop: 10
  },
  badgeText: {
    fontSize: 25,
    paddingHorizontal: 5,
    fontFamily: "bold"
  },
  modalview: {
    marginTop: 20,
    backgroundColor: "rgba(36,123,160,1)",
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  },
  closeText: {
    backgroundColor: " rgba(36,123,160,1)",
    color: "#bbb",
    padding: 5,
    margin: 20,
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    paddingLeft: 100,
    paddingRight: 80,
    paddingTop: 5,
    borderRadius: 10
  },
  openText: {
    marginTop: 40,
    backgroundColor: "rgba(36, 123 ,160,1)",
    margin: 15,
    borderColor: " rgba(36,123 ,160,1)",
    borderWidth: 1,
    fontSize: 16,
    height: 50,
    width: 200,
    paddingLeft: 20,
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    padding: "3%",
    paddingLeft: 50,
    borderRadius: 10,
    paddingRight: 40
  },
  buttonOutStyle: {
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "#DFD8C8",
    padding: 14,
    marginBottom: 100,
    borderRadius: 24,
    borderColor: "#000",
    width: "60%",
    alignSelf: "center"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000"
  }
});
