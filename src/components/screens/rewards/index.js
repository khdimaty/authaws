import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Clipboard,
  Alert
} from "react-native";

import Modal from "react-native-modal";
const w = Dimensions.get("window").width;
import Auth from "@aws-amplify/auth";
import { Icon } from "react-native-elements";
import Ascard from "./appstorecard";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Platform } from "react-native";
import { StatusBar } from "react-native";

const getRewards = gql`
  query rewards($username: String!) {
    rewards(where: { published: true }) {
      id
      url
      decription
      equivalentScore
      Owner
    }
    user(where: { username: $username }) {
      score
      myrewards {
        reward {
          url
        }
      }
    }
  }
`;

export default function Rewards(props) {
  const [username, setusername] = useState("");
  const [vis, setvis] = useState(false);

  const copy = url => {
    Clipboard.setString(url);
    Alert.alert("Copié", "Votre code est copié dans la presse papier !");
  };
  useEffect(() => {
    // Create an scoped async function in the hook
    async function loadUsername() {
      await Auth.currentAuthenticatedUser().then(user => {
        setusername(user.signInUserSession.accessToken.payload.username);
      });
    }
    // Execute the created function directly
    loadUsername();
  }, []);
  const { loading, error, data, refetch } = useQuery(getRewards, {
    variables: { username: username },
    fetchPolicy: "no-cache"
  });
  if (data) {
  }
  //console.log(w);
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View
          style={{
            flexDirection: "row",
            flex: 0.3,

            paddingTop: 25
          }}
        >
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Icon name="close" size={40} style={{ marginLeft: 10 }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton]}
            onPress={() => setvis(true)}
          >
            <Text style={styles.submitButtonText}> Mes Recompenses</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.info}>
          <View style={styles.statsContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              <Text style={{ fontWeight: "bold" }}>
                {" "}
                {data ? data.user.score : ""}
              </Text>{" "}
              pts
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.rewards}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 15,
            marginBottom: 20,

            alignContent: "space-between"
          }}
        >
          <Text
            style={{
              marginLeft: 15,
              fontSize: 30,
              fontWeight: "bold"
            }}
          >
            Récompenses{" "}
          </Text>
        </View>
        {loading ? (
          <Text>loading .... </Text>
        ) : (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {data.rewards.map(reward => {
              // console.log(reward.id);
              return (
                <React.Fragment key={reward.id}>
                  <View style={styles.separator} />

                  <Ascard
                    name={reward.Owner}
                    rewardid={reward.id}
                    scr={reward.equivalentScore}
                    refetch={() => refetch()}
                  />

                  <View style={styles.separator} />
                </React.Fragment>
              );
            })}
          </ScrollView>
        )}
      </View>
      {data ? (
        <Modal isVisible={vis}>
          <View
            style={{
              backgroundColor: "#fff",
              alignContent: "center",
              alignItems: "center"
            }}
          >
            {data.user.myrewards.map(reward => {
              // console.log(reward);
              return (
                <View key={reward.reward.url}>
                  <TouchableOpacity onPress={() => copy(reward.reward.url)}>
                    <Text style={{ margin: 10 }}>{reward.reward.url}</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      height: 10,
                      backgroundColor: "black",
                      width: "100%"
                    }}
                  />
                </View>
              );
            })}
            <TouchableOpacity
              style={[styles.submit]}
              onPress={() => setvis(false)}
            >
              <Text style={styles.submitText}> Fermer</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      ) : (
        <></>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
  },

  user: {
    flex: 0.3,
    // elevation: 7,
    backgroundColor: "rgba(29,123,157,1)",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    shadowRadius: 30,
    shadowOpacity: 0.8,
    shadowOffset: { width: 10, height: 20 },
    shadowColor: "#E2A829"
  },
  rewards: { flex: 0.7 },
  header: {
    //backgroundColor: "green",
    flex: 0.2,

    // flexDirection: "row-reverse",
    // alignContent: "space-between",

    alignContent: "center",
    //backgroundColor: "#ee9",
    marginTop: 20,
    padding: 15
  },
  info: { flex: 0.7 },

  text: {
    color: "#E2A829"
  },
  separator: {
    width: 10
    //backgroundColor: "rgba(0,0,0,0.5)"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 10
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
  },
  statbox: {
    alignItems: "center",
    flex: 1
  },
  Box: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 5,
    margin: 5
  },
  infospers: {
    fontSize: 16,
    color: "#DFD8C8",
    fontWeight: "500",
    margin: 10,
    marginTop: 20
  },
  infos: {
    fontSize: 16,
    color: "#DFD8C8",
    fontWeight: "500",
    margin: 5,
    marginTop: 20
  },
  interets: {
    marginHorizontal: 10
  },
  badgeText: {
    fontSize: 25,
    paddingHorizontal: 5,
    fontFamily: "bold"
  },
  submitButton: {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    //  margin: 30,
    height: 40,
    //width: "80%",
    borderColor: "white",
    marginLeft: w > 330 ? 150 : 120,
    marginRight: 40
  },
  submit: {
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    alignContent: "center",
    alignItems: "center",
    margin: 20,
    height: 40,
    width: "50%",
    borderColor: "#000"
  },
  submitButtonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white"
  },
  submitText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black"
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0
  }
});
