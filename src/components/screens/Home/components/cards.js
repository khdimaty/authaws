import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  Button,
  shadowStyle,
  TouchableHighlight,
  TouchableWithoutFeedback
} from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";
import { Dimensions } from "react-native";
const w = Dimensions.get("window").width;
const survey = require("../assets/appstore.png");
const other = require("../assets/test.png");
export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentWillMount() {
    //console.log(this.props.tasks);
    this.setState({ data: this.props.tasks.tasks });
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.state.data}
          keyExtractor={item => {
            return item.id;
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          renderItem={post => {
            const item = post.item;
            return (
              <TouchableWithoutFeedback
                onPress={() =>
                  this.props.navigation.navigate("MyModal", {
                    taskinfo: item
                  })
                }
              >
                <View style={styles.card}>
                  <View style={styles.shadowStyle}>
                    <Image
                      style={styles.cardImage}
                      source={item.type === "survey" ? survey : other}
                    />
                    <View style={styles.cardContent}>
                      <View>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.time}>By khdimaty</Text>
                      </View>

                      <View style={styles.cardFooter}>
                        <View style={styles.socialBarContainer}>
                          <View style={styles.bar}>
                            <View style={styles.icons}>
                              <View style={styles.like}>
                                <AntDesign
                                  name="hearto"
                                  size={22}
                                  color="#131B61"
                                />
                                <Text
                                  style={[styles.text, { color: "#131B61" }]}
                                >
                                  {" "}
                                  105.2K{" "}
                                </Text>
                              </View>
                              <View style={styles.like}>
                                <MaterialCommunityIcons
                                  name="comment-processing-outline"
                                  size={22}
                                  color="grey"
                                />
                                <Text style={[styles.text, { color: "gray" }]}>
                                  {" "}
                                  220{" "}
                                </Text>
                              </View>
                              <View style={styles.like}>
                                <MaterialCommunityIcons
                                  name="share-variant"
                                  size={22}
                                  color="grey"
                                />
                                <Text style={[styles.text, { color: "gray" }]}>
                                  {" "}
                                  32{" "}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50
  },
  list: {
    backgroundColor: "#fff"
  },
  separator: {
    marginTop: 80
  },
  /******** card **************/
  card: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#DCDCDC",
    backgroundColor: "#DCDCDC",
    width: w - 30,
    alignSelf: "center"
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
    //overlay efect
    flex: 1,
    height: 235.5,
    width: null,
    position: "absolute",
    zIndex: 100,
    left: 0,
    right: 0,
    backgroundColor: "transparent"
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 0,
    paddingVertical: 7.5,
    paddingHorizontal: 0
  },
  cardImage: {
    flex: 1,
    height: 235.5,
    width: w - 30,
    borderRadius: 40
  },
  /******** card components **************/
  title: {
    fontSize: 22,
    color: "#FFFFFF",
    marginTop: 20,
    fontWeight: "bold"
  },
  time: {
    fontSize: 13,
    color: "#FFFFFF",
    marginTop: 10
  },
  icon: {
    width: 25,
    height: 25,
    backgroundColor: "#0F3C6E",
    color: "#0F3C6E"
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    flex: 1
  },

  shadowStyle: {
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowColor: "gray",
    shadowOffset: { width: 0, height: 0 }
  },
  bar: {
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginTop: 100,
    flex: 1,
    flexDirection: "column",
    marginLeft: 5
  },
  icons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  text: {
    fontSize: 15,
    fontWeight: "bold"
  },
  like: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  }
});
