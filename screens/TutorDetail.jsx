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
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoader(false);
      }
    };
    fetchClassDetail();
  }, []);
  return (
    <View>
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
            <Text style={styles.heading}>Thông tin của gia su </Text>
          </View>
        </View>
        {loader ? (
          <ActivityIndicator size={500} color={COLORS.main} />
        ) : (
          <ScrollView style={{ marginTop: 60 }}>
            <View style={styles.tutorInfo}>
              <View style={styles.info}>
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={require("../assets/images/profile.jpeg")}
                    style={styles.profileImg}
                  />
                </View>
                <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
                  <Text style={styles.name}>{tutorDetail?.tutorName} </Text>
                  <Text style={styles.sup}>
                    Giới tính: {tutorDetail?.gender}
                  </Text>
                  <Text style={styles.sup}>
                    Địa chỉ: {tutorDetail?.address}
                  </Text>
                  <Text style={styles.sup}>
                    {tutorDetail?.districtName}, {tutorDetail?.provinceName}
                  </Text>
                  <Text style={styles.sup}>Sinh viên </Text>
                  <Text style={styles.sup}>
                    Trường đại học:{tutorDetail?.gender}
                  </Text>
                  <Text style={styles.sup}>
                    Chuyên môn: {tutorDetail?.major}
                  </Text>
                  <Text style={styles.sup}>
                    Kinh nghiệm: {tutorDetail?.major}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ marginTop: 10, marginLeft: 10 }}>
              <Text style={styles.name}>Bằng cấp, thông tin liên quan</Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                {/* <Image
                source={{ uri: item.certificate[0] }}
                style={styles.certificate}
              />
              <Image
                source={{ uri: item.certificate[1] }}
                style={styles.certificate}
              /> */}
              </View>
            </View>

            <View
              style={{ alignItems: "center", marginTop: 10, marginBottom: 20 }}
            >
              <TouchableOpacity
                onPressIn={() =>
                  navigation.navigate("FeedbackTutor", { tutorDetail, idTutor })
                }
                style={styles.btnStyle}
              >
                <Text style={styles.btnText}>Xem đánh giá</Text>
              </TouchableOpacity>
            </View>
            <View>
              <FlatList />
            </View>
          </ScrollView>
        )}
      </View>
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
    height: 155,
    width: 190,
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
    marginTop: 30,
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
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 1,
  },

  wrapper: {
    marginTop: 30,
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
});
