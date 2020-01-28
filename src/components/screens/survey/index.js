import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Spinner } from "native-base";
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import Survey from "./survey";
import Vscode from "./vscode";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
const GetTask = gql`
  query task($name: String!) {
    task(where: { name: $name }) {
      id
      questions {
        isMultiple
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
  state = {
    isReady: false
  };
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([require("./bg.png")]);

    await Promise.all([...imageAssets]);
  }
  render() {
    const name = this.props.navigation.getParam("name", "NO-name");

    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <View style={styles.container}>
        <Image source={require("./bg.png")} style={styles.Images} />
        <Query
          query={GetTask}
          variables={{
            name: name
          }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return <Spinner color="white" style={{ marginTop: 100 }} />;
            if (error) return <Text>{error}</Text>;

            return (
              <>
                {data.task.type == "survey" ? (
                  <Survey
                    data={data.task.questions}
                    taskname={name}
                    taskid={data.task.id}
                    navigation={this.props.navigation}
                  />
                ) : (
                  <Vscode
                    data={data.task.questions}
                    taskname={name}
                    taskid={data.task.id}
                    navigation={this.props.navigation}
                  />
                )}
              </>
            );
          }}
        </Query>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1

    //alignItems: "center"
  },
  Images: {
    position: "absolute",
    alignSelf: "stretch",
    height: "100%"
  }
});
