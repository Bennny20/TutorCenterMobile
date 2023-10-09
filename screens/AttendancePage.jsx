import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Heading from "../components/Heading";
import { COLORS, SIZES } from "../constants";
import { ScrollView } from "react-native-gesture-handler";

const AttendancePage = () => {
  const navigation = useNavigation();
  const attendanceList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <SafeAreaView>
      <Heading title={"Điểm danh"} />
      <View style={styles.class}>
        <View style={styles.classHeading}>
          <View style={styles.headingName}>
            <Text style={styles.name}>Ten cua lop</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.infoDetail}>
            <Text style={styles.sup}>Mon hoc: </Text>
            <Text style={styles.sup}>Lop hoc:</Text>
            <Text style={styles.sup}>Gioi tinh: </Text>
            <Text style={styles.sup}>Dia diem:</Text>
            <Text style={styles.sup}>Ngay hoc: </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            borderWidth: 1,
            borderColor: COLORS.gray,
          }}
        ></View>
      </View>
      <View style={styles.attendance}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Danh sách điểm danh</Text>
          <TouchableOpacity style={styles.createAttendance}>
            <Ionicons name="add-circle" size={20} color={COLORS.main} />
            <Text style={styles.titleText}>Tạo điểm danh</Text>
          </TouchableOpacity>
        </View>
        {/* <ScrollView>
          <View style={styles.history}></View>
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default AttendancePage;

const styles = StyleSheet.create({
  //Attendance
  createAttendance: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: COLORS.black,
    borderWidth: 2,
    backgroundColor: COLORS.secondMain,
    borderRadius: 20,
  },

  titleText: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.black,
  },

  title: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  // Info class
  classHeading: {
    alignItems: "center",
    marginTop: 40,
    zIndex: 999,
  },

  sup: {
    fontFamily: "regular",
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: 5,
  },

  infoDetail: {
    marginLeft: 20,
    marginTop: 10,
  },
  name: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.lightWhite,
  },
  headingName: {
    marginTop: -10,
    width: 300,
    borderColor: COLORS.main,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    backgroundColor: COLORS.main,
  },

  info: {
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: -10,
    backgroundColor: COLORS.secondMain,
  },
});
