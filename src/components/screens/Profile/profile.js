import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal
} from "react-native";
import { Container, Header, Content, Icon, Picker, Form } from "native-base";
const Havatar = require("./assets/Havatar.png");
const Favatar = require("./assets/Favatar.png");
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: "key0",
      image: null
    };
  }
  onValueChange(value) {
    console.log("walo");
  }

  render() {
    let {
      score,
      local,
      mytaskCount,
      username,
      statut,
      sex,
      level,
      myrewards
    } = this.props;
    console.log(myrewards);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignSelf: "center", alignItems: "center" }}>
            <View style={styles.profileImage}>
              <Image
                source={sex === "Femme" ? Favatar : Havatar}
                style={styles.Image}
                resizeMode="center"
              ></Image>
              <TouchableOpacity>
                <View style={styles.edit}>
                  <Ionicons
                    name="ios-camera"
                    size={30}
                    color="#DFD8C8"
                  ></Ionicons>
                </View>
              </TouchableOpacity>
            </View>
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
                <Text
                  style={[
                    styles.text,
                    { fontSize: 18, marginTop: 10, fontWeight: "bold" }
                  ]}
                >
                  Mes Intérêts
                </Text>
              </View>

              <View style={styles.infospers}>
                <Text style={[styles.text, { fontSize: 18 }]}>{sex} </Text>
                <Text style={[styles.text, { fontSize: 18, marginTop: 10 }]}>
                  {20}
                </Text>
                <Text style={[styles.text, { fontSize: 18, marginTop: 10 }]}>
                  {local}
                </Text>
              </View>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.interets}>
                <Image
                  source={require("./assets/sport2.png")}
                  style={styles.Image}
                  resizeMode="cover"
                ></Image>
              </View>
              <View style={styles.interets}>
                <Image
                  source={require("./assets/shopping3.png")}
                  style={styles.Image}
                  resizeMode="cover"
                ></Image>
              </View>
              <View style={styles.interets}>
                <Image
                  source={require("./assets/voyage2.png")}
                  style={styles.Image}
                  resizeMode="cover"
                ></Image>
              </View>
              <View style={styles.interets}>
                <Image
                  source={require("./assets/lecture2.png")}
                  style={styles.Image}
                  resizeMode="cover"
                ></Image>
              </View>
            </ScrollView>
          </View>
          <View>
            <Form>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize: 18,
                      marginTop: 15,
                      marginLeft: 40,
                      fontWeight: "bold"
                    }
                  ]}
                >
                  Mes recompenses
                </Text>
                <Picker
                  mode="dropdown"
                  // iosHeader="My rewads"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  {this.props.myrewards.map(url => (
                    <Picker.Item key={url} label={url} value={url} />
                  ))}
                </Picker>
              </View>
            </Form>
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
    width: undefined,
    height: undefined
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
  }
});
