import React, { Component } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

export default class Test extends Component {
  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View>
        <Button title="Show modal" onPress={this.toggleModal} />
        <Modal
          isVisible={this.state.isModalVisible}
          swipeDirection={["down"]}
          onSwipeComplete={this.toggleModal}
          style={{
            borderRadius: 20,
            backgroundColor: "red",
            marginHorizontal: 5,
            marginTop: 50
          }}
          coverScreen
        >
          <View style={{ flex: 1 }}></View>
        </Modal>
      </View>
    );
  }
}
