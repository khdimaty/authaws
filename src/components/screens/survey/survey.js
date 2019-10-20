import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Button } from "native-base";

export default class Survey extends React.Component {
  state = {
    questionNumber: 0,
    taskquestionCount: this.props.data.length - 1,
    value: null,
    metadata: {}
  };
  click() {
    if (this.state.questionNumber == this.state.taskquestionCount) {
      this.props.navigation.navigate("Home");
    } else {
      this.setState({
        questionNumber: this.state.questionNumber + 1
      });
    }
  }
  render() {
    let { questionText, options } = this.props.data[this.state.questionNumber];
    console.log(this.state.value);
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.text}>{this.props.taskname}</Text>
        </View>
        <View style={styles.question}>
          <Text style={styles.text}>{questionText}</Text>
        </View>
        <View style={styles.options}>
          {options.map(({ id, optionText }) => (
            <TouchableOpacity
              onPress={() => this.setState({ value: id })} // we set our value state to key
            >
              <View key={id} style={styles.buttonContainer}>
                <Text>{optionText}</Text>
                <View style={styles.circle}>
                  {this.state.value === id && (
                    <View style={styles.checkedCircle} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonNext}>
          <Button onPress={() => this.click()}>
            <View
              style={{
                paddingLeft: 20,
                paddingRight: 20
              }}
            >
              <Text>
                {this.state.taskquestionCount == this.state.questionNumber
                  ? "finish"
                  : "Next"}
              </Text>
            </View>
          </Button>
        </View>
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
  options: {
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
    padding: 30
  },
  buttonNext: {
    flex: 0.1,
    width: 318,
    marginBottom: 10,
    alignItems: "center"
  }
});
