import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TouchableOpacity, Alert } from "react-native";

import { Dimensions } from "react-native";

import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import Auth from "@aws-amplify/auth";
const w = Dimensions.get("window").width;
const getreward = async function(id, username, create, error, refetch) {
  // console.log("get");
  await create({ variables: { rewardid: id, username: username } });
  await console.log(error);
  refetch();
};

const createMyreward = gql`
  mutation createMyreward($rewardid: ID!, $username: String!) {
    createMyreward(
      data: {
        user: { connect: { username: $username } }
        reward: { connect: { id: $rewardid } }
      }
    ) {
      id
    }
  }
`;

export default function Ascard(props) {
  //let imag = survey;
  const [username, setusername] = useState("");
  useEffect(() => {
    // Create an scoped async function in the hook
    async function loadUsername() {
      await Auth.currentAuthenticatedUser().then(user => {
        setusername(user.signInUserSession.accessToken.payload.username);
      });
    }
    // Execute the created function directly
    loadUsername();
  }, []);
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
          props.name,
          "Étes-vous sûr ?",
          [
            { text: "Non", onPress: () => console.log("Cancel Pressed!") },
            {
              text: "Oui",
              onPress: () => {
                getreward(
                  props.rewardid,
                  username,
                  create,
                  data,
                  props.refetch
                );
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
          <Author>Par Khdimaty</Author>
        </Cover>
        <Text style={{ flex: 0.2, paddingRight: 45, fontSize: 20 }}>
          Score équivalent :{" "}
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{props.scr}</Text>{" "}
        </Text>
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
