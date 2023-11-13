import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import Heading from "../components/Heading";
import { COLORS, SIZES } from "../constants";
import { useState } from "react";
import { Alert } from "react-native";

const FeedbackClass = () => {
  const route = useRoute();
  const { item } = route.params;
  const [checkEndDate, setCheckEndDate] = useState(false);
  const [content, setContent] = useState("");
  var date = new Date();
  var month = new Date().getMonth() + 1;
  var createDate =
    date.getDate() +
    "/" +
    month +
    "/" +
    date.getFullYear() +
    "  " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  var day = date.getDate() + "/" + month + "/" + date.getFullYear();
  if (day === item.request.dateEnd) {
    setCheckEndDate(true);
  }

  const handleCheckout = () => {
    const feedback = {
      date: createDate,
      content: content,
    };
    console.log(feedback);
    // Alert.alert(
    //   "Bạn có muốn điểm danh",
    //   "Thời gian: " + createDate + " " + createTime,
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => {},
    //     },
    //     {
    //       text: "Continue",
    //       onPress: () => {
    //         createAttendance(attendance);
    //         navigation.navigate("ManageClass", { profileId });
    //       },
    //     },
    //     { defaultIndex: 1 },
    //   ]
    // );
  };

  return (
    <SafeAreaView>
      <Heading title={"Đánh giá chất lượng"} />
      <View style={styles.class}>
        <View style={styles.classHeading}>
          <View style={styles.headingName}>
            <Text style={styles.name}>{item.request.major.join(" - ")}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.infoDetail}>
            <Text style={styles.sup}>
              Môn học: {item.request.major.join(", ")}
            </Text>
            <Text style={styles.sup}>Lớp học: {item.request.classNo}</Text>
            <Text style={styles.sup}>
              Ngày bắt đầu: {item.request.dateStart}
            </Text>
            <Text style={styles.sup}>
              Ngày kết thúc: {item.request.dateEnd}
            </Text>
            <Text style={styles.sup}>Gia sư: {item.tutor.name}</Text>
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
              Số buổi: {item.attendance.length}/ {item.request.slot}
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
          <Text style={styles.itemText}>Đánh giá chất lượng gia sư </Text>
          <TextInput
            style={styles.inputArea}
            value={content}
            multiline
            numberOfLines={10}
            onChangeText={(text) => setContent(text)}
            placeholder="Thông tin thêm"
          />
        </View>
        {item.attendance.length == item.request.slot ? (
          <TouchableOpacity onPress={handleCheckout}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>
                Gửi đánh giá - Kết thúc lớp học
              </Text>
            </View>
          </TouchableOpacity>
        ) : checkEndDate ? (
          <TouchableOpacity onPress={handleCheckout}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>
                Chưa hoàn hành - Đánh giá chất lượng
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleCheckout}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>
                Yêu cầu hủy - Đánh giá chất lượng
              </Text>
            </View>
          </TouchableOpacity>
        )}
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
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.main,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
