import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "native-base";
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import Survey from "./survey";
import Starter from "./starter";

const GetTask = gql`
  query task($name: String!) {
    task(where: { name: $name }) {
      questions {
        questionText
        options {
          id
          optionText
        }
      }
      description
    }
  }
`;
export default class Surveyscreen extends React.Component {
  // better use query to have data then wrap survey comp
  state = { isfirst: true };
  start() {
    this.setState({
      isfirst: false
    });
  }
  render() {
    const name = this.props.navigation.getParam("name", "NO-name");
    console.log(this.state.isfirst);
    //console.log(this.props.navigation.getParam("name", "NO-name"));
    return (
      <View style={styles.container}>
        <Query
          query={GetTask}
          variables={{
            name: name
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>;
            if (error) return <Text>{error}</Text>;

            return (
              <View>
                {this.state.isfirst ? (
                  <Starter
                    start={this.start.bind(this)}
                    taskname={name}
                    description={data.task.description}
                  />
                ) : (
                  <Survey
                    data={data.task.questions}
                    taskname={name}
                    navigation={this.props.navigation}
                  />
                )}
              </View>
            );
          }}
        </Query>
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
