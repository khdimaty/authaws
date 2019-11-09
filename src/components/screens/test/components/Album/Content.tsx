import * as React from "react";
import { Dimensions } from "react-native";
import {
  StyleSheet, View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import { onScroll } from "react-native-redash";
import Ascard from "./appstorecard";
import { Icon } from "react-native-elements";
import {
  Album, MAX_HEADER_HEIGHT, MIN_HEADER_HEIGHT,
} from "./Model";
import Track from "./Track";
import ShufflePlay, { BUTTON_HEIGHT } from "./ShufflePlay";
import Header from "./Header";

interface ContentProps {
  album: Album;
  y: Animated.Value<number>;
}

const {
  interpolate, Extrapolate,
} = Animated;

export default ({ album: { artist, tracks }, y }: ContentProps) => {
  const height = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT, -BUTTON_HEIGHT / 2],
    outputRange: [0, MAX_HEADER_HEIGHT + BUTTON_HEIGHT],
    extrapolate: Extrapolate.CLAMP,
  });
  const opacity = interpolate(y, {
    inputRange: [-MAX_HEADER_HEIGHT / 2, 0, MAX_HEADER_HEIGHT / 2],
    outputRange: [0, 1, 0],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.ScrollView
      onScroll={onScroll({ y })}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={1}
      stickyHeaderIndices={[1]}
    >
      <View style={styles.cover}>
       
        <View style={styles.artistContainer}>
     
          <Animated.Text style={[styles.artist, { opacity }]}>Khdimaty</Animated.Text>
        </View>
      </View>
      <View style={styles.header}>
        <Header {...{ y, artist }} />
        <ShufflePlay />
      </View>
      <View style={styles.tracks}>
        {
          tracks.map((track, key) => (
         
            <Ascard
            key={key}
            name={"test"}
            score={23}
            type={"survey"}
            //navigation={this.props.navigation}
            //modal={this.toggleModal}
          />
          ))
        }
      </View>
    </Animated.ScrollView>
  );
};
const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: MIN_HEADER_HEIGHT - BUTTON_HEIGHT / 2,
  },
  cover: {
    height: 0.2* height ,
  },
  gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
  },
  artistContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    marginTop:-BUTTON_HEIGHT-40
    
  },
  artist: {
    textAlign: "center",
    color: "black",
    fontSize: 35,
    fontWeight: "bold",
  },
  header: {
    marginTop: -BUTTON_HEIGHT,
  },
  tracks: {
    paddingTop: 32,
    backgroundColor: "white",
  },
});
