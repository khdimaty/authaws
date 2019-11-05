import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from "react-native";

const other = require("../assets/test.png");
const survey = require("../assets/appstore.png");
const w = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Accordion, Badge, Button } from "native-base";
export default function Mymodal(props) {
  let { taskname, description, type, score } = props;
  [color, setcolor] = useState("white");
  const dataArray = [
    {
      title: taskname,
      content: description
    }
  ];
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        overflow: "hidden",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
      }}
    >
      <ImageBackground
        style={{
          flex: 0.4,
          width: w
        }}
        source={type == "survey" ? survey : other}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            position: "absolute",
            bottom: 0
          }}
        >
          <Text
            style={{
              flex: 0.8,
              color: "white",
              fontSize: 30,
              marginLeft: 20
            }}
          >
            {taskname}
          </Text>
          <View style={{ flex: 0.2, marginLeft: 20 }}>
            <TouchableOpacity
              onPress={() => setcolor(color == "white" ? "red" : "white")}
            >
              <Icon
                style={[styles.icon, { color: color }]}
                name="cards-heart"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          justifyContent: "space-between",
          width: w
        }}
      >
        <Text style={{ fontSize: 30, margin: 20 }}>Score </Text>
        <Badge style={{ backgroundColor: "black", margin: 28 }}>
          <Text style={{ color: "white", fontSize: 15 }}>
            {score} <Text>pt</Text>
          </Text>
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
        <Button
          onPress={() =>
            props.navigation.navigate("survey", {
              name: taskname
            })
          }
          bordered
          dark
        >
          <Text style={{ marginLeft: 50, marginRight: 50 }}>Start</Text>
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  icon: {
    fontSize: 40
  }
});
