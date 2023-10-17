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
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ClassItem from "../components/Class/ClassItem";
import ClassList from "../components/Class/ClassList";

const Class = () => {
  const navigation = useNavigation();
  const classes = [
    1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 20,
  ];
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.upperRow}>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back-circle"
                  size={35}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.heading}>Danh sach lop</Text>
            </View>
          </View>
          <View style={styles.btnSreacrh}>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Feather name="search" size={35} color={COLORS.lightWhite} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView style={{ marginHorizontal: 5, marginBottom: 40 }}>
        <View>
          {classes.map((item) => (
            <ClassItem />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Class;

const styles = StyleSheet.create({
  btnSreacrh: {
    marginHorizontal: 10,
    marginVertical: 2,
  },
  container: {
    paddingVertical: 5,
    marginHorizontal: 10,
    backgroundColor: COLORS.main,
    borderRadius: SIZES.large,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    justifyContent: "center",
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },

  upperRow: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  wrapper: {
    marginBottom: 10,
    backgroundColor: COLORS.lightWhite,
  },
});
