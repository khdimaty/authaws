import React from "react";
import { View, StyleSheet, Text, Switch } from "react-native";

import Carouss from "./index";
export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View
          style={{
            flex: 0.2,
            marginTop: 40,

            // alignContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              //alignSelf: "center",
              fontSize: 30
            }}
          >
            Khdimaty
          </Text>
        </View>
        <View style={styles.info}>
          <View style={styles.statsContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              Anasio
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
              <Text style={[styles.text, { fontSize: 24 }]}>1000 pt</Text>
              <Text style={[styles.text, styles.subText]}>Score</Text>
            </View>
            <View style={styles.statbox}>
              <Text style={[styles.text, { fontSize: 24 }]}>20</Text>
              <Text style={[styles.text, styles.subText]}>Tâches</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.rewards}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            alignContent: "space-between"
          }}
        >
          <Text
            style={{
              marginLeft: 15,
              fontSize: 30,
              fontWeight: "bold"
            }}
          >
            Rewards{" "}
          </Text>
        </View>
        <Carouss />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  user: {
    flex: 0.5,
    backgroundColor: "#fff",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    shadowRadius: 30,
    shadowOpacity: 0.2,
    shadowOffset: { width: 10, height: 20 }
  },
  rewards: { flex: 0.5 },
  header: {
    //backgroundColor: "green",
    flex: 0.2,

    // flexDirection: "row-reverse",
    // alignContent: "space-between",

    alignContent: "center",
    //backgroundColor: "#ee9",
    marginTop: 20,
    padding: 15
  },
  info: { flex: 0.8 },

  text: {
    color: "#52575D"
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
