import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native";
import { COLORS, SIZES } from "../constants";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  AntDesign,
} from "@expo/vector-icons";
import { FlatList } from "react-native";
import BlogItem from "../components/Blog/BlogItem";
import { useState } from "react";

const BlogPage = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const blogList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <View style={{ marginTop: 40, marginBottom: 90 }}>
      <View style={styles.heading}>
        <MaterialCommunityIcons
          name={"newspaper-variant-multiple"}
          size={40}
          color={COLORS.main}
        />
        <Text style={styles.headingText}>Blog</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={blogList}
          style={{ marginBottom: 70 }}
          renderItem={({ item }) => <BlogItem />}
        />
      </View>
    </View>
  );
};

export default BlogPage;

const styles = StyleSheet.create({
  headingText: {
    marginLeft: 5,
    fontFamily: "bold",
    fontSize: SIZES.xxLarge - 15,
    color: COLORS.main,
  },
  heading: {
    marginLeft: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
