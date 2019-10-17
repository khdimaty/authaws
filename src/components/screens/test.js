import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "native-base";
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
const Users = gql`
  {
    users {
      id
      username
    }
  }
`;
export default class TestScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>test</Text>
        <Text>
          {" "}
          itemId:{" "}
          {JSON.stringify(this.props.navigation.getParam("itemId", "NO-ID"))}
        </Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate("Profile", {
              toto: 1
            });
          }}
        >
          <Text>go to test</Text>
        </Button>
        <Query query={Users}>
          {({ loading, error, data }) => {
            if (loading) return <Text>Loading...</Text>;
            if (error) return <Text>Error :(</Text>;

            return data.users.map(({ id, username }) => (
              <View key={id}>
                <Text>
                  {id}: {username}
                </Text>
              </View>
            ));
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
