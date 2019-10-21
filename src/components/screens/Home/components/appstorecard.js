import React from "react";
import styled from "styled-components";
import { TouchableHighlight } from "react-native";
const survey = require("../assets/appstore.png");
const other = require("../assets/test.png");
class Ascard extends React.Component {
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
        <Container>
          <Cover>
            <Image source={imag} />
            <Title>{name}</Title>
            <Author>by Khdimaty</Author>
          </Cover>
          <Text>testing app card for you by khdimaty</Text>
        </Container>
      </TouchableHighlight>
    );
  }
}

export default Ascard;

const Container = styled.View`
  width: 350px;
  height: 380px;
  margin: auto;
  margin-bottom: 25px;
  border-radius: 14px;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
`;

const Cover = styled.View`
  height: 290px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 290px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 30px;
  font-weight: Bold;
  color: white;
  width: 300px;
  font-family: Impact;
`;

const Author = styled.Text`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;

  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin: 20px;
  line-height: 24px;
  color: #3c4560;
`;
