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
  Spinner
} from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { Query } from "@apollo/react-components";
import { gql } from "apollo-boost";
import CustomCard from "../customCard";
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
  state = { activea: 1, activeb: 0, activec: 0 };
  render() {
    let { activea, activeb, activec } = this.state;
    return (
      <Container>
        <Header>
          <Body style={{ backgroundColor: "#fff" }}>
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
        <LinearGradient colors={["#ffff", "#F0FFFF"]} style={styles.Tabs}>
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
        </LinearGradient>

        <Query query={Tasks}>
          {({ loading, error, data }) => {
            if (loading) return <Spinner color="blue" />;
            if (error) return <Text>`Error! ${error.message}`</Text>;

            return (
              <Content
                style={{
                  backgroundColor: "#F0FFFF",
                  paddingRight: 10,
                  paddingLeft: 10
                }}
              >
                {data.tasks.map(task => (
                  <CustomCard
                    key={task.id}
                    name={task.name}
                    score={task.taskScore}
                    type={task.type}
                    navigation={this.props.navigation}
                  />
                ))}
              </Content>
            );
          }}
        </Query>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF7",
    alignItems: "center",
    justifyContent: "center"
  },
  Tabs: {
    height: 70,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    elevation: 0,
    shadowOffset: {
      height: 0,
      width: 0
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowRadius: 0
  },
  nav: {
    width: 100,
    height: 38,
    backgroundColor: "rgba(247,247,247,0)",
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
