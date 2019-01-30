import React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  SafeAreaView,
  Platform
} from "react-native";
import { Constants } from "expo";

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
  constructor(props) {
    super(props);

    this.position = new Animated.ValueXY();
    this.swipeCardPosition = new Animated.ValueXY({
      x: 0,
      y: -SCREEN_HEIGHT - Constants.statusBarHeight
    });
    this.state = {
      currentIndex: 0
    };
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0 && this.state.currentIndex > 0) {
          this.swipeCardPosition.setValue({
            x: 0,
            y: -SCREEN_HEIGHT - Constants.statusBarHeight + gestureState.dy
          });
        } else {
          this.position.setValue({ y: gestureState.dy });
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (
          this.state.currentIndex > 0 &&
          gestureState.dy > 50 &&
          gestureState.vy > 0.7
        ) {
          Animated.timing(this.swipeCardPosition, {
            toValue: { x: 0, y: 0 },
            duration: 400
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex - 1 });
            this.swipeCardPosition.setValue({
              x: 0,
              y: -SCREEN_HEIGHT - Constants.statusBarHeight
            });
          });
        } else if (
          this.state.currentIndex < 4 &&
          -gestureState.dy > 50 &&
          -gestureState.vy > 0.7
        ) {
          Animated.timing(this.position, {
            toValue: { x: 0, y: -SCREEN_HEIGHT - Constants.statusBarHeight },
            duration: 400
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 });
            this.position.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.parallel([
            Animated.spring(this.position, {
              toValue: { x: 0, y: 0 }
            }),
            Animated.spring(this.swipeCardPosition, {
              toValue: { x: 0, y: -SCREEN_HEIGHT - Constants.statusBarHeight }
            })
          ]).start();
        }
      }
    });
  }

  fuckup = () => {
    return ARTICLES.map((item, i) => {
      if (i === this.state.currentIndex - 1) {
        return (
          <Animated.View
            key={item.id}
            style={this.swipeCardPosition.getLayout()}
            {...this._panResponder.panHandlers}
          >
            <View
              style={{
                flex: 1,
                position: "absolute",
                width: SCREEN_WIDTH,
                height: SCREEN_HEIGHT,
                backgroundColor: "white"
              }}
            >
              <View style={{ flex: 2, backgroundColor: "black" }}>
                <Image
                  source={item.uri}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: "contain"
                  }}
                />
              </View>
              <View style={{ flex: 3, padding: 5 }}>
                <Text>
                  {item.id} Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum. Lorem
                  Ipsum is simply dummy text of the printing and typesetting
                  industry. Lorem Ipsum has been the industry's standard dummy
                  text ever since the 1500s, when an unknown printer took a
                  galley of type and scrambled it to make a type specimen book.
                  It has survived not only five centuries, but also the leap
                  into electronic typesetting, remaining essentially unchanged.
                  It was popularised in the {item.id}
                </Text>
              </View>
            </View>
          </Animated.View>
        );
      }
      if (i < this.state.currentIndex) {
        return null;
      }
      return (
        <Animated.View
          key={item.id}
          style={
            this.state.currentIndex === i ? this.position.getLayout() : null
          }
          {...(this.state.currentIndex === i
            ? { ...this._panResponder.panHandlers }
            : null)}
        >
          <View
            style={{
              flex: 1,
              position: "absolute",
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              backgroundColor: "white"
            }}
          >
            <View style={{ flex: 2, backgroundColor: "black" }}>
              <Image
                source={item.uri}
                style={{
                  flex: 1,
                  width: null,
                  height: null,
                  resizeMode: "contain"
                }}
              />
            </View>
            <View style={{ flex: 3, padding: 5 }}>
              <Text>
                {item.id} Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker
                including versions of Lorem Ipsum. Lorem Ipsum is simply dummy
                text of the printing and typesetting industry. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the{" "}
                {item.id}
              </Text>
            </View>
          </View>
        </Animated.View>
      );
    }).reverse();
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)"
        }}
      >
        <View
          style={{
            flex: 1
          }}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              height: Platform.OS == "android" ? Constants.statusBarHeight : 0
            }}
          />
          {this.fuckup()}
        </View>
      </SafeAreaView>
    );
  }
}
