import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import Heading from "../components/Heading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, HOST_API, SIZES } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClassDetailForParent = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { item } = route.params;
  var major = "";
  var classNo = "";
  const classID = item;
  for (let index = 0; index < item.subjects.length; index++) {
    if (index == item.subjects.length - 1) {
      major += item.subjects[index].name;
    } else {
      major += item.subjects[index].name + ", ";
    }
    classNo = item.subjects[index].level;
  }
  const [classDetail, setClassDetail] = useState();
  const [userData, setUserData] = useState(null);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    fetchClassDetail();
    checkExitingUser();
  }, []);
  const fetchClassDetail = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        HOST_API.local + `/api/clazz/${item.id}`
      );
      console.log("classDetail: ", response.data.data);
      setClassDetail(response.data.data);
      setLoader(false);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  const checkExitingUser = async () => {
    const token = await AsyncStorage.getItem("token");
    setLoader(true);
    try {
      const currentUser = await axios.get(
        HOST_API.local + `/api/user/authProfile`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (currentUser !== null) {
        setUserData(currentUser.data.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.tuition);

  return (
    <SafeAreaView>
      <Heading title={"Thông tin lớp chi tiết "} />

      {loader ? (
        <ActivityIndicator size={500} color={COLORS.main} />
      ) : (
        <View style={{ marginHorizontal: 10, marginTop: 30 }}>
          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="account"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Phụ huynh <Text style={styles.sup}> {item?.parentName}</Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="card-account-phone"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Số điện thoại:{" "}
              <Text style={styles.sup}> {classDetail?.phone}</Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="map-marker"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Địa điểm: <Text style={styles.sup}> {item.address}</Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Khu vực:
              <Text style={styles.sup}>
                {item.districtName}, {item.provinceName}
              </Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="text-long"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Môn học:{" "}
              <Text style={styles.sup}>
                {major} , {classNo}
              </Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="calendar-text"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Số buổi: <Text style={styles.sup}> {item.slots}</Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="calendar-text"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Ngày học: <Text style={styles.sup}> {item.daysOfWeek}</Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Giờ dạy:
              <Text style={styles.sup}> {classDetail?.time}</Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="calendar-clock"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Thời gian dạy:
              <Text style={styles.sup}> 1 giờ 30 phút (90 phút)</Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="cash"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Chi phí khóa học:{" "}
              <Text style={styles.sup}> {formattedAmount}</Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="gender-male-female"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Giới tính gia sư: <Text style={styles.sup}> {item.gender}</Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="telescope"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Trình độ gia sư:{" "}
              <Text style={styles.sup}> {item.tutorLevel}</Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="clock-time-ten"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Ngày bắt đầu:{" "}
              <Text style={styles.sup}> {classDetail?.dateStart}</Text>
            </Text>
          </View>

          <View style={styles.itemContext}>
            <MaterialCommunityIcons
              name="clock-time-ten"
              size={30}
              color={COLORS.gray}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.title}>
              Ngày kết thúc:{" "}
              <Text style={styles.sup}>{classDetail?.dateEnd}</Text>
            </Text>
          </View>

          {item.status == 0 ? (
            <TouchableOpacity
              style={{ alignItems: "center" }}
              onPress={() =>
                navigation.navigate("TransferMoney", {
                  item,
                  userData,
                  classID,
                })
              }
            >
              <View
                style={[styles.status, { backgroundColor: COLORS.secondMain }]}
              >
                <Text style={styles.sup}>Thanh toán</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={{ alignItems: "center" }}>
              <View
                style={[styles.status, { backgroundColor: COLORS.secondMain }]}
              >
                <Text style={styles.sup}>Đã thanh toán</Text>
              </View>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ClassDetailForParent;

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 10,
  },

  status: {
    backgroundColor: COLORS.secondMain,
    borderRadius: 20,
    width: 200,
    borderWidth: 1,
    borderColor: COLORS.gray2,
    alignItems: "center",
    padding: 20,
  },

  itemContext: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },

  sup: {
    color: COLORS.black,
    fontSize: SIZES.medium + 2,
  },
});
