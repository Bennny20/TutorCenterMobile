import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  AntDesign,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {} from "../../";
const BlogItem = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => navigation.navigate("BlogDetail")}>
        <View style={styles.heading}>
          <Ionicons name="newspaper" size={24} style={{ marginLeft: 5 }} />
          <Text style={styles.title}>Title blog</Text>
        </View>
        <View style={styles.body}>
          <Text>Body</Text>
          <Text>Body</Text>
          <Text>Body</Text>
          <Text>Body</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BlogItem;

const styles = StyleSheet.create({
  body: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    marginLeft: 5,
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },
  heading: {
    padding: 5,
    flexDirection: "row",
    backgroundColor: COLORS.secondMain,
    alignItems: "center",
    borderRadius: 10,
  },
  item: {
    marginHorizontal: 20,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 10,
  },
});
