import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Text,
  Body,
  Title,
  Spinner,
  Button
} from "native-base";
import Modal from "react-native-modal";
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";

import Ascard from "./components/appstorecard";
import { ScrollView } from "react-native-gesture-handler";
const Tasks = gql`
  {
    tasks {
      id
      name
      taskScore
      type
    }
  }
`;

export default class HomeScreen extends React.Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  state = { activea: 1, activeb: 0, activec: 0 };
  render() {
    let { activea, activeb, activec } = this.state;
    return (
      <Container>
        <Header style={{ backgroundColor: "#fff" }}>
          <Body>
            <Title
              style={{
                fontSize: 30,
                color: "#000"
              }}
            >
              Khdimaty
            </Title>
          </Body>
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
        <ScrollView>
          <Query query={Tasks}>
            {({ loading, error, data }) => {
              if (loading) return <Spinner color="blue" />;
              if (error) return <Text>`Error! ${error.message}`</Text>;

              return (
                <View>
                  {data.tasks.map(task => (
                    <Ascard
                      key={task.id}
                      name={task.name}
                      score={task.taskScore}
                      type={task.type}
                      navigation={this.props.navigation}
                      modal={this.toggleModal}
                    />
                  ))}
                </View>
              );
            }}
          </Query>
        </ScrollView>

        <Modal
          isVisible={this.state.isModalVisible}
          swipeDirection={["down"]}
          onSwipeComplete={this.toggleModal}
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            backgroundColor: "red",
            marginHorizontal: 0,
            marginTop: 50,
            marginBottom: 0
          }}
          coverScreen
        >
          <View style={{ flex: 1 }}></View>
        </Modal>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: "#FFFFFF"
  },
  Tabs: {
    height: 70,
    backgroundColor: "transparent",

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
