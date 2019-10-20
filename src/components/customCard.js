import React from "react";
import { StyleSheet, TouchableHighlight, Image } from "react-native";

import {
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
const survey = require("./images/survey.png");
const other = require("./images/no-image.png");
export default class CustomCard extends React.Component {
  toTask() {
    //navigate to screentype task with name as element {to query task by name }
    this.props.navigation.navigate("survey", {
      name: this.props.name
    });
  }
  render() {
    const { name, score, type } = this.props;
    let imag = type == "survey" ? survey : other;
    return (
      <TouchableHighlight onPress={() => this.toTask()} underlayColor="white">
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text>{name}</Text>
                <Text note>brougth to you by khdimaty team</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={imag}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>

            <Right>
              <Text>Task Score : {score}</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableHighlight>
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
