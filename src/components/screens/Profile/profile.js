import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("./assets/profile.png")}
              style={styles.Image}
              resizeMode="center"
            ></Image>
          </View>
          <View style={styles.edit}>
            <Ionicons
              name="ios-camera"
              size={30}
              color="#DFD8C8"
              styles={{ marginTop: 7, marginLeft: 3 }}
            ></Ionicons>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
            Julie Nitchud
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 20 }]}>
            PHD Student
          </Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statbox}>
            <Text style={[styles.text, { fontSize: 24 }]}>7</Text>
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
            <Text style={[styles.text, { fontSize: 24 }]}>23K</Text>
            <Text style={[styles.text, styles.subText]}>Score</Text>
          </View>
          <View style={styles.statbox}>
            <Text style={[styles.text, { fontSize: 24 }]}>20</Text>
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
              <Text style={[styles.text, { fontSize: 18 }]}>Femme</Text>
              <Text style={[styles.text, { fontSize: 18, marginTop: 10 }]}>
                23ans
              </Text>
              <Text style={[styles.text, { fontSize: 18, marginTop: 10 }]}>
                Casablanca, Californie
              </Text>
            </View>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.interets}>
              <Image
                source={require("./assets/shopping.png")}
                style={styles.Image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.interets}>
              <Image
                source={require("./assets/shopping.png")}
                style={styles.Image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.interets}>
              <Image
                source={require("./assets/shopping.png")}
                style={styles.Image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.interets}>
              <Image
                source={require("./assets/shopping.png")}
                style={styles.Image}
                resizeMode="cover"
              ></Image>
            </View>
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
    fontFamily: "HelveticaNeue",
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
    width: 150,
    height: 100,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10
  }
});
