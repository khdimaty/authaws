import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  AsyncStorage,
  ScrollView
} from "react-native";
import { Button } from "native-base";
import Auth from "@aws-amplify/auth";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";

const createMytask = gql`
  mutation createMytask($username: String!, $taskid: ID!, $metadata: String!) {
    createMytask(
      data: {
        user: { connect: { username: $username } }
        task: { connect: { id: $taskid } }
        metadata: $metadata
      }
    ) {
      id
    }
  }
`;
export default class Survey extends React.Component {
  state = {
    questionNumber: 0,
    taskquestionCount: this.props.data.length - 1,
    value: null,
    valueList: [],
    resp: "",
    resplist: [],
    metadata: {},
    press: false,
    optionText: "",
    userName: ""
  };
  componentDidMount = async () => {
    await this.loadUsername();
  };
  // Remember logged in users
  loadUsername = async () => {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          userName: user.signInUserSession.accessToken.payload.username
        });
      })
      .catch(err => console.log(err));
  };

  async click(mutation, isMultiple) {
    //let quest = this.state.questionNumber;
    let name = this.props.taskname;

    await this.setState((prevState, props) => {
      return {
        metadata: {
          ...prevState.metadata,
          ...{
            [prevState.questionNumber]: isMultiple
              ? prevState.resplist
              : prevState.resp
          }
        }
      };
    });

    if (this.state.questionNumber == this.state.taskquestionCount) {
      // console.log(JSON.stringify(this.state.metadata));
      await mutation({
        variables: {
          username: this.state.userName,
          metadata: JSON.stringify(this.state.metadata),
          taskid: this.props.taskid
        }
      });
      // diable task
      let mydisstr = await AsyncStorage.getItem(
        "dis".concat(this.state.userName)
      );
      let mydisst = mydisstr ? mydisstr : "[]";
      let mydisprev = JSON.parse(mydisst);
      let mydis = [...mydisprev, name];
      await AsyncStorage.setItem(
        "dis".concat(this.state.userName),
        JSON.stringify(mydis)
      );
      console.log(mydis);
      // createmy task will update if my task with userid and name exist
      this.props.navigation.navigate("Home", { taskdis: name });
    } else {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
        press: false
      });
    }
  }
  render() {
    let { questionText, options, isMultiple } = this.props.data[
      this.state.questionNumber
    ];
    console.log(isMultiple);
    return (
      <>
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
          {isMultiple ? (
            <ScrollView>
              {options.map(({ id, optionText }) => {
                let added = this.state.valueList.includes(id)
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
                      this.state.valueList.includes(id)
                        ? this.setState({
                            // valueList: [...this.state.valueList, id],
                            press: true,
                            resplist: [...this.state.resplist, optionText],
                            valueList: this.state.valueList.filter(
                              value => value !== id
                            ),
                            resplist: this.state.resplist.filter(
                              value => value !== optionText
                            )
                          })
                        : this.setState({
                            valueList: [...this.state.valueList, id],
                            press: true,
                            resplist: [...this.state.resplist, optionText]
                          });
                      // console.log(this.state.optionText);
                    }}
                  >
                    <View style={[styles.Rsp1, added]}>
                      <Text style={[styles.text_]}>{optionText}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <ScrollView>
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
                      this.setState({
                        value: id,
                        press: true,
                        resp: optionText
                      });
                      // console.log(this.state.optionText);
                    }}
                  >
                    <View style={[styles.Rsp1, added]}>
                      <Text style={[styles.text_]}>{optionText}</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
        </View>

        <View style={styles.buttons}>
          {this.state.press && (
            <Mutation mutation={createMytask}>
              {(createMytask, { data }) => (
                <Button
                  onPress={() => this.click(createMytask, isMultiple)}
                  style={{ backgroundColor: "#E2A829" }}
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
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
    //marginBottom: 10,
    // backgroundColor: "#FFF"

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
    marginRight: 5,
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
    height: 3,
    backgroundColor: "#E2A829",
    marginTop: 2,
    marginLeft: 10
  },
  header: {
    fontFamily: "HelveticaNeue",
    color: "#fff",
    // marginTop: 90,
    fontSize: 28,
    marginLeft: 15
    // alignSelf: "center"
  },
  Rsp1: {
    color: "#000",
    //height: 52,
    width: "90%",

    borderColor: "#E2A829",
    borderWidth: 3,
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
    marginTop: 10,
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
