import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  Image
} from "react-native";
import { Icon } from "react-native-elements";
import { Dimensions } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
const w = Dimensions.get("window").width;
const getRewards = gql`
  {
    rewards {
      id
      url
      decription
      equivalentScore
    }
    user(where: { username: "anasio" }) {
      score
    }
  }
`;
let Comp = props => {
  return (
    <View
      style={{
        //backgroundColor: "red",

        //borderRadius: 20,
        margin: 10,
        width: 0.4 * w,
        height: 0.4 * w
      }}
    >
      <Image
        style={{
          width: 0.4 * w,
          height: 0.4 * w,
          borderRadius: 20,
          borderColor: "#fff",
          borderWidth: 5
        }}
        source={{
          uri: props.url
        }}
      />
    </View>
  );
};
export default function Vs() {
  return (
    <View style={styles.container}>
      <Comp url="https://dynamic.brandcrowd.com/asset/logo/62fdfa68-3a48-46da-9959-be64842d7c47/logo?v=4" />
      <Comp url="https://dynamic.brandcrowd.com/asset/logo/62fdfa68-3a48-46da-9959-be64842d7c47/logo?v=4" />
      <Comp url="https://dynamic.brandcrowd.com/asset/logo/62fdfa68-3a48-46da-9959-be64842d7c47/logo?v=4" />
      <Comp url="https://dynamic.brandcrowd.com/asset/logo/62fdfa68-3a48-46da-9959-be64842d7c47/logo?v=4" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    //flexDirection: "row",

    backgroundColor: "gray",

    backgroundColor: "gray",
    marginTop: 40,
    alignContent: "stretch",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around"
  }
});
