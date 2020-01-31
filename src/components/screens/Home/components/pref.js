import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView
} from "react-native";
import { StatusBar } from "react-native";
import { Platform } from "react-native";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
const survey = require("../assets/sur05.png");
const other = require("../assets/vs03.png");
import get from "lodash/get";
const w = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Accordion, Badge, Button } from "native-base";

export default function Pref(props) {
  // console.log(get(data, "createVote.id", ""));
  const dataArray = [
    {
      title: "test",
      content: "test"
    }
  ];
  return (
    <View style={styles.innerContainer}>
      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          justifyContent: "space-between",
          width: w
        }}
      >
        <Text style={{ fontSize: 30, margin: 20 }}>Score </Text>
        <Badge style={{ backgroundColor: "#1D7B9D", margin: 28 }}>
          <Text style={{ color: "white", fontSize: 15 }}>20 </Text>
        </Badge>
      </View>
      <View style={{ flex: 0.4, width: w }}>
        <Accordion
          dataArray={dataArray}
          headerStyle={{ backgroundColor: "#fff" }}
          contentStyle={{ backgroundColor: "#fff" }}
        />
      </View>
      <View style={{ alignItems: "center", margin: 20 }}>
        <Button style={{ backgroundColor: "#1D7B9D" }}>
          <Text
            style={{
              marginLeft: 50,
              marginRight: 50,
              color: "#E2A829",
              fontWeight: "bold"
            }}
          >
            GO
          </Text>
        </Button>
      </View>
    </View>
  );
}
//"#1D7B9D"
const styles = StyleSheet.create({
  icon: {
    fontSize: 40
  },

  innerContainer: {
    flex: 1,
    backgroundColor: "transparent",
    marginTop: Platform.OS === "ios" ? 90 : StatusBar.currentHeight,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden"
  }
});
