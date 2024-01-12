import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS, HOST_API, SIZES } from "../constants";
import { useState, useCallback } from "react";
import axios from "axios";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClassDetail = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { item, classDetail, user, userData } = route.params;
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    checkExitingApply();
    checkRoleTutor();
  }, []);

  console.log("detail: " + classDetail);
  console.log("item: " + item);
  const [userTutor, setUserTutor] = useState(null);
  const checkRoleTutor = async () => {
    const token = await AsyncStorage.getItem("token");
    if (userData?.role === "TUTOR") {
      setLoader(true);
      try {
        const dataTutor = await axios.get(
          HOST_API.local + `/api/tutor/profile`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (dataTutor !== null) {
          setUserTutor(dataTutor.data.data);
        }
      } catch (error) {
        console.log("Get tutor data error", error);
      } finally {
        setLoader(false);
      }
    }
  };

  const [listApply, setListApply] = useState([]);
  const [checkApply, setCheckApply] = useState(false);
  const checkExitingApply = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token !== "" || token !== null) {
      setLoader(true);
      try {
        const list = await axios.get(HOST_API.local + `/api/tutorApply/tutor`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (list !== null) {
          setListApply(list.data.data);
          checkApplied(list.data.data);
        }
      } catch (error) {
        console.log("Get user data error", error);
      } finally {
        setLoader(false);
      }
    }
  };

  const checkApplied = (list) => {
    for (let index = 0; index < list.length; index++) {
      if (list[index].clazzId === item.id) {
        // console.log("item ", list[index]);
        setCheckApply(true);
        break;
      }
    }
  };

  var major = " ";
  var classNo = " ";
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
    if (userData === null) {
      navigation.navigate("Login");
    } else {
      try {
        const response = await axios.post(
          HOST_API.local +
          `/api/tutorApply/create?clazzId=${classDetail.id}&tutorId=${user}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response.data);
        if (response.data.responseCode === "00") {
          setLoader(false);
          Alert.alert("Chúc mừng ", "Bạn đã apply thành công", [
            {
              text: "Cancel",
              onPress: () => { },
            },
            {
              text: "Continue",
              onPress: () => { },
            },
            { defaultIndex: 1 },
          ]);
        } else {
          Alert.alert("Lớp không trong trạng thái có thể đăng ký", "", [
            {
              text: "Cancel",
              onPress: () => { },
            },
            {
              text: "Continue",
              onPress: () => { },
            },
            { defaultIndex: 1 },
          ]);
        }
      } catch (error) {
        console.log(error.message);
        Alert.alert("Error", "error", [
          {
            text: "Cancel",
            onPress: () => { },
          },
          {
            text: "Continue",
            onPress: () => { },
          },
          { defaultIndex: 1 },
        ]);
      } finally {
        setLoader(false);
      }
    }

    // const url =
    //   HOST_API.local +
    //   `/api/tutorApply/create?clazzId=${classDetail.id}&tutorId=${user}`;
    // if (userData === null) {
    //   navigation.navigate("Login");
    // } else {
    //   const response = await fetch(url, {
    //     method: "POST", // *GET, POST, PUT, DELETE, etc.
    //     headers: {
    //       Authorization: "Bearer " + token,
    //     },
    //   });
    //   const result = await response.json();
    //   if (result.responseCode === "00") {
    //     Alert.alert("Chúc mừng ", "Bạn đã apply thành công", [
    //       {
    //         text: "Cancel",
    //         onPress: () => {},
    //       },
    //       {
    //         text: "Continue",
    //         onPress: () => {
    //           navigation.navigate("ManageApply");
    //         },
    //       },
    //       { defaultIndex: 1 },
    //     ]);
    //     setLoader(false);
    //   } else {
    //     Alert.alert("Bạn đã apply không thành công", [
    //       {
    //         text: "Cancel",
    //         onPress: () => {},
    //       },
    //       {
    //         text: "Continue",
    //         onPress: () => {},
    //       },
    //       { defaultIndex: 1 },
    //     ]);
    //   }
    // }
  };

  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.tuition);
  return (
    <SafeAreaView style={{}}>
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
      <ScrollView style={{ marginTop: 20 }}>
        {loader ? (
          <ActivityIndicator size={500} color={COLORS.main} />
        ) : (
          <View>
            <View style={styles.headingInfo}>
              <View style={styles.headingName}>
                <Text style={styles.name}>{major}</Text>
              </View>
            </View>
            <View style={styles.info}>
              <View style={styles.infoDetail}>
                <Text style={styles.title}>
                  <Ionicons
                    name="caret-forward-outline"
                    size={20}
                    color={COLORS.main}
                  />
                  Môn học:
                </Text>
                <Text style={styles.sup}>{major}</Text>
                <Text style={styles.title}>
                  <Ionicons
                    name="caret-forward-outline"
                    size={20}
                    color={COLORS.main}
                  />
                  Lớp học:
                </Text>
                <Text style={styles.sup}>{classNo}</Text>
                <Text style={styles.title}>
                  <Ionicons
                    name="caret-forward-outline"
                    size={20}
                    color={COLORS.main}
                  />
                  Giới tính:
                </Text>
                <Text style={styles.sup}>{item.gender}</Text>
                <Text style={styles.title}>
                  <Ionicons
                    name="caret-forward-outline"
                    size={20}
                    color={COLORS.main}
                  />
                  Địa điểm:
                </Text>
                <Text style={styles.sup}>
                  {item.provinceName}, {item.provinceName}
                </Text>
                <Text style={styles.title}>
                  <Ionicons
                    name="caret-forward-outline"
                    size={20}
                    color={COLORS.main}
                  />
                  Thời gian:
                </Text>
                <View
                  style={{
                    justifyContent: "space-around",
                    flexDirection: "row",
                  }}
                >
                  <View style={styles.dateForm}>
                    <Text style={styles.date}>{item?.dateStart}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Ionicons name="send" size={24} color={COLORS.main} />
                  </View>
                  <View style={styles.dateForm}>
                    <Text style={styles.date}>{item?.dateEnd}</Text>
                  </View>
                </View>
                <Text style={styles.title}>
                  <Ionicons
                    name="caret-forward-outline"
                    size={20}
                    color={COLORS.main}
                  />
                  Trình độ:
                </Text>
                <Text style={styles.sup}>{item.tutorLevel}</Text>
                <Text style={styles.title}>
                  <Ionicons
                    name="caret-forward-outline"
                    size={20}
                    color={COLORS.main}
                  />
                  Số buổi:
                </Text>
                <Text style={styles.sup}> {item.slots} buổi</Text>
                {item.status == 1 && (
                  <View style={{ marginLeft: 5 }}>
                    <Text style={styles.title}>
                      <Ionicons
                        name="caret-forward-outline"
                        size={20}
                        color={COLORS.main}
                      />
                      Trạng thái:
                    </Text>
                    <Text style={styles.sup}>Chưa có gia sư</Text>
                  </View>
                )}
                {item.status == 2 && (
                  <View>
                    <Text style={styles.title}>
                      <Ionicons
                        name="caret-forward-outline"
                        size={20}
                        color={COLORS.main}
                      />
                      Trạng thái:
                    </Text>
                    <Text style={[styles.sup, { color: COLORS.red }]}>
                      Đã có gia sư
                    </Text>
                  </View>
                )}
                {item.status == 3 && (
                  <View>
                    <Text style={styles.title}>
                      <Ionicons
                        name="caret-forward-outline"
                        size={20}
                        color={COLORS.main}
                      />
                      Trạng thái:
                    </Text>
                    <Text style={styles.sup}> Hoàn thành</Text>
                  </View>
                )}
              </View>

              <View style={styles.priceInfo}>
                <View style={styles.price}>
                  <Text style={styles.priceTxt}>Học phí</Text>
                  <Text
                    style={[
                      styles.priceTxt,
                      { paddingTop: 0, color: COLORS.red },
                    ]}
                  >
                    {formattedAmount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {loader ? (
          <ActivityIndicator size={500} color={COLORS.main} />
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {userData?.role === "TUTOR" &&
              userTutor?.status == 2 &&
              !checkApply ? (
              <TouchableOpacity style={styles.btnApply} onPress={createApply}>
                <Ionicons
                  name="receipt-outline"
                  size={30}
                  color={COLORS.black}
                />
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
            ) : checkApply ? (
              <View style={styles.btnApply}>
                <MaterialCommunityIcons
                  name="bookmark-check"
                  size={30}
                  color={COLORS.black}
                />
                <Text
                  style={{
                    marginLeft: 5,
                    fontFamily: "bold",
                    fontSize: SIZES.large,
                  }}
                >
                  Đã apply
                </Text>
              </View>
            ) : (
              userData?.role === "PARENT" && <View></View>
            )}
          </View>
        )}
      </ScrollView>
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
    marginTop: 15,
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
  // title: {
  //   marginHorizontal: 10,
  //   justifyContent: "space-between",
  //   flexDirection: "row",
  // },
  sup: {
    marginLeft: 10,
    fontFamily: "regular",
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: 5,
  },

  dateForm: {
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  date: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontFamily: "regular",
    fontSize: SIZES.large,
    color: COLORS.black,
  },

  title: {
    fontFamily: "regular",
    fontSize: SIZES.large,
    color: COLORS.main,
    marginBottom: 5,
  },

  infoDetail: {
    marginLeft: 15,
    marginTop: 5,
  },
  name: {
    padding: 10,
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.lightWhite,
  },
  priceTxt: {
    paddingVertical: 5,
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.main,
  },

  headingName: {
    marginTop: -10,
    width: 350,
    borderColor: COLORS.main,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    backgroundColor: COLORS.main,
  },

  name: {
    padding: 10,
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.lightWhite,
  },

  price: {
    width: 350,
    // borderColor: COLORS.main,
    borderRadius: 20,
    // borderWidth: 1,
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
  },

  info: {
    paddingVertical: 5,
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: -9,
    backgroundColor: COLORS.secondMain,
    // zIndex: 10,
  },

  headingInfo: {
    alignItems: "center",
    marginTop: 40,
    zIndex: 999,
  },
  priceInfo: {
    alignItems: "center",
    zIndex: 1,
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
  },

  wrapper: {
    marginTop: -25,
    backgroundColor: COLORS.lightWhite,
  },

  container: {
    backgroundColor: COLORS.lightWhite,
  },
});
