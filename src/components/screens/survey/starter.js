import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Animatable from "react-native-animatable";
const survey = require("../Home/assets/appstore.png");
const other = require("../Home/assets/test.png");
import HeaderImageScrollView from "react-native-image-header-scroll-view";
import { Accordion, Badge, Button } from "native-base";

const MIN_HEIGHT = 50;
const MAX_HEIGHT = 250;

class Starter extends Component {
  constructor() {
    super();
    this.state = { showNavTitle: false, color: "white" };
  }

  render() {
    let color = this.state.color;
    let imag = this.props.type == "survey" ? survey : other;
    const dataArray = [
      {
        title: "Description",
        content: this.props.descript
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <HeaderImageScrollView
          maxHeight={MAX_HEIGHT}
          minHeight={MIN_HEIGHT}
          maxOverlayOpacity={0.6}
          minOverlayOpacity={0.3}
          fadeOutForeground
          renderHeader={() => <Image source={imag} style={styles.image} />}
          renderFixedForeground={() => (
            <Animatable.View
              style={styles.navTitleView}
              ref={navTitleView => {
                this.navTitleView = navTitleView;
              }}
            >
              <Text style={styles.navTitle}>{this.props.taskname}</Text>
            </Animatable.View>
          )}
          renderForeground={() => (
            <View style={styles.titleContainer}>
              <View
                style={{
                  flexDirection: "row",
                  margin: 20
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Home")}
                >
                  <Icon
                    size={30}
                    style={{
                      paddingLeft: 5,
                      paddingRight: 15,
                      paddingBottom: 5,
                      paddingTop: 5,
                      color: "grey"
                    }}
                    name="close"
                  />
                </TouchableOpacity>

                <Text></Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 120
                }}
              >
                <Text style={styles.imageTitle}>{this.props.taskname}</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      color: this.state.color == "white" ? "red" : "white"
                    })
                  }
                >
                  <Icon
                    style={[styles.icon, { color: color }]}
                    name="cards-heart"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 30, margin: 20 }}>Score </Text>
            <Badge style={{ backgroundColor: "black", margin: 28 }}>
              <Text style={{ color: "white", fontSize: 15 }}>200 pt</Text>
            </Badge>
          </View>
          <Accordion
            dataArray={dataArray}
            headerStyle={{ backgroundColor: "#fff" }}
            contentStyle={{ backgroundColor: "#fff" }}
          />
          <View style={{ alignItems: "center", margin: 20 }}>
            <Button
              onPress={() => {
                this.props.start();
              }}
              bordered
              dark
            >
              <Text style={{ marginLeft: 50, marginRight: 50 }}>Start</Text>
            </Button>
          </View>
        </HeaderImageScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get("window").width,
    alignSelf: "stretch",
    resizeMode: "cover"
  },
  title: {
    fontSize: 20
  },
  name: {
    fontWeight: "bold"
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    backgroundColor: "white"
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  sectionContent: {
    fontSize: 16,
    textAlign: "justify"
  },
  keywords: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap"
  },
  keywordContainer: {
    backgroundColor: "#999999",
    borderRadius: 10,
    margin: 10,
    padding: 10
  },
  keyword: {
    fontSize: 16,
    color: "white"
  },
  titleContainer: {
    flex: 1
    //flexDirection: "row",
    //justifyContent: "space-between"
    // marginTop: 200
  },
  imageTitle: {
    color: "white",
    backgroundColor: "transparent",
    fontSize: 24,
    marginLeft: 10
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    opacity: 0
  },
  navTitle: {
    color: "white",
    fontSize: 18,
    backgroundColor: "transparent"
  },
  sectionLarge: {
    height: 600
  },
  icon: {
    fontSize: 40,
    marginRight: 10,
    marginBottom: 10
  }
});

export default Starter;
