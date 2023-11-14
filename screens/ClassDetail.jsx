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
import { COLORS, SIZES } from "../constants";
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

  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [loader, setLoader] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const route = useRoute();
  const { item } = route.params;
  console.log(item);
  const majors = item.request.major.join(" - ");

  useEffect(() => {
    checkExitingUser();
  }, []);

  const checkExitingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);
      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      }
    } catch (error) {
      console.log("Error retrieving the data: ", error);
    }
  };

  const createApply = () => {
    if (userData == null) {
      navigation.navigate("Login");
    } else {
      const data = {
        tutor: userData?.user.profile.id,
        classId: item._id,
      };
      const profileId = data.tutor;
      console.log(data);
      axios
        .post("https://tutor-center.onrender.com/class/apply", data)
        .then((response) => {
          console.log(response.data);
          Alert.alert("Đăng kí thành công", "Quản lý apply", [
            {
              text: "Cancel",
              onPress: () => navigation.navigate("ClassDetail", { item }),
            },
            {
              text: "Continue",
              onPress: () => {
                navigation.replace("ManageApply", { profileId });
              },
            },
            { defaultIndex: 1 },
          ]);
        })
        .catch((error) => {
          Alert.alert("Tạo yêu cầu không thành công", "Quản lý yêu cầu", [
            {
              text: "Cancel",
              onPress: () => {},
            },
            {
              text: "Continue",
              onPress: () => {
                navigation.navigate("ManageApply", { profileId });
              },
            },
            { defaultIndex: 1 },
          ]);
          console.log("Create failed", error);
        });
    }
  };

  var check = 0;
  for (var temp of item.apply) {
    if (temp.idTutor === userData?.user.profile.id) {
      check += 1;
    }
  }

  const classInfo = item;
  var tutorApply = null;
  if (item.tutor != undefined) {
    for (var temp of item.apply) {
      if (temp.idTutor == item.tutor.id) {
        tutorApply = temp;
        break;
      }
    }
  }
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.request.price);
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
          <Text style={styles.name}>{item.request.address}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoDetail}>
          <Text style={styles.sup}>Mon hoc: {majors}</Text>
          <Text style={styles.sup}>Lop: {item.request.classNo}</Text>
          <Text style={styles.sup}>Gioi tinh:{item.request.gender}</Text>
          <Text style={styles.sup}>Dia diem: {item.request.address}</Text>
          {/* <Text style={styles.sup}>Ngay hoc: {request.classNo}</Text>
          <Text style={styles.sup}>Ngay kết thúc: {request.classNo}</Text> */}
          <Text style={styles.sup}>Giá tiền: {formattedAmount}</Text>
          <Text style={styles.sup}>
            Học lực: {item.request.academicAbility}
          </Text>
          <Text style={styles.sup}>Trình độ: {item.request.level}</Text>
          <Text style={styles.sup}>Số buổi: {item.request.slot} buổi</Text>
          <Text style={styles.sup}>Trạng thái: {item.status}</Text>
        </View>
      </View>

      <View style={{ marginTop: 5 }}>
        <View style={styles.title}>
          <Text style={styles.titleText}> Thong tin gia su</Text>
          <Text style={styles.titleText}>Trang thai</Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {userData?.user.role === "USER_PARENT" ? (
          <View></View>
        ) : check < 1 ? (
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
          <View style={styles.btnApplied}>
            <Ionicons name="receipt-outline" size={30} color={COLORS.white} />
            <Text
              style={{
                marginLeft: 5,
                fontFamily: "bold",
                fontSize: SIZES.large,
                color: COLORS.white,
              }}
            >
              Đã apply
            </Text>
          </View>
        )}
      </View>
      <View style={{ marginTop: 10, marginHorizontal: 5, marginBottom: 5000 }}>
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
      </View>
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
