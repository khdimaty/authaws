import React from "react";
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
    tasks(orderBy: name_ASC) {
      id
      name
      taskScore
      type
      description
    }
  }
`;

const w = Dimensions.get("window").width;
export default class HomeScreen extends React.Component {
  state = {
    isModalVisible: false,
    taskname: "",
    description: "",
    type: "survey",
    refreshing: true
  };
  toTask(props) {
    //navigate to screentype task with name as element {to query task by name }
    console.log(props);
    //this.props.navigation.navigate("survey", {
    //name: props.name
    //});

    //this feature is for modal ios style to be added in ver 2
    this.toggleModal(props);
  }

  toggleModal = props => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
      taskname: props.name,
      description: props.description,
      type: props.type,
      score: props.taskScore
    });
  };
  onRefresh() {}
  state = { activea: "white", activeb: "black", activec: "black" };
  render() {
    let { activea, activeb, activec } = this.state;
    return (
      <View style={styles.container}>
        <Query query={Tasks}>
          {({ loading, error, data, refetch, networkStatus }) => {
            if (loading) return <Spinner color="blue" />;
            if (error) return <Text>`Error! ${error.message}`</Text>;

            return (
              <ScrollView
                style={{ paddingTop: 70 }}
                refreshControl={
                  <RefreshControl
                    //refresh control used for the Pull to Refresh
                    refreshing={this.state.refreshing}
                    onRefresh={() => {
                      //console.log(networkStatus);

                      refetch();
                      this.setState({
                        refreshing: false
                      });
                    }}
                  />
                }
              >
                <View style={styles.Tabs}>
                  <TouchableOpacity
                    style={[styles.nav]}
                    onPress={() =>
                      this.setState({
                        activea: "white",
                        activeb: "black",
                        activec: "black"
                      })
                    }
                  >
                    <Text style={[styles.text, { color: activea }]}>
                      Newest
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.nav]}
                    onPress={() =>
                      this.setState({
                        activea: "black",
                        activeb: "white",
                        activec: "black"
                      })
                    }
                  >
                    <Text style={[styles.text, { color: activeb }]}>
                      Popular
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.nav]}
                    onPress={() =>
                      this.setState({
                        activea: "black",
                        activeb: "black",
                        activec: "white"
                      })
                    }
                  >
                    <Text style={[styles.text, { color: activec }]}>
                      Favorite
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  {data.tasks.map(task => (
                    <TouchableHighlight
                      onPress={() => this.toTask(task)}
                      underlayColor="white"
                      key={task.id}
                    >
                      <Ascard
                        name={task.name}
                        score={task.taskScore}
                        type={task.type}
                        navigation={this.props.navigation}
                        modal={this.toggleModal}
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
            <Icon name="tram" size={35} />

            <Text style={{ fontSize: 35 }}>Khdimaty</Text>
            <Icon name="search" size={35} />
          </View>
        </BlurView>

        <Modal
          isVisible={this.state.isModalVisible}
          swipeDirection={["down"]}
          onSwipeComplete={this.toggleModal}
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "white",
            marginHorizontal: 0,
            marginTop: 50,
            marginBottom: 0
          }}
        >
          <Mymodal
            taskname={this.state.taskname}
            description={this.state.description}
            navigation={this.props.navigation}
            score={this.state.score}
            type={this.state.type}
          />
        </Modal>
      </View>
    );
  }
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
