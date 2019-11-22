import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight
} from "react-native";
import { Icon } from "react-native-elements";
import Ascard from "./appstorecard";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
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

export default function Rewards(props) {
  const { loading, error, data, refetch } = useQuery(getRewards, {
    fetchPolicy: "no-cache"
  });
  if (data) {
    //console.log(data.user.score);
  }
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <View
          style={{
            margin: 20,

            flexDirection: "row"
          }}
        >
          <Icon
            style={{ flex: 0.2 }}
            name="close"
            onPress={() => props.navigation.goBack()}
            size={40}
          />
        </View>
        <View style={styles.info}>
          <View style={styles.statsContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              Score :{" "}
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
            Rewards{" "}
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
                    name={reward.url}
                    rewardid={reward.id}
                    refetch={() => refetch()}
                  />

                  <View style={styles.separator} />
                </React.Fragment>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },

  user: {
    flex: 0.3,
    backgroundColor: "#fff",
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    shadowRadius: 30,
    shadowOpacity: 0.2,
    shadowOffset: { width: 10, height: 20 }
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
    color: "#52575D"
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
  }
});
