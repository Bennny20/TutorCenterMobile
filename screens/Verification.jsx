import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import Heading from "../components/Heading";
import { COLORS, HOST_API } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Verification = () => {
  const route = useRoute();
  const { userData, userTutor } = route.params;

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
    <ScrollView style={{ marginTop: 20, marginBottom: 20 }}>
      <Heading title={"Xác minh tài khoản"} />

      <TouchableOpacity style={styles.btn} onPress={createAttendance}>
        <Text>Xác minh tài khoản</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  btn: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderWidth: 2,
    marginHorizontal: 30,
    borderRadius: 10,
    backgroundColor: COLORS.secondMain,
    marginTop: 20,
  },
});
