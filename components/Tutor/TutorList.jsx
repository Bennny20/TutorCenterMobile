import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import TutorCartView from "./TutorCardView";
import { COLORS, SIZES } from "../../constants";
import TutorItem from "./TutorItem";

const TutorList = () => {
  const tutors = [
    1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={tutors}
        numColumns={1}
        renderItem={(item) => <TutorItem />}
      />
    </View>
  );
};

export default TutorList;

const styles = StyleSheet.create({
  container: {
    paddingTop: SIZES.xxLarge,
    paddingLeft: SIZES.small / 2,
  },

  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
});
