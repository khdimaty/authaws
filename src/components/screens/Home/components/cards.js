import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  Share
} from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome
} from "@expo/vector-icons";

import { Dimensions } from "react-native";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
const w = Dimensions.get("window").width;

export default class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isReady: false
    };
  }
  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require("../assets/sur05.png"),
      require("../assets/vs03.png")
    ]);

    await Promise.all([...imageAssets]);
  }
  share() {
    //console.log("test");
    Share.share(
      {
        message: "use our app ",
        url:
          "https://play.google.com/store/apps/details?id=com.khdimatyApp.khdimatyApp",
        title: "Khdimaty"
      },
      {
        // Android only:
        dialogTitle: "Share our app ",
        // iOS only:
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"]
      }
    );
  }
  componentWillMount() {
    //console.log(this.props.tasks);
    this.setState({ data: this.props.tasks.tasks });
  }
  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
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
            //item.name varification conditional return
            const bgcol = this.props.tobedisabl.includes(item.name)
              ? "grey"
              : "#fff";
            let gold = this.props.tobedisabl.includes(item.name)
              ? "#fff"
              : "#E2A829";
            let blue = this.props.tobedisabl.includes(item.name)
              ? "#fff"
              : "#1D7B9D";
            return (
              <TouchableWithoutFeedback
                disabled={this.props.tobedisabl.includes(item.name)}
                onPress={() =>
                  this.props.navigation.navigate("MyModal", {
                    taskinfo: item,
                    username: this.props.username
                  })
                }
              >
                <View style={styles.card}>
                  <View style={styles.shadowStyle}>
                    <Image
                      style={styles.cardImage}
                      source={
                        item.type === "survey"
                          ? require("../assets/sur05.png")
                          : require("../assets/vs03.png")
                      }
                    />
                    <View style={styles.cardContent}>
                      <View>
                        <Text style={styles.title}>{item.name}</Text>
                        <Text style={styles.time}>Par {item.Owner}</Text>
                      </View>

                      <View style={styles.cardFooter}>
                        <View style={styles.socialBarContainer}>
                          <View
                            style={[styles.bar, { backgroundColor: bgcol }]}
                          >
                            <View style={styles.icons}>
                              <View style={styles.like}>
                                <AntDesign
                                  name="hearto"
                                  size={25}
                                  color={blue}
                                />
                                <Text
                                  style={[
                                    styles.text,
                                    { marginLeft: 10, color: blue }
                                  ]}
                                >
                                  {item.votes.length}
                                </Text>
                              </View>
                              <View style={styles.like}>
                                <Text
                                  style={[styles.text, { color: blue }]}
                                ></Text>
                              </View>

                              <TouchableWithoutFeedback
                                onPress={() => this.share()}
                              >
                                <View style={styles.like}>
                                  <MaterialCommunityIcons
                                    name="share-variant"
                                    size={25}
                                    color={gold}
                                  />
                                </View>
                              </TouchableWithoutFeedback>
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
    marginTop: 52
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
    // justifyContent: "space-between",
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
    marginTop: 15,
    fontWeight: "bold"
  },
  time: {
    fontSize: 13,
    color: "#FFFFFF",
    marginTop: 5
  },
  icon: {
    width: 25,
    height: 25,
    backgroundColor: "#0F3C6E",
    color: "#0F3C6E"
  },
  /******** social bar ******************/
  socialBarContainer: {
    // justifyContent: "flex-start",
    //alignItems: "flex-start",
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
    justifyContent: "center",
    paddingHorizontal: 70
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  },
  like: {
    flex: 1,

    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-around"
  }
});
