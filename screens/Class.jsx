import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ClassItem from "../components/Class/ClassItem";
import ClassList from "../components/Class/ClassList";

const Class = () => {
  const navigation = useNavigation();
  const classes = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13];
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-circle"
                size={35}
                color={COLORS.lightWhite}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>Danh sach lop</Text>
          </View>
        </View>
      </View>
      <ScrollView style={{ marginTop: 50 }}>
        <View>
          {classes.map((item) => (
            <ClassItem />
          ))}
        </View>
        <View>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Class;

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
  },

  heading: {
    justifyContent: "center",
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },

  upperRow: {
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "absolute",
    top: SIZES.xxLarge,
    width: SIZES.width - 44,
    backgroundColor: COLORS.main,
    borderRadius: SIZES.large,
    zIndex: 999,
  },
  wrapper: {
    marginBottom: 50,
    backgroundColor: COLORS.lightWhite,
  },
});
