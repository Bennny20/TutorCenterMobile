import { View, Text } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../constants";
import { StyleSheet } from "react-native";

const Carousel = () => {
  const slides = [
    require("../../assets/images/fn6.jpg"),
    require("../../assets/images/fn7.jpg"),
    require("../../assets/images/fn8.jpg"),
    require("../../assets/images/fn9.jpg"),
    require("../../assets/images/fn10.jpg"),
  ];
  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{
          borderRadius: 15,
          width: "92%",
          marginTop: 15,
        }}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItem: "center",
  },
});
