import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Heading from "../components/Heading";
import ClassItem from "../components/Class/ClassItem";
import { COLORS, SIZES } from "../constants";

const ManageRequest = () => {
  const navigation = useNavigation();
  const classes = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13];

  return (
    <SafeAreaView>
      <Heading title={"Danh sách yêu cầu tạo lớp "} />
      <ScrollView style={{ marginTop: 40, marginBottom: 40 }}>
        <View>
          {classes.map((item) => (
            <View style={styles.requestItem}>
              <View style={styles.requestInfo}>
                <Text style={styles.requestTitle}>Tên khóa học</Text>
                <Text style={styles.requestSup}>Thông tin </Text>
                <Text style={styles.requestSup}>Thông tin </Text>
                <Text style={styles.requestSup}>Thông tin </Text>
              </View>
              <View style={styles.requestStatus}>
                <Text style={styles.requestStatusBtn}>Trạng thái</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageRequest;

const styles = StyleSheet.create({
  requestStatusBtn: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    fontFamily: "bold",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },

  requestStatus: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.main,
  },

  requestSup: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },

  requestTitle: {
    fontFamily: "bold",
    fontSize: SIZES.medium + 3,
    color: COLORS.main,
  },

  requestInfo: {},

  requestItem: {
    borderWidth: 2,
    borderColor: COLORS.main,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightWhite,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 15,
  },
});
