import React from "react";
import styled from "styled-components";

const survey = require("./assets/Jan-Blomqvist.jpg");
const other = require("./assets/Jan-Blomqvist.jpg");
import { Dimensions } from "react-native";
const w = Dimensions.get("window").width;

class Ascard extends React.Component {
  render() {
    const { name, type } = this.props;
    let imag = type == "survey" ? survey : other;
    return (
      <Container style={{ width: w - 20, length: 1.08 * (w - 20) }}>
        <Cover>
          <Image source={imag} />
          <Title>{name}</Title>
          <Author>by Khdimaty</Author>
        </Cover>
        <Text>general description of the game</Text>
      </Container>
    );
  }
}

export default Ascard;

const Container = styled.View`
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
  font-weight: bold;
  color: white;
  width: 300px;
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
