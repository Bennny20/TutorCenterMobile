import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Heading from "../components/Heading";
import { COLORS, SIZES } from "../constants";
import AttendanceItem from "../components/attendance/AttendanceItem";
import { FlatList } from "react-native";
import { ScrollView } from "react-native";
import axios from "axios";
import { Alert } from "react-native";
import { useState } from "react";

const AttendancePage = () => {
  const navigation = useNavigation();
  var date = new Date();
  var createDate =
    date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  var createTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const route = useRoute();
  const { item } = route.params;
  const profileId = item.parent;
  const [checkFinish, setCheckFinish] = useState(false);

  if (item.attendance.length == item.request.slot) {
    setCheckFinish(true);
  }
  const createAttendance = (attendance) => {
    axios
      .post(`https://tutor-center.onrender.com/attendance`, attendance)
      .then((response) => {
        console.log(response.data);
        Alert.alert("Tạo điểm danh thành công", "Quản lý lớp", [
          {
            text: "Cancel",
            onPress: () => navigation.navigate("ManageClass", { profileId }),
          },
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("ManageClass", { profileId });
            },
          },
          { defaultIndex: 1 },
        ]);
      })
      .catch((error) => {
        Alert.alert("Tạo điểm danh không thành công", "Quản lý lớp", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("ManageClass", { profileId });
            },
          },
          { defaultIndex: 1 },
        ]);
        console.log("Create failed", error);
      });
  };

  const handleCreateAttendance = () => {
    const attendance = {
      classId: item._id,
      tutor: item.tutor.id,
      parent: item.parent,
      createDate:
        date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
      createTime:
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(),
    };

    Alert.alert(
      "Bạn có muốn điểm danh",
      "Thời gian: " + createDate + " " + createTime,
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {
            // axios
            //   .post(`https://tutor-center.onrender.com/attendance`, attendance)
            //   .then((response) => {
            //     console.log(response.data);
            //     Alert.alert("Tạo điểm danh thành công", "Quản lý lớp", [
            //       {
            //         text: "Cancel",
            //         onPress: () =>
            //           navigation.navigate("ManageClass", { profileId }),
            //       },
            //       {
            //         text: "Continue",
            //         onPress: () => {
            //           navigation.navigate("ManageClass", { profileId });
            //         },
            //       },
            //       { defaultIndex: 1 },
            //     ]);
            //   })
            //   .catch((error) => {
            //     Alert.alert("Tạo điểm danh không thành công", "Quản lý lớp", [
            //       {
            //         text: "Cancel",
            //         onPress: () => {},
            //       },
            //       {
            //         text: "Continue",
            //         onPress: () => {
            //           navigation.navigate("ManageClass", { profileId });
            //         },
            //       },
            //       { defaultIndex: 1 },
            //     ]);
            //     console.log("Create failed", error);
            //   });
            createAttendance(attendance);
            navigation.navigate("ManageClass", { profileId });
          },
        },
        { defaultIndex: 1 },
      ]
    );
  };

  return (
    <SafeAreaView style={{ marginBottom: 400 }}>
      <Heading title={"Điểm danh"} />
      <View style={styles.class}>
        <View style={styles.classHeading}>
          <View style={styles.headingName}>
            <Text style={styles.name}>{item.request.major.join(" - ")}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.infoDetail}>
            <Text style={styles.sup}>
              Môn học: {item.request.major.join(", ")}
            </Text>
            <Text style={styles.sup}>Lớp học: {item.request.classNo}</Text>
            <Text style={styles.sup}>
              Ngày bắt đầu: {item.request.dateStart}
            </Text>
            <Text style={styles.sup}>
              Ngày kết thúc: {item.request.dateEnd}
            </Text>
            <Text style={styles.sup}>Gia sư: {item.tutor.name}</Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 10,
            marginBottom: -10,
            marginHorizontal: 10,
          }}
        >
          <TouchableOpacity style={styles.createAttendance}>
            <Text style={styles.titleText}>
              Số buổi: {item.attendance.length}/ {item.request.slot}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.createAttendance}>
            <Ionicons name="add-circle" size={20} color={COLORS.main} />
            <Text style={styles.titleText}>Đánh giá chất lượng </Text>
          </TouchableOpacity>
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

          {checkFinish ? (
            <TouchableOpacity
              style={styles.createAttendance}
              onPress={handleCreateAttendance}
            >
              <Ionicons name="add-circle" size={20} color={COLORS.main} />
              <Text style={styles.titleText}>Kết thúc lớp học</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.createAttendance}
              onPress={handleCreateAttendance}
            >
              <Ionicons name="add-circle" size={20} color={COLORS.main} />
              <Text style={styles.titleText}>Tạo điểm danh</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView style={{ marginTop: 10 }}>
        {item.attendance.map((item, stt = 0) => (
          <AttendanceItem item={item} stt={stt + 1} />
        ))}
      </ScrollView>
      {/* <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          marginBottom: -10,
          marginHorizontal: 10,
        }}
      >
        <TouchableOpacity style={styles.createAttendance}>
          <Text style={styles.titleText}>
            Số buổi: {item.attendance.length}/ {item.request.slot}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createAttendance}>
          <Ionicons name="add-circle" size={20} color={COLORS.main} />
          <Text style={styles.titleText}>Đánh giá chất lượng </Text>
        </TouchableOpacity>
      </View> */}
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
