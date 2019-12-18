import React, { useState } from "react";
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

const survey = require("../assets/sur05.png");
const other = require("../assets/vs03.png");
const w = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Accordion, Badge, Button } from "native-base";
export default function Mymodal(props) {
  let { name, description, type, taskScore } = props.navigation.getParam(
    "taskinfo",
    "null"
  );

  [color, setcolor] = useState("white");
  const dataArray = [
    {
      title: name,
      content: description
    }
  ];

  return (
    <View style={styles.innerContainer}>
      <ImageBackground
        style={{
          flex: 0.4,
          width: w
        }}
        source={type === "survey" ? survey : other}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <View
            style={{
              marginLeft: w - 57,
              width: 30,
              height: 30,
              borderRadius: 30 / 2,
              marginTop: 20,
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "#e7eff6"
            }}
          >
            <Icon name="close" size={30} />
          </View>
        </TouchableOpacity>
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
              marginLeft: 20,
              fontWeight: "bold"
            }}
          >
            {name}
          </Text>
          <View
            style={{
              flex: 0.2,
              marginLeft: 30,
              flexDirection: "column-reverse"
            }}
          >
            <TouchableOpacity
              onPress={() => setcolor(color == "white" ? "#E2A829" : "white")}
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
        <Badge style={{ backgroundColor: "#1D7B9D", margin: 28 }}>
          <Text style={{ color: "white", fontSize: 15 }}>
            {taskScore} <Text>pt</Text>
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
          style={{ backgroundColor: "#1D7B9D" }}
          onPress={() =>
            props.navigation.navigate("survey", {
              name: name
            })
          }
        >
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
    marginTop: 90,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden"
  }
});
