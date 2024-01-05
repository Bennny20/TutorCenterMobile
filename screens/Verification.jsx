import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Heading from "../components/Heading";
import { COLORS, HOST_API, SIZES } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
const Verification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData, userTutor } = route.params;
  console.log(userData);
  const imageID = userTutor.imgId.split("~");
  var major = " ";
  var classNo = " ";
  for (let index = 0; index < userTutor.subjects.length; index++) {
    if (index == userTutor.subjects.length - 1) {
      major += userTutor.subjects[index].name;
    } else {
      major += userTutor.subjects[index].name + ", ";
    }
    classNo = userTutor.subjects[index].level;
  }
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
              navigation.replace("Bottom Navigation");
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
              navigation.replace("Bottom Navigation");
            },
          },
          { defaultIndex: 1 },
        ]);
      });
  };

  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchTest();
  }, []);
  const fetchTest = async () => {
    const token = await AsyncStorage.getItem("token");

    setLoader(true);
    try {
      const response = await axios.get(
        HOST_API.local + `/api/tutor/test/${userData.id}`
      );
      console.log(response.data);
      setData(response.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <SafeAreaView style={{ marginTop: -20, marginBottom: 20 }}>
      <Heading title={"Xác minh tài khoản"} />

      <ScrollView style={{ marginTop: 20 }}>
        <View style={{ flex: 1, position: "absolute" }}>
          <TouchableOpacity
            style={{ marginLeft: "90%" }}
            onPressIn={() =>
              navigation.navigate("EditProfile", { userData, userTutor })
            }
          >
            <Ionicons name="create-outline" size={40} color={COLORS.main} />
          </TouchableOpacity>
        </View>
        <View style={styles.info}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={{
                uri: HOST_API.local + "/api/user/image/" + userTutor.imgAvatar,
              }}
              style={styles.profileImg}
            />
          </View>

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
            Môn dạy:
            <Text style={{ color: COLORS.black, fontSize: SIZES.medium + 2 }}>
              {" "}
              {major}
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
          <Text style={styles.sup}>Cằn cước công dân</Text>
        </View>
        <View
          style={{
            marginTop: -25,
            marginHorizontal: 10,
          }}
        >
          <View
            style={{
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <Image
              source={{
                uri: HOST_API.local + "/api/user/image/" + imageID[0],
              }}
              style={styles.idCard}
            />
            <Image
              source={{
                uri: HOST_API.local + "/api/user/image/" + imageID[1],
              }}
              style={styles.idCard}
            />
          </View>
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri:
                  HOST_API.local +
                  "/api/user/image/" +
                  userTutor.imgCertificate,
              }}
              style={styles.certificate}
            />
          </View>
        </View>

        {userTutor.status == 0 ? (
          <View>
            <TouchableOpacity
              style={styles.btnTest}
              onPressIn={() => navigation.navigate("TestTutor", { userTutor })}
            >
              <Text style={styles.txtTest}>
                Bài test môn {userTutor.subjects[0].name}{" "}
                {userTutor.subjects[0].level}
                <Text style={{ color: COLORS.main }}>{"   "}Làm ngay</Text>
              </Text>
            </TouchableOpacity>

            {userTutor.subjects[1] !== undefined && (
              <TouchableOpacity
                style={styles.btnTest}
                onPressIn={() => navigation.navigate("TestTutor")}
              >
                <Text style={styles.txtTest}>
                  Bài test môn {userTutor.subjects[1].name}{" "}
                  {userTutor.subjects[1].level}
                  <Text style={{ color: COLORS.main }}>{"   "}Làm ngay</Text>
                </Text>
              </TouchableOpacity>
            )}

            {userTutor.subjects[2] !== undefined && (
              <TouchableOpacity
                style={styles.btnTest}
                onPressIn={() => navigation.navigate("TestTutor")}
              >
                <Text style={styles.txtTest}>
                  Bài test môn {userTutor.subjects[2].name}{" "}
                  {userTutor.subjects[2].level}
                  <Text style={{ color: COLORS.main }}>{"   "}Làm ngay</Text>
                </Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.btn} onPress={createAttendance}>
              <Text>Xác minh tài khoản</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text
              style={[
                styles.txtTest,
                { marginLeft: 20, fontSize: SIZES.medium + 5 },
              ]}
            >
              {" "}
              Bài test
            </Text>
            <TouchableOpacity
              style={styles.btnTest}
              onPressIn={() => navigation.navigate("TestTutor", { userTutor })}
            >
              <Text style={styles.txtTest}>
                Môn {data[0]?.name} {data[0]?.level}
                <Text style={{ color: COLORS.main }}>
                  {" "}
                  {data[0]?.latestGrade == 0
                    ? "   Làm ngay"
                    : " Số điểm: " +
                      data[0]?.latestGrade +
                      " Số lần : " +
                      data[0]?.times}
                </Text>
              </Text>
            </TouchableOpacity>

            {userTutor.subjects[1] !== undefined && (
              <TouchableOpacity
                style={styles.btnTest}
                onPressIn={() => navigation.navigate("TestTutor")}
              >
                <Text style={styles.txtTest}>
                  Môn {data[1]?.name} {data[1]?.level}
                  <Text style={{ color: COLORS.main }}>
                    {" "}
                    {data[1]?.latestGrade == 0
                      ? "   Làm ngay"
                      : " Số điểm: " +
                        data[1]?.latestGrade +
                        " Số lần : " +
                        data[1]?.times}
                  </Text>
                </Text>
              </TouchableOpacity>
            )}

            {data[2] !== undefined && (
              <TouchableOpacity
                style={styles.btnTest}
                onPressIn={() => navigation.navigate("TestTutor")}
              >
                <Text style={styles.txtTest}>
                  Môn {data[2]?.name} {data[2]?.level}
                  <Text style={{ color: COLORS.main }}>
                    {" "}
                    {data[2]?.latestGrade == 0
                      ? "   Làm ngay"
                      : " Số điểm: " +
                        data[2]?.latestGrade +
                        " Số lần : " +
                        data[2]?.times}
                  </Text>
                </Text>
              </TouchableOpacity>
            )}
            {data[3] !== undefined && (
              <TouchableOpacity
                style={styles.btnTest}
                onPressIn={() => navigation.navigate("TestTutor")}
              >
                <Text style={styles.txtTest}>
                  Môn {data[3]?.name} {data[3]?.level}
                  <Text style={{ color: COLORS.main }}>
                    {data[3]?.latestGrade == 0
                      ? "   Làm ngay"
                      : " Số điểm: " +
                        data[3]?.latestGrade +
                        " Số lần : " +
                        data[3]?.times}
                  </Text>
                </Text>
              </TouchableOpacity>
            )}
            <View style={styles.btn}>
              <Text>Đã xác thực tài khoản</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Verification;

const styles = StyleSheet.create({
  certificate: {
    marginRight: 10,
    height: 300,
    width: 390,
    borderRadius: 20,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: 10,
  },

  idCard: {
    marginRight: 10,
    height: 120,
    width: "47%",
    borderRadius: 20,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "contain",
    marginTop: 10,
  },

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

  txtTest: {
    fontFamily: "semibold",
    color: COLORS.gray,
    color: COLORS.black,
    fontSize: SIZES.medium,
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

  btnTest: {
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 5,
  },

  profileImg: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: -20,
  },
});
