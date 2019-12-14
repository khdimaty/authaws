import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";
import { Button } from "native-base";

import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";
import { Dimensions } from "react-native";

const w = Dimensions.get("window").width;
const createMytask = gql`
  mutation createMytask($taskid: ID!, $metadata: String!) {
    createMytask(
      data: {
        user: { connect: { username: "anasio" } }
        task: { connect: { id: $taskid } }
        metadata: $metadata
      }
    ) {
      id
    }
  }
`;
let Comp = props => {
  return (
    <View
      style={{
        //backgroundColor: "red",

        // borderRadius: 20,
        margin: 10
      }}
    >
      <Image
        style={[
          {
            padding: 10,
            width: 0.4 * w,
            height: 0.4 * w,
            borderRadius: 20,
            borderColor: "#fff",
            borderWidth: 5
          },
          props.added
        ]}
        source={{
          uri: props.url
        }}
      />
    </View>
  );
};
export default class Vscode extends React.Component {
  state = {
    questionNumber: 0,
    taskquestionCount: this.props.data.length - 1,
    value: null,
    metadata: {},
    press: false,
    optionText: ""
  };
  async click(mutation) {
    //let quest = this.state.questionNumber;
    let name = this.props.taskname;
    await this.setState((prevState, props) => {
      return {
        metadata: {
          ...prevState.metadata,
          ...{ [prevState.questionNumber]: prevState.resp }
        }
      };
    });

    if (this.state.questionNumber == this.state.taskquestionCount) {
      // console.log(JSON.stringify(this.state.metadata));
      await mutation({
        variables: {
          metadata: JSON.stringify(this.state.metadata),
          taskid: this.props.taskid
        }
      });
      // createmy task will update if my task with userid and name exist
      //await AsyncStorage.setItem("dis", name);
      //const list = JSON.stringify(somearray)

      let mydisstr = await AsyncStorage.getItem("dis");
      let mydisst = mydisstr ? mydisstr : [];
      let mydisprev = JSON.parse(mydisst);
      let mydis = [...mydisprev, name];
      await AsyncStorage.setItem("dis", JSON.stringify(mydis));
      //console.log(mydis);
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
    //console.log(this.props.data);
    return (
      <View style={styles.container}>
        <Image source={require("./bg.png")} style={styles.Images}></Image>
        <View style={styles.info}>
          <Text style={styles.header}>
            Question {this.state.questionNumber + 1}/{this.props.data.length}
          </Text>
        </View>
        <View style={styles.lines} />

        <View style={styles.question}>
          <Text style={styles.text}>{questionText}</Text>
        </View>
        <View style={styles.vs}>
          {options.map(({ id, optionText }) => {
            let added =
              this.state.value === id
                ? {
                    borderColor: "#000000"
                    //borderWidth: 3
                    //shadowOpacity: 1
                  }
                : {};
            return (
              <TouchableOpacity
                key={id}
                onPress={() => {
                  this.setState({ value: id, press: true, resp: optionText });
                  // console.log(this.state.optionText);
                }}
              >
                <Comp added={added} url={optionText} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.buttons}>
          {this.state.press && (
            <Mutation mutation={createMytask}>
              {(createMytask, { data }) => (
                <Button
                  onPress={() => this.click(createMytask)}
                  style={{ backgroundColor: "#0033EE" }}
                >
                  <Text
                    style={{ marginLeft: 50, marginRight: 50, color: "#fff" }}
                  >
                    {this.state.taskquestionCount == this.state.questionNumber
                      ? "finish"
                      : "Next"}
                  </Text>
                </Button>
              )}
            </Mutation>
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
    paddingTop: 50
    // backgroundColor: "black"
  },
  question: {
    flex: 0.1,
    //width: 318,
    //backgroundColor: "rgba(240,240,240,1)",
    //marginBottom: 10,
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
  vs: {
    flex: 0.7,
    //flexDirection: "row",

    // backgroundColor: "gray",

    // backgroundColor: "gray",
    //marginTop: 40,
    alignContent: "stretch",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around"
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
    height: "100%",
    width: "100%"
  }
});
//#E2A829
//#3D5C71
