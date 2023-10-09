import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../constants";
import { ScrollView } from "react-native";
import TutorItem from "../components/Tutor/TutorItem";
import { FlatList } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import TutorItemApply from "../components/Tutor/TuorItemApply";

const ClassDetail = () => {
  const navigation = useNavigation();
  const tutorApplies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

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
            <Text style={styles.heading}>Thông tin của lop </Text>
          </View>
        </View>
      </View>
      <View style={styles.headingInfo}>
        <View style={styles.headingName}>
          <Text style={styles.name}>Ten cua lop</Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoDetail}>
          <Text style={styles.sup}>Mon hoc: </Text>
          <Text style={styles.sup}>Lop hoc:</Text>
          <Text style={styles.sup}>Gioi tinh: </Text>
          <Text style={styles.sup}>Dia diem:</Text>
          <Text style={styles.sup}>Ngay hoc</Text>
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <View style={styles.title}>
          <Text style={styles.titleText}> Thong tin gia su</Text>
          <Text style={styles.titleText}>Trang thai</Text>
        </View>
        <View>
          {/* <FlatList
            removeClippedSubviews={true}
            data={tutorApplies}
            renderItem={({ item }) => <TutorItem />}
            contentContainerStyle={{ columnGap: SIZES.medium }}
          /> */}
          <ScrollView style={{ marginTop: 10 }}>
            <View style={styles.tableBody}>
              {tutorApplies.map((item) => (
                <TutorItemApply />
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ClassDetail;

const styles = StyleSheet.create({
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
    fontSize: SIZES.large,
    color: COLORS.black,
    marginBottom: 10,
  },

  infoDetail: {
    marginLeft: 20,
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
    marginTop: 50,
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
    marginTop: 30,
    backgroundColor: COLORS.lightWhite,
  },

  container: {
    backgroundColor: COLORS.lightWhite,
  },
});
