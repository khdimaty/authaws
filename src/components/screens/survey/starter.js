import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Button } from "native-base";

export default class Starter extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.text}>{this.props.taskname}</Text>
        </View>
        <View style={styles.question}>
          <Text style={styles.text}>info</Text>
        </View>
        <View style={styles.description}>{this.props.description}</View>
        <Button
          style={styles.buttonNext}
          onPress={() => {
            this.props.start();
          }}
        >
          <Text style={styles.textbutt}>start</Text>
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#FFFFFF7",
    alignItems: "center"
  },
  buttonContainer: {
    padding: 15,

    flexDirection: "row",
    justifyContent: "space-between"
  },
  circle: {
    marginRight: 20,
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ACACAC",
    alignItems: "center",
    justifyContent: "center"
  },
  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#794F9B"
  },
  info: {
    flex: 0.2,
    width: 318,

    marginBottom: 30,
    alignSelf: "center",
    paddingTop: 30
  },
  question: {
    flex: 0.3,
    width: 318,
    backgroundColor: "rgba(240,240,240,1)",
    marginBottom: 30,
    alignSelf: "center",
    paddingTop: 30
  },
  description: {
    width: 318,
    flex: 0.4,
    backgroundColor: "rgba(230, 230, 230,1)",
    borderRadius: 22,
    borderColor: "#000000",
    borderWidth: 1,
    marginBottom: 30,
    alignSelf: "center",
    paddingTop: 30
  },
  text: {
    color: "#121212",
    fontSize: 20,
    fontFamily: "roboto-regular",

    alignSelf: "center",
    fontFamily: "impact-regular",
    fontWeight: "bold"
  },
  textbutt: {
    margin: 10
  },
  buttonNext: {
    width: 50,
    marginBottom: 10,
    alignItems: "center"
  }
});
