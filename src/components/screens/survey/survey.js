import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Button } from "native-base";
//import { CheckBox } from "react-native-elements";
export default class Survey extends React.Component {
  state = {
    questionNumber: 0,
    taskquestionCount: this.props.data.length - 1,
    value: null,
    metadata: {},
    press: false
  };
  click() {
    if (this.state.questionNumber == this.state.taskquestionCount) {
      this.props.navigation.navigate("Home");
    } else {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
        press: false
      });
    }
  }
  render() {
    let { questionText, options } = this.props.data[this.state.questionNumber];

    return (
      <View style={styles.container}>
        <Image source={require("./appstore.png")} style={styles.Images}></Image>
        <View style={styles.info}>
          <Text style={styles.header}>
            Question {this.state.questionNumber + 1}/{this.props.data.length}
          </Text>
        </View>
        <View style={styles.lines} />

        <View style={styles.question}>
          <Text style={styles.text}>{questionText}</Text>
        </View>
        <View style={styles.options}>
          {options.map(({ id, optionText }) => {
            let added =
              this.state.value === id
                ? {
                    borderColor: "#fff"
                    //borderWidth: 3
                    //shadowOpacity: 1
                  }
                : {};
            return (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  this.setState({ value: id, press: true });
                }}
              >
                <View style={[styles.Rsp1, added]}>
                  <Text style={[styles.text_]}>{optionText}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.buttons}>
          {this.state.press && (
            <Button
              onPress={() => this.click()}
              style={{ backgroundColor: "#0033EE" }}
            >
              <Text style={{ marginLeft: 50, marginRight: 50, color: "#fff" }}>
                {this.state.taskquestionCount == this.state.questionNumber
                  ? "finish"
                  : "Next"}
              </Text>
            </Button>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginBottom: 10,
    backgroundColor: "#FFF"

    // alignItems: "center"
  },

  info: {
    flex: 0.1,
    //width: 318,

    marginBottom: 5,
    //alignSelf: "center",
    paddingTop: 30
    // backgroundColor: "black"
  },
  question: {
    flex: 0.3,
    //width: 318,
    //backgroundColor: "rgba(240,240,240,1)",
    marginBottom: 10,
    marginLeft: 10,
    // alignSelf: "center",
    paddingTop: 30
  },
  options: {
    flex: 0.5,
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
    height: 1,
    backgroundColor: "#000",
    marginTop: 2,
    marginLeft: 10
  },
  header: {
    fontFamily: "HelveticaNeue",
    color: "#000",
    // marginTop: 90,
    fontSize: 28,
    marginLeft: 15
    // alignSelf: "center"
  },
  Rsp1: {
    color: "#000",
    //height: 52,
    width: "90%",

    borderColor: "#000",
    borderWidth: 1,
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
    flex: 0.1,
    alignItems: "center",
    alignSelf: "center",

    // marginTop: 10,
    padding: 10
  },
  Images: {
    position: "absolute",
    alignSelf: "stretch",
    height: "100%"
  }
});
