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
      type
    }
  }
`;
export default class Surveyscreen extends React.Component {
  render() {
    const name = this.props.navigation.getParam("name", "NO-name");

    //console.log(this.props.navigation.getParam("name", "NO-name"));
    return (
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
            <>
              <Survey
                data={data.task.questions}
                taskname={name}
                navigation={this.props.navigation}
              />
            </>
          );
        }}
      </Query>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center"
  }
});
