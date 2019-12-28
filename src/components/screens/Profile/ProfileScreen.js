import React from "react";
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  Animated
} from "react-native";
import Auth from "@aws-amplify/auth";
import Profile from "./profile";
import { gql } from "apollo-boost";
import { Container, Header, Body, Title } from "native-base";
import { Query } from "@apollo/react-components";
const GetUser = gql`
  query userinfo($username: String!) {
    user(where: { username: $username }) {
      score
      mytasks {
        id
      }

      myrewards {
        reward {
          url
        }
      }
    }
  }
`;
export default class ProfileScreen extends React.Component {
  state = { username: "" };
  componentDidMount = async () => {
    await this.getusername();
    //use this to query user info
  };
  // Remember logged in users
  getusername = async () => {
    await Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({
          username: user.username
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    console.log(this.state.username);
    return (
      <Container style={{ marginTop: 15 }}>
        <Header
          style={{
            backgroundColor: "#fff",
            alignItems: "center",
            height: 70
          }}
        >
          <Text
            style={{
              fontSize: 30,

              fontWeight: "bold",
              color: "#E2A829",
              marginBottom: 10,
              marginLeft: 5
            }}
          >
            Khdimaty
          </Text>
        </Header>
        <Query
          fetchPolicy={"cache-and-network"}
          query={GetUser}
          variables={{
            username: this.state.username
          }}
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <Profile
                  username={this.state.username}
                  age={""}
                  sex={""}
                  statut={""}
                  local={""}
                  level={""}
                  score={""}
                  mytaskCount={""}
                  interests={[]}
                  myrewards={[]}
                />
              );
            if (error) return <Text>{error}</Text>;

            return (
              <>
                <Profile
                  username={this.state.username}
                  age={this.state.username == "khdimaty" ? 20 : ""}
                  sex={"coders xd"}
                  statut={
                    this.state.username == "khdimaty" ? "Dreamers" : "Testeur"
                  }
                  local={"Bengherir,Maroc"}
                  level={parseInt(data.user.mytasks.length / 10)}
                  score={data.user.score}
                  mytaskCount={data.user.mytasks.length}
                  interests={[]}
                  myrewards={data.user.myrewards.map(
                    reward => reward.reward.url
                  )}
                />
              </>
            );
          }}
        </Query>
      </Container>
    );
  }
}
