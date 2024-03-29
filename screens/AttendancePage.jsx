import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Heading from "../components/Heading";
import { COLORS, HOST_API, SIZES } from "../constants";
import AttendanceItem from "../components/attendance/AttendanceItem";
import { FlatList } from "react-native";
import { ScrollView } from "react-native";
import axios from "axios";
import { Alert } from "react-native";
import { useState } from "react";
import { RefreshControl } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import QRCode from "react-native-qrcode-svg";

const AttendancePage = () => {
  const navigation = useNavigation();
  const [length, setLength] = useState(0);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const route = useRoute();
  const { item, user } = route.params;
  useEffect(() => {
    fetchListApply();
    fetchClassDetail();
    userRole();
  }, []);
  let idTutor = item.tutor?.id;
  const [userData, setUserData] = useState(null);
  const userRole = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const currentUser = await axios.get(
        HOST_API.local + `/api/user/authProfile`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(currentUser.data.data);
      setUserData(currentUser.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };
  const [tutorDetail, setTutorDetail] = useState();

  const fetchClassDetail = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        HOST_API.local + `/api/tutor/${idTutor}`
      );
      console.log("tutorDetail: ", response.data.data);
      setTutorDetail(response.data.data);
      setLoader(false);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  const fetchListApply = async () => {
    const token = await AsyncStorage.getItem("token");
    setLoader(true);
    try {
      const response = await axios.get(
        HOST_API.local + `/api/attendance/clazz/${item.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setData(response.data);
      setLength(response.data.data.length);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  const majors = ({ item }) => {
    var major = "";
    var classNo = "";
    for (let index = 0; index < item.subjects.length; index++) {
      if (index == item.subjects.length - 1) {
        major += item.subjects[index].name;
      } else {
        major += item.subjects[index].name + ", ";
      }
      classNo = item.subjects[index].level;
    }
    return { major, classNo };
  };
  var date = new Date();
  var dayCreate =
    (String(date.getDay()).length == 1 ? "0" + date.getDay() : date.getDay()) +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear();
  var timeCreate = date.getHours() + ":" + date.getMinutes() + ":";
  const createAttendance = () => {
    axios
      .post(
        HOST_API.local + `/api/attendance/create?clazzId=${item.id}&status=1`
      )
      .then((response) => {
        console.log(response.data);
        Alert.alert("Tạo điểm danh thành công", "Quản lý lớp", [
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
              navigation.navigate("ManageClass", { user });
            },
          },
          { defaultIndex: 1 },
        ]);
      })
      .catch((error) => {
        Alert.alert("Tạo điểm danh không thành công", "Quản lý lớp", [
          {
            text: "Cancel",
            onPress: () => { },
          },
          {
            text: "Continue",
            onPress: () => {
              navigation.replace("ManageClass", { user });
            },
          },
          { defaultIndex: 1 },
        ]);
        console.log("Create failed", error);
      });
  };

  const check = () => {
    Alert.alert("Bạn có muốn tạo điểm danh", dayCreate + " " + timeCreate, [
      {
        text: "Cancel",
        onPress: () => {
          {
          }
        },
      },
      {
        text: "Continue",
        onPress: () => createAttendance(),
      },
      { defaultIndex: 1 },
    ]);
  };
  console.log("Deatil: ", item);
  const day = ({ item }) => {
    const start = item?.dateStart.split("T");
    const end = item?.dateEnd.split("T");
    return { start, end };
  };
  return (
    <ScrollView style={{ marginTop: 20 }}>
      <Heading title={"Thông tin của lớp "} />
      <View style={styles.class}>
        <View style={styles.classHeading}>
          <View style={styles.headingName}>
            <Text style={styles.name}>{majors({ item }).major}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.infoDetail}>
            <Text style={styles.sup}>Môn học: {majors({ item }).major}</Text>
            <Text style={styles.sup}>{majors({ item }).classNo}</Text>
            <Text style={styles.sup}>
              Ngày bắt đầu: {day({ item }).start[0]}
            </Text>
            <Text style={styles.sup}>
              Ngày kết thúc: {day({ item }).end[0]}
            </Text>
            <Text style={styles.sup}>Chi phí: {item.tuition}</Text>
          </View>
        </View>
        {userData?.role !== "TUTOR" ? (
          <View style={styles.infoTutor}>
            <View style={{ alignItems: "center", marginBottom: -10 }}>
              <Text style={styles.sup}> Thông tin gia sư</Text>
            </View>

            <View style={styles.infoDetail}>
              <TouchableOpacity
                onPress={() => navigation.navigate("TutorDetail", { idTutor })}
              >
                <Text style={styles.sup}>
                  Gia sư: {item.tutor?.name} {item?.tutorName}
                </Text>
              </TouchableOpacity>
              <Text style={styles.sup}>SĐT: {item.tutor?.phone} </Text>
              <Text style={styles.sup}>Địa chỉ: {item.tutor?.address} </Text>
              <Text style={styles.sup}>
                {item.tutor?.districtName}, {item.tutor?.provinceName}
              </Text>
              <Text style={styles.sup}>
                Trường đại học: {item.tutor?.university}
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.infoTutor}>
            <View style={{ alignItems: "center", marginBottom: -10 }}>
              <Text style={styles.sup}> Thông tin phụ huynh</Text>
            </View>

            <View style={styles.infoDetail}>
              <TouchableOpacity
                onPress={() => navigation.navigate("TutorDetail", { idTutor })}
              >
                <Text style={styles.sup}>Phụ huynh: {item.parentName}</Text>
              </TouchableOpacity>

              <Text style={styles.sup}>Địa chỉ: {item.address} </Text>
              <Text style={styles.sup}>
                {item.districtName}, {item.provinceName}
              </Text>
              <Text style={styles.sup}>S Đ T: {item.phone}</Text>
            </View>
          </View>
        )}

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
          {loader ? (
            <ActivityIndicator size={500} color={COLORS.main} />
          ) : (<View>
            {/* <TouchableOpacity style={styles.createAttendance}>
              <Text style={styles.titleText}>
                Số buổi: {length}/{item.slots}
              </Text>
            </TouchableOpacity> */}
          </View>

          )}
          {userData?.role !== "TUTOR" && (
            <TouchableOpacity
              style={styles.createAttendance}
              onPressIn={() =>
                navigation.navigate("FeedbackClass", { item, length, user })
              }
            >
              <Ionicons name="add-circle" size={20} color={COLORS.main} />
              <Text style={styles.titleText}>Đánh giá chất lượng </Text>
            </TouchableOpacity>
          )}
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
      <View>
        {userData?.role === "TUTOR" && (
          <View style={styles.qrCode}>
            <Text style={styles.sup}>MÃ GIỚI THIỆU</Text>
            <QRCode
              value="https://www.facebook.com/"
              logo={require("../assets/logo-no-background.png")}
              logoSize={50}
              size={200}
            />
            <Text style={[styles.sup, { fontSize: SIZES.medium - 3 }]}>
              Sử dụng ở lần đầu gặp phụ phuynh
            </Text>
          </View>
        )}
      </View>
      {/* <View style={styles.attendance}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Danh sách điểm danh</Text>
          {length == item.slots ? (
            <View>
              {userData?.role === "TUTOR" && (
                <TouchableOpacity
                  style={styles.createAttendance}
                  onPressIn={() =>
                    navigation.navigate("FeedbackClass", { item, length, user })
                  }
                >
                  <MaterialCommunityIcons name="format-list-text" size={24} />
                  <Text style={styles.titleText}> Xem đánh giá</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View>
              {userData?.role !== "TUTOR" && (
                <TouchableOpacity
                  style={styles.createAttendance}
                  onPress={check}
                >
                  <Ionicons name="add-circle" size={20} color={COLORS.main} />
                  <Text style={styles.titleText}>Tạo điểm danh</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
      <ScrollView style={{ marginTop: 10, marginBottom: 350 }}>
        {data?.data?.map((item, stt = 0) => (
          <AttendanceItem item={item} stt={stt + 1} />
        ))}
      </ScrollView> */}
    </ScrollView>
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
    justifyContent: "center",
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
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
  },
  headingName: {
    justifyContent: "center",
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

  infoTutor: {
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: COLORS.secondMain,
  },

  qrCode: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
