import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import Heading from "../components/Heading";
import { COLORS, HOST_API, SIZES } from "../constants";
import { useState } from "react";
import { Alert } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from "react";

const FeedbackClass = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, length, user } = route.params;
  const { checkEndDate, setCheckEndDate } = useState(false);
  const [content, setContent] = useState("");
  const [startRating1, setStartRating1] = useState(null);
  const [startRating2, setStartRating2] = useState(null);
  const [startRating3, setStartRating3] = useState(null);
  const [startRating4, setStartRating4] = useState(null);
  const [startRating5, setStartRating5] = useState(null);

  var date = new Date();
  var month = new Date().getMonth() + 1;
  var day = date.getDate() + "/" + month + "/" + date.getFullYear();
  if (day === item.dateEnd) {
    setCheckEndDate(true);
  }

  const createFeedback = async () => {
    const token = await AsyncStorage.getItem("token");
    const feedback = {
      clazzId: item.id,
      tutorId: item.tutor.id,
      professionalSkill: startRating2,
      supportOt: startRating1,
      pedagogicalSkill: startRating3,
      workingStyle: startRating4,
      courseCover: startRating5,
      content: content,
    };
    console.log(feedback);
    axios
      .post(
        HOST_API.local + `/api/feedback/create`,
        {
          clazzId: item.id,
          tutorId: item.tutor.id,
          professionalSkill: startRating2,
          supportOt: startRating1,
          pedagogicalSkill: startRating3,
          workingStyle: startRating4,
          courseCover: startRating5,
          content: content,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        Alert.alert("Tạo điểm danh thành công", "Quản lý lớp", [
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
      })
      .catch((error) => {
        Alert.alert("Tạo điểm danh không thành công", "Quản lý lớp", [
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
        console.log("Create failed", error);
      });
  };

  const handleCheckout = () => {
    Alert.alert("Bạn có muốn gửi đánh giá ", " ", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Continue",
        onPress: () => {
          createFeedback();
        },
      },
      { defaultIndex: 1 },
    ]);
  };
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.tuition);

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
  const [checkFeedback, setCheckFeedback] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);
  const fetchFeedback = async () => {
    const token = await AsyncStorage.getItem("token");

    setLoader(true);
    try {
      const response = await axios.get(
        HOST_API.local + `/api/feedback/clazz/${item.id}`
      );
      setData(response.data);
      if (response.data.data.length != 0) {
        setCheckFeedback(true);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };
  console.log(item);
  return (
    <SafeAreaView>
      <Heading title={"Đánh giá chất lượng"} />
      <View style={styles.class}>
        <View style={styles.classHeading}>
          <View style={styles.headingName}>
            <Text style={styles.name}>{majors({ item }).major}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.infoDetail}>
            {/* <Text style={styles.sup}>Môn học: {majors({ item }).classNo}</Text> */}
            {/* <Text style={styles.sup}>{majors({ item }).classNo}</Text> */}
            <Text style={styles.sup}>Ngày bắt đầu: {item.dateStart}</Text>
            <Text style={styles.sup}>Ngày kết thúc: {item.dateEnd}</Text>
            <Text style={styles.sup}>
              {item.tutor
                ? " Gia sư: " + item.tutor.name
                : "Phụ huynh: " + item.parentName}
            </Text>

            <Text style={styles.sup}>{formattedAmount}</Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: -10,
            marginHorizontal: 10,
          }}
        >
          <View style={styles.createAttendance}>
            <Text style={styles.titleText}>
              Số buổi: {length}/ {item.slots}
            </Text>
          </View>
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
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <View>
          <KeyboardAwareScrollView extraScrollHeight={-20}>
            <Text style={styles.itemText}>Đánh giá chất lượng gia sư </Text>

            <View style={{ flexDirection: "row" }}></View>
            {loader ? (
              <ActivityIndicator size={500} color={COLORS.main} />
            ) : checkFeedback ? (
              <View
                style={{ backgroundColor: COLORS.lightWhite, borderRadius: 20 }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    marginHorizontal: 20,
                  }}
                >
                  <Text style={[styles.itemText, { color: COLORS.primary }]}>
                    {data.data[0].parentName}
                  </Text>
                  <Text style={[styles.itemText, { color: COLORS.primary }]}>
                    {data.data[0].dateCreate}
                  </Text>
                </View>
                <View
                  style={{
                    marginHorizontal: 20,
                  }}
                >
                  <Text style={[styles.itemText, { color: COLORS.primary }]}>
                    {data.data[0].tutorName}
                  </Text>
                  <Text style={[styles.itemText, { color: COLORS.primary }]}>
                    {data.data[0].content}
                  </Text>
                </View>
              </View>
            ) : !checkFeedback ? (
              <View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text>Hỗ trợ ngoài giờ</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity onPress={() => setStartRating1(1)}>
                        <Ionicons
                          name={startRating1 >= 1 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating1 >= 1
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating1(2)}>
                        <Ionicons
                          name={startRating1 >= 2 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating1 >= 2
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating1(3)}>
                        <Ionicons
                          name={startRating1 >= 3 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating1 >= 3
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating1(4)}>
                        <Ionicons
                          name={startRating1 >= 4 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating1 >= 4
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating1(5)}>
                        <Ionicons
                          name={startRating1 >= 5 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating1 >= 5
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/*  */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text>Kỹ năng</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity onPress={() => setStartRating2(1)}>
                        <Ionicons
                          name={startRating2 >= 1 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating2 >= 1
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating2(2)}>
                        <Ionicons
                          name={startRating2 >= 2 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating2 >= 2
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating2(3)}>
                        <Ionicons
                          name={startRating2 >= 3 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating2 >= 3
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating2(4)}>
                        <Ionicons
                          name={startRating2 >= 4 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating2 >= 4
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating2(5)}>
                        <Ionicons
                          name={startRating2 >= 5 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating2 >= 5
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/*  */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text>Kỹ năng dạy</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity onPress={() => setStartRating3(1)}>
                        <Ionicons
                          name={startRating3 >= 1 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating3 >= 1
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating3(2)}>
                        <Ionicons
                          name={startRating3 >= 2 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating3 >= 2
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating3(3)}>
                        <Ionicons
                          name={startRating3 >= 3 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating3 >= 3
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating3(4)}>
                        <Ionicons
                          name={startRating3 >= 4 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating3 >= 4
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating3(5)}>
                        <Ionicons
                          name={startRating3 >= 5 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating3 >= 5
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/*  */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text>Đúng giờ</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity onPress={() => setStartRating4(1)}>
                        <Ionicons
                          name={startRating4 >= 1 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating4 >= 1
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating4(2)}>
                        <Ionicons
                          name={startRating4 >= 2 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating4 >= 2
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating4(3)}>
                        <Ionicons
                          name={startRating4 >= 3 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating4 >= 3
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating4(4)}>
                        <Ionicons
                          name={startRating4 >= 4 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating4 >= 4
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating4(5)}>
                        <Ionicons
                          name={startRating4 >= 5 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating4 >= 5
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/*  */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Text>Khóa học</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity onPress={() => setStartRating5(1)}>
                        <Ionicons
                          name={startRating5 >= 1 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating5 >= 1
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating5(2)}>
                        <Ionicons
                          name={startRating5 >= 2 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating5 >= 2
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating5(3)}>
                        <Ionicons
                          name={startRating5 >= 3 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating5 >= 3
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating5(4)}>
                        <Ionicons
                          name={startRating5 >= 4 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating5 >= 4
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setStartRating5(5)}>
                        <Ionicons
                          name={startRating5 >= 5 ? "star" : "star-outline"}
                          size={35}
                          style={
                            startRating5 >= 5
                              ? styles.startSelect
                              : styles.startUnSelect
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <TextInput
                    style={styles.inputArea}
                    value={content}
                    multiline
                    numberOfLines={10}
                    onChangeText={(text) => setContent(text)}
                    placeholder="Thông tin thêm"
                  />

                  <TouchableOpacity onPress={handleCheckout}>
                    <View style={styles.btn}>
                      <Text style={styles.btnText}>GỬI ĐÁNH GIÁ</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View></View>
            )}
          </KeyboardAwareScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FeedbackClass;

const styles = StyleSheet.create({
  headingName: {
    marginTop: -10,
    width: 300,
    borderColor: COLORS.main,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    backgroundColor: COLORS.main,
  },

  classHeading: {
    alignItems: "center",
    marginTop: 40,
    zIndex: 999,
  },
  name: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.lightWhite,
  },
  info: {
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: -10,
    backgroundColor: COLORS.secondMain,
  },
  infoDetail: {
    marginLeft: 20,
    marginTop: 10,
  },
  sup: {
    fontFamily: "regular",
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: 5,
  },
  titleText: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  createAttendance: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: COLORS.black,
    borderWidth: 2,
    backgroundColor: COLORS.secondMain,
    borderRadius: 20,
  },
  itemText: {
    padding: 10,
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.main,
  },
  inputArea: {
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    height: 90,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
  },
  btnText: {
    borderWidth: 2,
    borderColor: COLORS.main,
    padding: 15,
    borderRadius: 15,
    fontFamily: "regular",
    fontWeight: "bold",
    fontSize: SIZES.medium,
    color: COLORS.main,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  startSelect: {
    color: "#FFCE0A",
    marginHorizontal: 5,
  },
  startUnSelect: {
    color: "black",
    marginHorizontal: 5,
  },
});
