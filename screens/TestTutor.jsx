import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { COLORS, HOST_API, SIZES, SUBMIT, ANSWER } from "../constants";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import CountDown from "react-native-countdown-component";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TestTutor = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // const { userTutor } = route.params;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();
  const fetchTest = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        HOST_API.local + `/api/question/exam/45`
      );
      setData(response.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchTest();
  }, []);

  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);
  const [value, setValue] = useState();

  const [currentStep, setCurrentStep] = useState(0);

  const check = (value, stt, item) => {
    SUBMIT[stt] = {
      subjectId: 45,
      questionId: item.id,
      answerId: item.answers[value - 1].id,
    };
    ANSWER[stt].value = value;
    console.log(ANSWER[stt]);
  };

  const send = (value, stt, item) => {
    SUBMIT[stt] = {
      subjectId: 45,
      questionId: item.id,
      answerId: item.answers[value - 1].id,
    };

    submit();
  };

  const submit = async () => {
    const value = SUBMIT;
    console.log(value);
    const token = await AsyncStorage.getItem("token");
    axios
      .put(HOST_API.local + `/api/question/submit`, value, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      .then((response) => {
        console.log(response.data);
        navigation.navigate("Profile");
      })
      .catch((error) => {
        navigation.navigate("Profile");
        console.log("Create failed", error);
      });

    const response = await fetch(HOST_API.local + `/api/question/submit`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(value),
    });
    const result = await response.json();
    console.log(result.responseCode);
  };

  const choice = (choiceValue) => {
    if (choiceValue == 0) {
      setOption1(false);
      setOption2(false);
      setOption3(false);
      setOption4(false);
    }
    if (choiceValue == 1) {
      if (option1) {
      }
      if (!option1) {
        setOption1(true);
      }
      setOption2(false);
      setOption3(false);
      setOption4(false);
    }
    if (choiceValue == 2) {
      setOption1(false);

      if (option2) {
        setOption2(false);
      }
      if (!option2) {
        setOption2(true);
      }
      setOption3(false);
      setOption4(false);
    }
    if (choiceValue == 3) {
      setOption1(false);
      setOption2(false);
      if (option3) {
        setOption3(false);
      }
      if (!option3) {
        setOption3(true);
      }
      setOption4(false);
    }
    if (choiceValue == 4) {
      setOption1(false);
      setOption2(false);
      setOption3(false);
      if (option4) {
        setOption4(false);
      }
      if (!option4) {
        setOption4(true);
      }
    }
  };

  const finish = () => {
    Alert.alert("Thời gian làm bài kết thúc", "", [
      {
        text: "Continue",
        // onPress: () => {
        //   navigation.navigate("History", { item, order });
        // },
      },
      { defaultIndex: 1 },
    ]);
  };
  return (
    <SafeAreaView>
      {/* <View style={{ marginLeft: 20, marginTop: 10 }}>
        <Text style={styles.heading}>Bài kiểm tra chất lượng </Text>
      </View> */}
      <Heading title={"Bài kiểm tra chất lượng"} />

      {loader ? (
        <ActivityIndicator size={500} color={COLORS.main} />
      ) : (
        <View style={{ marginTop: 20 }}>
          {data?.map((item, stt = 0) => (
            <View style={{ marginHorizontal: 20 }}>
              {currentStep === stt && (
                <View>
                  <Text style={styles.question}>Câu: {stt + 1}/20 </Text>
                  <Text style={styles.question}>{item.content} </Text>

                  <View>
                    <View style={styles.option}>
                      <TouchableOpacity
                        onPress={() => {
                          setValue(1);
                          choice(1);
                        }}
                      >
                        <Ionicons
                          name={
                            option1
                              ? "radio-button-on-outline"
                              : "radio-button-off-outline"
                          }
                          size={25}
                        />
                      </TouchableOpacity>
                      <Text style={styles.answer}>
                        {" "}
                        {item.answers[0].content}
                      </Text>
                    </View>
                    <View style={styles.option}>
                      <TouchableOpacity
                        onPress={() => {
                          setValue(2);
                          choice(2);
                        }}
                      >
                        <Ionicons
                          name={
                            option2
                              ? "radio-button-on-outline"
                              : "radio-button-off-outline"
                          }
                          size={24}
                        />
                      </TouchableOpacity>
                      <Text style={styles.answer}>
                        {" "}
                        {item.answers[1].content}
                      </Text>
                    </View>
                    {item.answers[2].content !== undefined && (
                      <View style={styles.option}>
                        <TouchableOpacity
                          onPress={() => {
                            setValue(3);
                            choice(3);
                          }}
                        >
                          <Ionicons
                            name={
                              option3
                                ? "radio-button-on-outline"
                                : "radio-button-off-outline"
                            }
                            size={24}
                          />
                        </TouchableOpacity>
                        <Text style={styles.answer}>
                          {" "}
                          {item.answers[2].content}
                        </Text>
                      </View>
                    )}
                    {item.answers[3].content !== undefined && (
                      <View style={styles.option}>
                        <TouchableOpacity
                          onPress={() => {
                            setValue(4);
                            choice(4);
                          }}
                        >
                          <Ionicons
                            name={
                              option4
                                ? "radio-button-on-outline"
                                : "radio-button-off-outline"
                            }
                            size={24}
                          />
                        </TouchableOpacity>
                        <Text style={styles.answer}>
                          {" "}
                          {item.answers[3].content}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.space}>
                    {stt > 0 ? (
                      <TouchableOpacity
                        onPress={() => {
                          choice(ANSWER[stt - 1].value);
                          setCurrentStep(stt - 1);
                        }}
                        style={styles.btn}
                      >
                        <Text style={{ fontSize: 20 }}>Quay lại </Text>
                        <MaterialCommunityIcons
                          name={"page-previous"}
                          size={30}
                        />
                      </TouchableOpacity>
                    ) : (
                      <View></View>
                    )}
                    {stt == data.length - 1 ? (
                      <TouchableOpacity
                        onPress={() => {
                          send(value, stt, item);
                        }}
                        style={styles.btn}
                      >
                        <Text style={{ fontSize: 20 }}>Gửi kết quả </Text>
                        <Ionicons
                          name={"checkmark-done-circle-outline"}
                          size={30}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          choice(0);
                          setCurrentStep(stt + 1);
                          check(value, stt, item);
                        }}
                        style={styles.btn}
                      >
                        <Text style={{ fontSize: 20 }}>Tiếp theo </Text>
                        <MaterialCommunityIcons name={"page-next"} size={30} />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

export default TestTutor;

const styles = StyleSheet.create({
  space: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
    color: COLORS.main,
    marginLeft: 5,
  },

  textHeading: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.black,
    marginLeft: 5,
  },

  option: {
    marginHorizontal: 20,
    flexDirection: "row",
    marginBottom: 10,
  },

  question: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.black,
    marginLeft: 5,
    marginBottom: 5,
  },

  answer: {
    color: COLORS.black,
    fontSize: SIZES.medium + 2,
  },

  btn: {
    borderColor: COLORS.main,
    borderWidth: 2,
    padding: 5,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
  },

  btnSend: {
    borderColor: COLORS.main,
    borderWidth: 2,
    padding: 5,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    marginRight: 15,
  },
});
