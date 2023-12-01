import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Heading from "../components/Heading";
import { COLORS, HOST_API, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Verification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData, userTutor } = route.params;
  console.log("user: ", userData);
  console.log("userTutor: ", userTutor);
  const createAttendance = async () => {
    const token = await AsyncStorage.getItem("token");
    axios
      .post(
        HOST_API.local + `/api/requestVerification/create`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        Alert.alert("Xác nhận tài khoản thành công", "", [
          {
            text: "Cancel",
            onPress: () => {
              {
              }
            },
          },
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("Profile");
            },
          },
          { defaultIndex: 1 },
        ]);
      })
      .catch((error) => {
        Alert.alert("Xác nhận tài khoản không thành công", "", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {
              navigation.replace("Profile");
            },
          },
          { defaultIndex: 1 },
        ]);
      });
  };

  return (
    <SafeAreaView style={{ marginTop: 20, marginBottom: 20 }}>
      <Heading title={"Xác minh tài khoản"} />

      <View style={styles.info}>
        <Text style={styles.sup}>
          Email:
          <Text style={{ color: COLORS.black, fontSize: SIZES.medium + 2 }}>
            {userTutor.email}
          </Text>
        </Text>
        <Text style={styles.sup}>
          Họ và tên:
          <Text style={{ color: COLORS.black, fontSize: SIZES.medium + 2 }}>
            {" "}
            {userData.fullName}
          </Text>
        </Text>
        <Text style={styles.sup}>
          Địa chỉ:
          <Text style={{ color: COLORS.black, fontSize: SIZES.medium + 2 }}>
            {" "}
            {userTutor.address}
          </Text>
        </Text>
        <Text style={styles.sup}>
          Khu vực:
          <Text style={{ color: COLORS.black, fontSize: SIZES.medium + 2 }}>
            {" "}
            {userTutor.districtName}, {userTutor.provinceName}
          </Text>
        </Text>
        <Text style={styles.sup}>
          Giới tính:
          <Text style={{ color: COLORS.black, fontSize: SIZES.medium + 2 }}>
            {" "}
            {userTutor.gender}
          </Text>
        </Text>
        <Text style={styles.sup}>
          Trường đại học:
          <Text style={{ color: COLORS.black, fontSize: SIZES.medium + 2 }}>
            {" "}
            {userTutor.university}
          </Text>
        </Text>
        <Text style={styles.sup}>
          CCCD/CMND:
          <Text style={{ color: COLORS.black, fontSize: SIZES.medium + 2 }}>
            {" "}
            {userTutor.idNumber}
          </Text>
        </Text>
        <Text style={styles.sup}>
          Chuyên môn:
          <Text style={{ color: COLORS.black, fontSize: SIZES.medium + 2 }}>
            {" "}
            {userTutor.major}
          </Text>
        </Text>
        <Text style={styles.sup}>
          Phone:{" "}
          <Text style={{ color: COLORS.black, fontSize: SIZES.medium + 2 }}>
            {" "}
            {userTutor.phone}
          </Text>
        </Text>
      </View>
      {userTutor.status == 0 && (
        <TouchableOpacity style={styles.btn} onPress={createAttendance}>
          <Text>Xác minh tài khoản</Text>
        </TouchableOpacity>
      )}

      {userTutor.status == 1 && (
        <View style={styles.btn}>
          <Text>Đang xác minh tài khoản</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  info: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },

  sup: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  btn: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderWidth: 2,
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: COLORS.secondMain,
    marginTop: 10,
  },
});
