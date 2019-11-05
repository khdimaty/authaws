import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView
} from "react-native";
const Havatar = require("./assets/Havatar.png");
const Favatar = require("./assets/Favatar.png");
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Accordion, Badge, Button, H1 } from "native-base";
export default function Profile(props) {
  let {
    age,
    score,
    local,
    mytaskCount,
    username,
    statut,
    sex,
    level,
    interests
  } = props;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={sex == "Homme" ? Havatar : Favatar}
              style={styles.Image}
              resizeMode="center"
            ></Image>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            {username}
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 20 }]}>
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

        <View style={{ marginTop: 20 }}>
          <View style={styles.lines}>
            <View style={styles.rect} />
          </View>
          <View style={styles.Box}>
            <View style={styles.infos}>
              <Text style={[styles.text, { fontSize: 18 }]}>Sexe :</Text>
              <Text style={[styles.text, { fontSize: 18, marginTop: 10 }]}>
                Age :
              </Text>
              <Text style={[styles.text, { fontSize: 18, marginTop: 10 }]}>
                Localisation :
              </Text>
              <Text style={[styles.text, { fontSize: 18, marginTop: 20 }]}>
                Intérêts :
              </Text>
            </View>
            <View style={styles.infospers}>
              <Text style={[styles.text, { fontSize: 18 }]}>{sex}</Text>
              <Text style={[styles.text, { fontSize: 18, marginTop: 10 }]}>
                {age}
              </Text>
              <Text style={[styles.text, { fontSize: 18, marginTop: 10 }]}>
                {local}
              </Text>
            </View>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {interests.map(interest => (
              <View style={styles.interets} key={interest.value}>
                <Button dark large bordered>
                  <H1 style={{ paddingHorizontal: 5 }}>{interest.value}</H1>
                </Button>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  rect: {
    width: 366,
    height: 1,
    backgroundColor: "#DFD8C8",
    marginTop: 2,
    marginLeft: 20
  },
  text: {
    color: "#52575D"
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
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
    marginTop: 20,
    width: 120,
    height: 120,
    borderRadius: 200,
    overflow: "hidden"
  },
  edit: {
    backgroundColor: "#414448",
    position: "absolute",
    bottom: 0,
    right: 0,
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
    marginTop: 32
  },
  statbox: {
    alignItems: "center",
    flex: 1
  },
  Box: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 5,
    margin: 5
  },
  infospers: {
    fontSize: 16,
    color: "#DFD8C8",
    fontWeight: "500",
    margin: 10,
    marginTop: 20
  },
  infos: {
    fontSize: 16,
    color: "#DFD8C8",
    fontWeight: "500",
    margin: 5,
    marginTop: 20
  },
  interets: {
    marginHorizontal: 10
  },
  badgeText: {
    fontSize: 25,
    paddingHorizontal: 5,
    fontFamily: "bold"
  }
});
