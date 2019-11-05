import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl
} from "react-native";
import Amplify, { Storage } from "@aws-amplify/core";
import { Container, Header, Text, Spinner } from "native-base";
import Modal from "react-native-modal";
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import { Dimensions } from "react-native";
import Ascard from "./components/appstorecard";
import Mymodal from "./components/modal";
import { ScrollView } from "react-native-gesture-handler";
import { Accordion, Badge, Button } from "native-base";
import { TouchableHighlight } from "react-native";
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
  state = { activea: 1, activeb: 0, activec: 0 };
  render() {
    let { activea, activeb, activec } = this.state;
    return (
      <Container>
        <Header style={{ backgroundColor: "#fff", alignItems: "center" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Khdimaty</Text>
        </Header>

        <View style={styles.Tabs}>
          <TouchableOpacity
            style={[styles.nav, { borderWidth: activea }]}
            onPress={() =>
              this.setState({ activea: 1, activeb: 0, activec: 0 })
            }
          >
            <Text style={styles.text}>Following</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nav, { borderWidth: activeb }]}
            onPress={() =>
              this.setState({ activea: 0, activeb: 1, activec: 0 })
            }
          >
            <Text style={styles.text}>Popular</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nav, { borderWidth: activec }]}
            onPress={() =>
              this.setState({ activea: 0, activeb: 0, activec: 1 })
            }
          >
            <Text style={styles.text}>Explore</Text>
          </TouchableOpacity>
        </View>

        <Query query={Tasks}>
          {({ loading, error, data, refetch, networkStatus }) => {
            if (loading) return <Spinner color="blue" />;
            if (error) return <Text>`Error! ${error.message}`</Text>;

            return (
              <ScrollView
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
              </ScrollView>
            );
          }}
        </Query>

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
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "#FFF"
  },
  Tabs: {
    height: 70,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 0
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
  }
});
