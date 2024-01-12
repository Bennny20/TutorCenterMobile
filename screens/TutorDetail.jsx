import {
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS, HOST_API, SIZES } from "../constants";
import axios from "axios";
import { ActivityIndicator } from "react-native";

const TutorDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { idTutor } = route.params;
  // console.log("Item: ", item);
  const [tutorDetail, setTutorDetail] = useState();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    const fetchClassDetail = async () => {
      try {
        const response = await axios.get(
          HOST_API.local + `/api/tutor/${idTutor}`
        );
        setTutorDetail(response.data.data);
        console.log(); (response.data.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoader(false);
      }
    };
    fetchClassDetail();
  }, []);

  console.log("tutorDetail: ", tutorDetail);

  var major = " ";
  var classNo = " ";
  for (let index = 0; index < tutorDetail?.subjects.length; index++) {
    if (index == tutorDetail?.subjects.length - 1) {
      major += tutorDetail?.subjects[index].name + ": " + tutorDetail?.subjects[index].latestGrade;
    } else {
      major += tutorDetail?.subjects[index].name + ": " + tutorDetail?.subjects[index].latestGrade + ", ";
    }
    classNo = tutorDetail?.subjects[index].level;
  }
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={40}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Thông tin của gia sư </Text>
        </View>
      </View>
      <ScrollView style={{ marginBottom: 80 }}>
        {loader ? (
          <ActivityIndicator size={500} color={COLORS.main} />
        ) : (
          <View style={{ marginTop: 60 }}>
            <View style={styles.tutorInfo}>
              <View style={styles.info}>
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={{
                      uri:
                        HOST_API.local +
                        "/api/user/image/" +
                        tutorDetail?.imgAvatar,
                    }}
                    style={styles.profileImg}
                  />
                </View>
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                  <Text style={styles.name}>{tutorDetail?.tutorName} </Text>
                  <Text style={styles.sup}>
                    Giới tính:{" "}
                    <Text style={[styles.sup, { color: COLORS.black }]}>
                      {tutorDetail?.gender}
                    </Text>
                  </Text>
                  <Text style={styles.sup}>
                    Khu vực:{" "}
                    <Text style={[styles.sup, { color: COLORS.black }]}>
                      {tutorDetail?.districtName}, {tutorDetail?.provinceName}
                    </Text>
                  </Text>
                  <Text style={styles.sup}>
                    Trình độ:{" "}
                    <Text style={[styles.sup, { color: COLORS.black }]}>
                      {" "}
                      {tutorDetail?.tutorLevel}{" "}
                    </Text>
                  </Text>
                  <Text style={styles.sup}>
                    {" "}
                    Trường đại học:{" "}
                    <Text style={[styles.sup, { color: COLORS.black }]}>
                      {" "}
                      {tutorDetail?.university}
                    </Text>
                  </Text>
                  <Text style={styles.sup}>
                    Chuyên ngành:{" "}
                    <Text style={[styles.sup, { color: COLORS.black }]}>
                      {tutorDetail?.major}
                    </Text>
                  </Text>
                  <Text style={styles.sup}>
                    Môn dạy:{" "}
                    <Text style={[styles.sup, { color: COLORS.black }]}>
                      {major}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10, marginLeft: 10 }}>
              <Text style={styles.name}>Bằng cấp, thông tin liên quan</Text>
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
                      tutorDetail?.imgCert,
                  }}
                  style={styles.certificate}
                />
              </View>
            </View>

            <View
              style={{
                alignItems: "center",
                marginTop: 10,
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                onPressIn={() =>
                  navigation.navigate("FeedbackTutor", {
                    tutorDetail,
                    idTutor,
                  })
                }
                style={styles.btnStyle}
              >
                <Text style={styles.btnText}>Xem đánh giá</Text>
              </TouchableOpacity>
            </View>
            <View></View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default TutorDetail;

const styles = StyleSheet.create({
  btnText: {
    fontFamily: "regular",
    color: COLORS.white,
    fontSize: 18,
    padding: 10,
  },

  btnStyle: {
    height: 50,
    marginVertical: 20,
    backgroundColor: COLORS.main,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  inputWrapper: {
    borderColor: COLORS.gray,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 100,
    width: "90%",
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  },

  ratingText: {
    color: COLORS.gray,
    fontFamily: "medium",
    paddingHorizontal: SIZES.xSmall,
  },
  rating: {
    top: SIZES.small - 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: SIZES.small,
  },
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

  sup: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },
  name: {
    fontFamily: "bold",
    fontSize: SIZES.medium + 3,
    color: COLORS.primary,
  },
  profileImg: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: 20,
  },

  info: {
    marginTop: -50,
    borderColor: COLORS.main,
    borderRadius: 30,
    borderWidth: 2,
    width: 350,
  },

  tutorInfo: { alignItems: "center" },

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
    marginTop: 30,
  },

  wrapper: {
    marginTop: 30,
    backgroundColor: COLORS.lightWhite,
  },
});
