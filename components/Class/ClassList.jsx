import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FlatList } from "react-native";
import { SIZES } from "../../constants";
import ClassItem from "./ClassItem";

const ClassList = () => {
  const classes = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13];

  return (
    <View>
      <FlatList
        data={classes}
        renderItem={({ item }) => <ClassItem />}
        contentContainerStyle={{ columnGap: SIZES.medium }}
      />
    </View>
  );
};

export default ClassList;

const styles = StyleSheet.create({});
