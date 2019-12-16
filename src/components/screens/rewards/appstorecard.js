import React from "react";
import styled from "styled-components";
import { TouchableOpacity, Alert } from "react-native";

import { Dimensions } from "react-native";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
const w = Dimensions.get("window").width;
const getreward = async function(id, create, error, refetch) {
  // console.log("get");
  await create({ variables: { rewardid: id } });
  await console.log(error);
  refetch();
};

const createMyreward = gql`
  mutation createMyreward($rewardid: ID!) {
    createMyreward(
      data: {
        user: { connect: { username: "anasio" } }
        reward: { connect: { id: $rewardid } }
      }
    ) {
      id
    }
  }
`;

export default function Ascard(props) {
  //let imag = survey;
  let imag =
    props.name == "test"
      ? require("./assets/eminesreward.png")
      : require("./assets/jumiareward.png");
  //const { id} = props.rewardid;
  const [create, { data }] = useMutation(createMyreward);

  return (
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={() =>
        Alert.alert(
          "Reward name ",
          "Do you realy want to get this reward ?",
          [
            { text: "Cancel", onPress: () => console.log("Cancel Pressed!") },
            {
              text: "OK",
              onPress: () => {
                getreward(props.rewardid, create, data, props.refetch);
                //console.log(data);
                //cosnole.log(props.rewardid, create);
              }
            }
          ],
          { cancelable: false }
        )
      }
    >
      <Container style={{ flex: 1, length: 200 }}>
        <Cover style={{ flex: 0.8 }}>
          <Image source={imag} />
          <Title>{props.name}</Title>
          <Author>by Khdimaty</Author>
        </Cover>
        <Text style={{ flex: 0.2 }}>general description of the game</Text>
      </Container>
    </TouchableOpacity>
  );
}

const Container = styled.View`
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
