import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const ARTICLES = [
  { id: 1, uri: require("./assets/feeds/1.jpg") },
  { id: 2, uri: require("./assets/feeds/2.jpg") },
  { id: 3, uri: require("./assets/feeds/3.jpg") },
  { id: 4, uri: require("./assets/feeds/4.jpg") },
  { id: 5, uri: require("./assets/feeds/5.jpg") }
];

export default class App extends React.Component {
  renderArticles = () => {
    return ARTICLES.map(item => (
      <View
        key={item.id}
        style={{
          flex: 1,
          position: "absolute",
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          backgroundColor: "white"
        }}
      >
        <View style={{ flex: 2, backgroundColor: "black" }}>
          {/* image */}
          <Image
            source={item.uri}
            style={{
              flex: 1,
              width: null,
              height: null,
              resizeMode: "center"
            }}
          />
        </View>
        <View style={{ flex: 3, padding: 5 }}>
          <Text>
            {item.id} Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text
            of the printing and typesetting industry.
          </Text>
        </View>
      </View>
    ));
  };
  render() {
    return <View style={{ flex: 1 }}>{this.renderArticles()}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
