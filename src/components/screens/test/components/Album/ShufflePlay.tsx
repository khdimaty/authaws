import * as React from "react";
import {
  View, Text, StyleSheet, TouchableWithoutFeedback,
} from "react-native";
import {  TouchableOpacity } from "react-native";
export const BUTTON_HEIGHT = 70;
export const BUTTON_WIDTH = "80%";

export default () => {
  const [active, setactive] = React.useState({activea:"black",activeb:"white",activec:"black"})
return (
  <TouchableWithoutFeedback>
     <View style={styles.Tabs}>
                  <TouchableOpacity
                    style={[styles.nav]}
                    onPress={() =>
                    setactive({activea:"white",activeb:"black",activec:"black"})
                    }
                  >
                    <Text style={[styles.text, { color: active.activea }]}>
                      Newest
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.nav]}
                    onPress={() =>
                      setactive({activea:"black",activeb:"white",activec:"black"})
                    }
                  >
                    <Text style={[styles.text, { color: active.activeb }]}>
                      Popular
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.nav]}
                    onPress={() =>
                      setactive({activea:"black",activeb:"black",activec:"white"})
                    }
                  >
                    <Text style={[styles.text, { color: active.activec }]}>
                      Favorite
                    </Text>
                  </TouchableOpacity>
                </View>
  </TouchableWithoutFeedback>
);}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    //height: 70,
    backgroundColor: "#3c3c3c",
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    borderRadius: 32,
    justifyContent: "center",
  },
  label: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },  Tabs: {
    height: BUTTON_HEIGHT,
   // width: BUTTON_WIDTH,
    backgroundColor: "#3c3c3c",

   marginHorizontal:15,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderRadius: 30
  },
  nav: {
   

    alignSelf: "center",
   


    justifyContent: "center"
  },  
  text: {

    alignSelf: "center"
  },
});
