import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Heading from "../components/Heading";
import { COLORS, SIZES } from "../constants";

const ManageClass = () => {
  const navigation = useNavigation();
  const classes = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13];

  return (
    <SafeAreaView>
      <Heading title={"Danh sách lớp "} />
      <ScrollView style={{ marginTop: 40, marginBottom: 40 }}>
        <View>
          {classes.map((item) => (
            <View style={styles.requestItem}>
              <View style={styles.requestInfo}>
                <Text style={styles.requestTitle}>Tên khóa học</Text>
                <Text style={styles.requestSup}>Thông tin </Text>
                <Text style={styles.requestSup}>Thông tin </Text>
                <Text style={styles.requestSup}>Thông tin </Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("AttendancePage")}
                style={styles.requestStatus}
              >
                <View
                  style={{
                    backgroundColor: COLORS.lightWhite,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: COLORS.main,
                  }}
                >
                  <Text style={styles.requestStatusBtn}>Điểm danh </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageClass;

const styles = StyleSheet.create({
  requestStatusBtn: {
    padding: 8,

    fontFamily: "bold",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },

  requestStatus: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.main,
  },

  requestSup: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },

  requestTitle: {
    fontFamily: "bold",
    fontSize: SIZES.medium + 3,
    color: COLORS.black,
  },

  requestInfo: {},

  requestItem: {
    borderWidth: 2,
    borderColor: COLORS.black,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.secondMain,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 15,
  },
});
