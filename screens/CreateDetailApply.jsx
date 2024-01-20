import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import Heading from "../components/Heading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, HOST_API, SIZES } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClassDetailApply = () => {
  const route = useRoute();
  const { item } = route.params;
  console.log(item);
  var major = "";
  var classNo = "";

  for (let index = 0; index < item.subjects.length; index++) {
    if (index == item.subjects.length - 1) {
      major += item.subjects[index].subjectName;
    } else {
      major += item.subjects[index].subjectName + ", ";
    }
    classNo = item.subjects[index].level;
  }
  const [classDetail, setClassDetail] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchClassDetail();
  }, []);
  const fetchClassDetail = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        HOST_API.local + `/api/clazz/${item.clazzId}`
      );
      setClassDetail(response.data.data);
      setLoader(false);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };
  console.log("=========");
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.tuition);


  const cancel = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    console.log(item.id);
    axios
      .put(HOST_API.local + `/api/tutorApply/delete/${item.id}`, {}, {
        headers: {
          Authorization: " Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.responseCode == "00") {
          Alert.alert("Hủy thành công", "Quản lý yêu cầu", [
            {
              text: "Cancel",
              onPress: () => {
                // navigation.navigate("ManasgeRequest");
              },
            },
            {
              text: "Continue",
              onPress: () => {
                // navigation.navigate("ManageRequest", {
                //   user,
                //   userData,
                // });
              },
            },
            { defaultIndex: 1 },
          ]);
        } else {
          Alert.alert("Tạo đăng ký không thành công", "Quản lý yêu cầu", [
            {
              text: "Cancel",
              onPress: () => { },
            },
            {
              text: "Continue",
              onPress: () => {
              },
            },
            { defaultIndex: 1 },
          ]);
        }
      })
      .catch((error) => {
        Alert.alert("Hủy không thành công", "Quản lý yêu cầu", [
          {
            text: "Cancel",
            onPress: () => { },
          },
          {
            text: "Continue",
            onPress: () => {
            },
          },
          { defaultIndex: 1 },
        ]);
        console.log("Create failed", error);
      });
  };


  const check = () => {
    Alert.alert("Bạn có muốn hủy đăng ký", " ", [
      {
        text: "Cancel",
        onPress: () => { },
      },
      {
        text: "Continue",
        onPress: () => cancel(),
      },
      { defaultIndex: 1 },
    ]);
  };

  return (
    <SafeAreaView>
      <Heading title={"Thông tin lớp chi tiết "} />

      {loader ? (
        <ActivityIndicator size={500} color={COLORS.main} />
      ) : (
        <View style={{ marginHorizontal: 10, marginTop: 30 }}>
          <View style={styles.itemContext}>

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
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={check}
                style={[styles.status, { backgroundColor: COLORS.red, marginBottom: 20 }]}
              >
                <Text style={styles.sup}>Hủy đăng ký</Text>
              </TouchableOpacity>
              <View
                style={[styles.status, { backgroundColor: COLORS.secondMain }]}
              >
                <Text style={styles.sup}>Đã đăng ký</Text>
              </View>
            </View>
          ) : item.status == 1 ? (
            <View style={{ alignItems: "center" }}>
              <View
                style={[styles.status, { backgroundColor: COLORS.secondMain }]}
              >
                <Text style={styles.sup}>Đã chọn bạn</Text>
              </View>
            </View>
          ) : (
            <View style={{ alignItems: "center" }}>
              <View
                style={[styles.status, { backgroundColor: COLORS.secondMain }]}
              >
                <Text style={styles.sup}>Đã có gia sư</Text>
              </View>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default ClassDetailApply;

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
