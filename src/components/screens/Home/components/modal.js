import React, { useState, useEffect } from "react";
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
import { StatusBar } from "react-native";
import { Platform } from "react-native";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
const survey = require("../assets/sur05.png");
const other = require("../assets/vs03.png");
import get from "lodash/get";
const w = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Accordion, Badge, Button } from "native-base";
import Auth from "@aws-amplify/auth";
// query : vote by user name and task name

const votes = gql`
  query votes($where: VoteWhereUniqueInput) {
    votes(where: $where) {
      id
    }
  }
`;

const createVote = gql`
  mutation createVote($username: String!, $taskId: ID!) {
    createVote(
      data: {
        user: { connect: { username: $username } }
        link: { connect: { id: $taskId } }
      }
    ) {
      id
    }
  }
`;

const deleteVote = gql`
  mutation deleteVote($voteId: ID!) {
    deleteVote(where: { id: $voteId }) {
      id
    }
  }
`;

export default function Mymodal(props) {
  const [create, { data }] = useMutation(createVote);
  const [deleteVot, { datadeleted }] = useMutation(deleteVote);
  const [username, setusername] = useState("");
  const [voteId, setVoteId] = useState("");
  // console.log(get(data, "createVote.id", ""));

  let {
    id,
    name,
    description,
    type,
    taskScore,
    votes
  } = props.navigation.getParam("taskinfo", "null");

  useEffect(() => {
    setVoteId(get(data, "createVote.id", []));
  }, [data]);

  [color, setcolor] = useState("white");
  useEffect(() => {
    async function loadUsername() {
      await Auth.currentAuthenticatedUser().then(user => {
        setusername(user.signInUserSession.accessToken.payload.username);
        //
      });
    }
    // Execute the created function directly
    loadUsername();
  }, []);
  useEffect(() => {
    setcolor(
      votes.map(vote => vote.user.username).includes(username)
        ? "#E2A829"
        : "white"
    );
    votes.map(vote => {
      if (vote.user.username == username) {
        setVoteId(vote.id);
      }
    });
  }, [username]);
  const dataArray = [
    {
      title: name,
      content: description
    }
  ];
  console.log(props.navigation.getParam("taskinfo", "null"));
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
              onPress={() => {
                //create({ variables: { username: "anasio", taskId: id } });
                setcolor(color == "white" ? "#E2A829" : "white");
                color == "white"
                  ? create({ variables: { username: username, taskId: id } })
                  : deleteVot({ variables: { voteId: voteId } });
              }}
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
    marginTop: Platform.OS === "ios" ? 90 : StatusBar.currentHeight,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden"
  }
});
