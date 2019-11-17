import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl
} from "react-native";
//import Amplify, { Storage } from "@aws-amplify/core";
import { Container, Header, Text, Spinner } from "native-base";
import Modal from "react-native-modal";
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import { Dimensions } from "react-native";
import Ascard from "./components/appstorecard";
import Mymodal from "./components/modal";
import { ScrollView } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import { TouchableHighlight } from "react-native";
import Constants from "expo-constants";
import { Icon } from "react-native-elements";
const Tasks = gql`
  {
    tasks {
      id
      name
      taskScore
      type
      description
    }
  }
`;
export default function HomeScreen(props) {
  let inputRef = React.createRef();
  const [active, setactive] = useState({
    activea: "white",
    activeb: "black",
    activec: "black"
  });
  const [refreshing, setrefreshing] = useState(false);
  return (
    <View style={styles.container}>
      <Query query={Tasks}>
        {({ loading, error, data, refetch, networkStatus }) => {
          if (loading)
            return <Spinner style={{ marginTop: 300 }} color="blue" />;
          if (error) return <Text>`Error! ${error.message}`</Text>;

          return (
            <ScrollView
              style={{ paddingTop: 70 }}
              scrollsToTop={true}
              ref={inputRef}
              refreshControl={
                <RefreshControl
                  //refresh control used for the Pull to Refresh
                  refreshing={refreshing}
                  onRefresh={() => {
                    //console.log(networkStatus);

                    refetch();
                    setrefreshing(false);
                  }}
                />
              }
            >
              <View style={styles.Tabs}>
                <TouchableOpacity
                  style={[styles.nav]}
                  onPress={() =>
                    setactive({
                      activea: "white",
                      activeb: "black",
                      activec: "black"
                    })
                  }
                >
                  <Text style={[styles.text, { color: active.activea }]}>
                    Newest
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.nav]}
                  onPress={() =>
                    setactive({
                      activea: "black",
                      activeb: "white",
                      activec: "black"
                    })
                  }
                >
                  <Text style={[styles.text, { color: active.activeb }]}>
                    Popular
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.nav]}
                  onPress={() =>
                    setactive({
                      activea: "black",
                      activeb: "black",
                      activec: "white"
                    })
                  }
                >
                  <Text style={[styles.text, { color: active.activec }]}>
                    Favorite
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                {data.tasks.map(task => (
                  <TouchableHighlight
                    onPress={() =>
                      props.navigation.navigate("MyModal", {
                        taskinfo: task
                      })
                    }
                    underlayColor="white"
                    key={task.id}
                  >
                    <Ascard
                      name={task.name}
                      score={task.taskScore}
                      type={task.type}
                      navigation={props.navigation}
                    />
                  </TouchableHighlight>
                ))}
              </View>
            </ScrollView>
          );
        }}
      </Query>
      <BlurView tint="default" intensity={100} style={styles.static}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => inputRef.current.scrollTo({ animated: true }, 0)}
          >
            <Icon name="tram" size={35} />
          </TouchableOpacity>
          <Text style={{ fontSize: 35 }}>Khdimaty</Text>
          <Icon name="search" size={35} />
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "#ee1",

    // marginTop: 15
  },
  static: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "#fff"
  },
  header: {
    alignItems: "center",
    //backgroundColor: "#ee9",
    marginTop: 20,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  Tabs: {
    height: 70,
    backgroundColor: "#3c3c3c",

    marginHorizontal: 15,
    marginVertical: 30,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 30
  },
  nav: {
    width: 100,
    height: 38,

    alignSelf: "center",
    opacity: 1,
    borderRadius: 5,
    borderColor: "#000",

    justifyContent: "center"
  },
  text: {
    color: "#000",
    alignSelf: "center"
  },
  notBlurred: {
    ...StyleSheet.absoluteFill,
    top: Constants.statusBarHeight
  }
});
