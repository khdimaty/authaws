import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "native-base";

export default class Survey extends React.Component {
  state = {
    questionNumber: 1,
    taskquestionCount: 2,

    buttonText: "Next"
  };
  click() {
    this.setState({ questionNumber: questionNumber + 1 });
    let condition = this.state.taskquestionCount == this.state.questionNumber;
    var text = condition ? "finish" : "Next";
    this.setState({ buttonText: text });
  }
  render() {
    let { questionNumber, buttonText } = this.state;
    let { questionText, options } = this.props.data[questionNumber];
    return (
      <View style={styles.container}>
        <Text>{questionText}</Text>
        {options.map(({ id, optionText }) => (
          <View key={id}>
            <Text>{optionText}</Text>
          </View>
        ))}
        <Button onPress={this.click}>
          <Text>{buttonText}</Text>
        </Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF7",
    alignItems: "center",
    justifyContent: "center"
  }
});
