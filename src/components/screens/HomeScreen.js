import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "native-base";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate("test", {
              itemId: 86
            });
          }}
        >
          <Text>go to test</Text>
        </Button>
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
