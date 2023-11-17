import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS, HOST_API, SIZES } from "../constants";
import { ScrollView } from "react-native";
import TutorItemApply from "../components/Tutor/TuorItemApply";
import { useState, useCallback } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import { RefreshControl } from "react-native";
import CurrencyFormatter from "../components/CurrencyFormatter ";
import { FlatList } from "react-native";

const ClassDetail = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { item } = route.params;
  const [classDetail, setClassDetail] = useState();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    const fetchClassDetail = async () => {
      try {
        const response = await axios.get(
          HOST_API.local + `/api/clazz/${item.id}`
        );
        setClassDetail(response.data.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoader(false);
      }
    };
    fetchClassDetail();
  }, []);

  console.log(classDetail);
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  useEffect(() => {
    checkExitingUser();
    fetchListApply();
  }, []);

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
        setUserLogin(true);
        setUser(currentUser.data.data.id);
      }
    } catch (error) {
      console.log("Get user data error", error);
    } finally {
      setLoader(false);
    }
  };

  const [listApply, setListApply] = useState();
  const fetchListApply = async () => {
    console.log(user);
    setLoader(true);
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(
        HOST_API.local + `/api/tutorApply/tutor/${user}`,
        {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const result = await response.json();
      setListApply(response.data.data);
    } catch (error) {
      console.log("List apply error", error);
    } finally {
      setLoader(false);
    }
  };

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

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const createApply = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    console.log(classDetail.id);
    console.log(user);
    const url =
      HOST_API.local +
      `/api/tutorApply/create?clazzId=${classDetail.id}&tutorId=${user}`;
    if (userData == null) {
      navigation.navigate("Login");
    } else {
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const result = await response.json();
      if (result.responseCode === "00") {
        console.log(response.data);
        Alert.alert("Chúc mừng ", "Đăng kí tài khoản thành công", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {
              navigation.replace("Login");
            },
          },
          { defaultIndex: 1 },
        ]);
        setLoader(false);
      } else {
        Alert.alert("Error Logging im", "Please provide all require fields", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {},
          },
          { defaultIndex: 1 },
        ]);
        G;
      }
    }
  };

  var check = 0;
  // for (var temp of item.apply) {
  //   if (temp.idTutor === userData?.user.profile.id) {
  //     check += 1;
  //   }
  // }

  // const classInfo = item;
  // var tutorApply = null;
  // if (item.tutor != undefined) {
  //   for (var temp of item.apply) {
  //     if (temp.idTutor == item.tutor.id) {
  //       tutorApply = temp;
  //       break;
  //     }
  //   }
  // }
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.tuition);
  return (
    <SafeAreaView style={{ marginBottom: 350 }}>
      <View styles={styles.container}>
        <View style={styles.wrapper}>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-circle"
                size={40}
                color={COLORS.lightWhite}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>Thông tin của lớp </Text>
          </View>
        </View>
      </View>
      <View style={styles.headingInfo}>
        <View style={styles.headingName}>
          <Text style={styles.name}>{item.address}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoDetail}>
          <Text style={styles.sup}>Mon hoc: {major}</Text>
          <Text style={styles.sup}>Lop: {classNo}</Text>
          <Text style={styles.sup}>Gioi tinh:{item.gender}</Text>
          <Text style={styles.sup}>
            Dia diem: {item.address}, {item.provinceName}
          </Text>
          <Text style={styles.sup}>Ngay hoc: {item.dateStart}</Text>
          <Text style={styles.sup}>Ngay kết thúc: {item.dateEnd}</Text>
          <Text style={styles.sup}>Giá tiền: {formattedAmount}</Text>
          <Text style={styles.sup}>Trình độ: {item.tutorLevel}</Text>
          <Text style={styles.sup}>Số buổi: {item.slot} </Text>
          {item.status == 0 && (
            <Text style={styles.sup}>Trạng thái: Chưa có gia sư</Text>
          )}
          {item.status == 1 && (
            <Text style={styles.sup}>Trạng thái: Đã có gia sư</Text>
          )}
          {item.status == 2 && (
            <Text style={styles.sup}>Trạng thái: Hoàn thành</Text>
          )}
        </View>
      </View>

      <View style={{ marginTop: 5 }}>
        <View style={styles.title}>
          <Text style={styles.titleText}> Thong tin gia su</Text>
          <Text style={styles.titleText}>Trang thai</Text>
        </View>
      </View>

      {loader ? (
        <ActivityIndicator size={500} color={COLORS.main} />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {userData?.role === "TUTOR" ? (
            <TouchableOpacity style={styles.btnApply} onPress={createApply}>
              <Ionicons name="receipt-outline" size={30} color={COLORS.black} />
              <Text
                style={{
                  marginLeft: 5,
                  fontFamily: "bold",
                  fontSize: SIZES.large,
                }}
              >
                Apply
              </Text>
            </TouchableOpacity>
          ) : (
            userData?.role === "PARENT" && <View></View>
          )}
        </View>
      )}

      {/* <View style={{ marginTop: 10, marginHorizontal: 5, marginBottom: 5000 }}>
        {tutorApply != null ? (
          <View>
            <TouchableOpacity style={styles.containerTutor}>
              <View style={styles.image}>
                <Image
                  source={{
                    uri: "https://img.freepik.com/premium-photo/blue-white-sign-with-man-white-shirt-blue-circle-with-man-front-it_745528-3249.jpg?w=2000",
                  }}
                  style={styles.productImg}
                />
              </View>
              <View style={styles.textContentTutor}>
                <Text style={styles.nameTutor}>{tutorApply.nameTutor}</Text>
                <Text style={styles.supplier}>{tutorApply.major}</Text>
                <Text style={styles.supplier}>{tutorApply.university}</Text>
                <Text style={styles.supplier}>{tutorApply.subject}</Text>
                <Text style={styles.supplier}>{tutorApply.address}</Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={styles.titleText}>Đánh giá chất lượng</Text>
              <View
                style={{
                  marginTop: 5,
                  borderColor: COLORS.main,
                  borderWidth: 2,
                  height: 100,
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <Text style={styles.nameTutor}>
                  Người đánh giá: {tutorApply.nameTutor}
                </Text>
                <Text style={styles.supplier}> {tutorApply.nameTutor}</Text>
                <Text style={styles.supplier}> {tutorApply.nameTutor}</Text>
              </View>
            </View>
          </View>
        ) : loader ? (
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primarys} />
        ) : (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{ marginBottom: 100 }}
            data={item.apply}
            renderItem={({ item }) => (
              <TutorItemApply
                item={item}
                profile={userData}
                classInfo={classInfo}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View> */}
    </SafeAreaView>
  );
};

export default ClassDetail;

const styles = StyleSheet.create({
  textContentTutor: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  supplier: {
    fontSize: SIZES.medium - 2,
    fontFamily: "bold",
    color: COLORS.gray,
    marginTop: 3,
  },

  productImg: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
  image: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
  },
  containerTutor: {
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: COLORS.main,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SIZES.small,
    flexDirection: "row",
    padding: SIZES.small - 5,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    shadowColor: COLORS.lightWhite,
  },
  nameTutor: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },
  btnStatus: {
    marginBottom: 30,
  },

  btnApplied: {
    flexDirection: "row",
    paddingHorizontal: 30,
    padding: 4,
    borderWidth: 2,
    alignItems: "center",
    backgroundColor: COLORS.red,
    borderRadius: 10,
  },

  btnApply: {
    flexDirection: "row",
    paddingHorizontal: 30,
    padding: 4,
    borderWidth: 2,
    alignItems: "center",
    backgroundColor: COLORS.secondMain,
    borderRadius: 10,
  },

  titleText: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.main,
  },
  title: {
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  sup: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 10,
  },

  infoDetail: {
    marginLeft: 15,
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
    marginHorizontal: 50,
    marginTop: -10,
    backgroundColor: COLORS.secondMain,
  },

  headingInfo: {
    alignItems: "center",
    marginTop: 40,
    zIndex: 999,
  },

  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },

  upperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },

  wrapper: {
    marginTop: -25,
    backgroundColor: COLORS.lightWhite,
  },

  container: {
    backgroundColor: COLORS.lightWhite,
  },
});
