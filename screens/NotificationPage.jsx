import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import Heading from "../components/Heading";
import { ScrollView } from "react-native";
import { COLORS, SIZES } from "../constants";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationPage = () => {
  const notificationList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <SafeAreaView>
      <Heading title={"Notification"} />
      <ScrollView style={{ marginTop: 40, marginBottom: 40 }}>
        <View>
          {notificationList.map((item) => (
            <View style={styles.notificationItem}>
              <View style={styles.info}>
                <Text style={styles.date}>22/10/2023</Text>
                <Text style={styles.mess}>Thong bao</Text>
              </View>
              <TouchableOpacity style={styles.btnDelete}>
                <Ionicons name="trash" size={34} color={COLORS.red} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationPage;

const styles = StyleSheet.create({
  btnDelete: {
    justifyContent: "center",
    alignItems: "center",
  },

  date: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },

  mess: {
    fontFamily: "bold",
    fontSize: SIZES.medium + 3,
    color: COLORS.black,
  },

  notificationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: COLORS.main,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
