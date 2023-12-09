import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Heading from "../components/Heading";
import { SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { COLORS, HOST_API, SIZES } from "../constants";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { FlatList } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native";

const FeedbackTutor = () => {
  const route = useRoute();
  const { tutorDetail, idTutor } = route.params;
  const [tutorFeedback, setFeedback] = useState();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    const fetchClassDetail = async () => {
      try {
        const response = await axios.get(
          HOST_API.local + `/api/feedback/tutor/${idTutor}`
        );
        setFeedback(response.data.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoader(false);
      }
    };
    fetchClassDetail();
  }, []);

  const subject = (item) => {
    let major = " ";
    let classNo = " ";
    // console.log(item.subjects);
    for (let index = 0; index < item.subjects.length; index++) {
      console.log("item ", item.subjects[index].name);
      if (index == item.subjects.length - 1) {
        major += item.subjects[index].name;
      } else {
        major += item.subjects[index].name + ", ";
      }
      classNo = item.subjects[index].level;
    }
    return { major, classNo };
  };

  const Item = ({ item }) => (
    <View style={styles.feedback}>
      <View style={styles.feedbackInfo}>
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Text style={[styles.sup, { color: COLORS.black }]}>
            {item.rating}
          </Text>
          <Ionicons name={"star"} size={30} style={styles.startSelect} />
        </View>

        <Text style={styles.sup}>{item.dateCreate} </Text>
      </View>
      <View>
        <Text style={styles.sup}>
          Người đánh giá:
          <Text style={{ color: COLORS.black }}> {item.parentName}</Text>
        </Text>

        <Text style={styles.sup}>
          Môn học:
          <Text style={{ color: COLORS.black }}> {subject(item).major}</Text>
        </Text>
        <Text style={styles.sup}>
          Lớp học:
          <Text style={{ color: COLORS.black }}> {subject(item).classNo}</Text>
        </Text>
        <Text style={styles.sup}>
          Nội dung: <Text style={{ color: COLORS.black }}> {item.content}</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <Heading title={"Đánh giá gia sư "} />

      <View style={styles.info}>
        <View>
          <Text style={styles.sup}>Name: {tutorDetail.tutorName}</Text>
          <Text style={styles.sup}>Giới tính: {tutorDetail.gender}</Text>
          <Text style={styles.sup}>
            Địa chi: {tutorDetail.districtName}, {tutorDetail.provinceName}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 20, marginHorizontal: 20 }}>
        <Text style={styles.title}>Đáng gia chất lượng</Text>
      </View>

      {loader ? (
        <ActivityIndicator size={500} color={COLORS.main} />
      ) : (
        <View>
          <FlatList
            style={{ marginTop: 10, marginBottom: 40 }}
            data={tutorFeedback}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default FeedbackTutor;

const styles = StyleSheet.create({
  info: {
    marginTop: 30,
    marginHorizontal: 20,
    borderColor: COLORS.main,
    borderWidth: 0.5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  sup: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },

  title: {
    fontFamily: "bold",
    fontSize: SIZES.medium + 3,
    color: COLORS.primary,
  },

  feedback: {
    marginHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray2,
    borderRadius: 20,
    padding: 10,
  },

  feedbackInfo: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  startSelect: {
    color: "#FFCE0A",
    marginHorizontal: 5,
  },
});
