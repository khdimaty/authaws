import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl,
  Image,
  AsyncStorage
} from "react-native";
//import Amplify, { Storage } from "@aws-amplify/core";
import { Text, Spinner } from "native-base";

import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";

import Ascard from "./components/appstorecard";
import Xdcard from "./components/xdcard";
import Cards from "./components/cards";

import { ScrollView } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import { TouchableHighlight, TouchableWithoutFeedback } from "react-native";
import Constants from "expo-constants";
import { Icon } from "native-base";
//import { Icon } from "react-native-elements";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";
const Tasks = gql`
  {
    tasks(orderBy: createdAt_DESC) {
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
  const [value, setvalue] = useState("Newest");
  const [dis, setdis] = useState([]);
  useEffect(() => {
    // Create an scoped async function in the hook
    async function loaddisabled() {
      const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
      };
      const value = await AsyncStorage.getItem("dis");
      let final = JSON.parse(value).filter(onlyUnique);
      console.log(final);
      setdis(final);
    }
    // Execute the created function directly
    loaddisabled();
  }, []);
  const [refreshing, setrefreshing] = useState(false);
  //console.log(disabled);
  return (
    <View style={styles.container}>
      <Query query={Tasks} fetchPolicy={"cache-and-network"}>
        {({ loading, error, data, refetch, networkStatus }) => {
          if (loading)
            return (
              <View>
                <View style={styles.Tabs}>
                  {["Newest", "Popular", "Favorite"].map(elem => {
                    let added =
                      value === elem
                        ? {
                            color: "#fff"
                          }
                        : {};
                    return (
                      <TouchableWithoutFeedback
                        style={[styles.nav]}
                        key={elem}
                        onPress={() => {
                          setvalue(elem);
                        }}
                      >
                        <Text style={[styles.text, added]}>{elem}</Text>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </View>
                <Spinner style={{ marginTop: 300 }} color="blue" />
              </View>
            );
          if (error) return <Text>`Error! ${error.message}`</Text>;

          return (
            <ScrollView
              style={{ backgroundColor: "#fff" }}
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
                    //console.log("refetch");
                  }}
                />
              }
            >
              <View style={styles.Tabs}>
                {["Newest", "Popular", "Favorite"].map(elem => {
                  let added =
                    value === elem
                      ? {
                          color: "#E2A829"
                        }
                      : {};
                  return (
                    <TouchableWithoutFeedback
                      style={[styles.nav]}
                      key={elem}
                      onPress={() => {
                        setvalue(elem);
                      }}
                    >
                      <Text style={[styles.text, added]}>{elem}</Text>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>

              <Cards
                tasks={data}
                tobedisabl={dis}
                navigation={props.navigation}
              />
            </ScrollView>
          );
        }}
      </Query>
      <BlurView tint="default" intensity={100} style={styles.static}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => inputRef.current.scrollTo({ animated: true }, 0)}
          >
            <Icon name="home" size={35} />
          </TouchableOpacity>
          <Text style={{ fontSize: 35 }}>Khdimaty</Text>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("Rewards")}
          >
            <Icon name="gift" size={35} />
          </TouchableOpacity>
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
    top: 0
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
    backgroundColor: "#1D7B9D",

    marginHorizontal: 15,
    marginTop: 120,
    marginBottom: 30,
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
    alignSelf: "center",
    color: "#fff",
    fontSize: 20
  },
  notBlurred: {
    ...StyleSheet.absoluteFill,
    top: Constants.statusBarHeight
  }
});
