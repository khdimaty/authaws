import React, { Component } from "react";
import { View, StatusBar } from "react-native";

import Carousel from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "./styles/SliderEntry";
import SliderEntry from "./components/SliderEntry";
import styles from "./styles/index";
import { ENTRIES1 } from "./static/entries";

const SLIDER_1_FIRST_ITEM = 1;

export default class Carouss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
    };
  }

  _renderItem({ item, index }) {
    return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  mainExample() {
    return (
      <Carousel
        ref={c => (this._slider1Ref = c)}
        data={ENTRIES1}
        renderItem={this._renderItemWithParallax}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        hasParallaxImages={true}
        firstItem={SLIDER_1_FIRST_ITEM}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        // inactiveSlideShift={20}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        loop={true}
        loopClonesPerSide={2}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={3000}
        onSnapToItem={index => this.setState({ slider1ActiveSlide: index })}
      />
    );
  }

  render() {
    const example1 = this.mainExample();

    return (
      <View>
        <StatusBar
          translucent={true}
          backgroundColor={"rgba(0, 0, 0, 0.3)"}
          barStyle={"light-content"}
        />

        {example1}
      </View>
    );
  }
}
