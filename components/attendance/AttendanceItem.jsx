import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";

const AttendanceItem = ({ item, stt }) => {
  const date = item.dateCreate.split(" ");

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderWidth: 2,
        borderColor: COLORS.main,
        marginBottom: 10,
        borderRadius: 15,
        marginHorizontal: 10,
      }}
    >
      <View style={styles.item}>
        <View>
          <Text style={styles.textItem}>Slot: {stt}</Text>
        </View>
        <View style={{ marginLeft: 20 }}>
          <Text style={styles.textItem}>Ngày điểm danh: {date[0]}</Text>
          <Text style={styles.textItem}>Giờ điểm danh: {date[1]}</Text>
        </View>
      </View>
      <View style={styles.status}>
        {item.status && <Text>Đã điểm danh</Text>}
      </View>
    </View>
  );
};

export default AttendanceItem;

const styles = StyleSheet.create({
  status: {
    borderLeftWidth: 2,
    borderLeftColor: COLORS.main,
    justifyContent: "center",
    padding: 10,
    borderRadius: 15,
    backgroundColor: COLORS.secondMain,
  },
  textItem: {
    color: "#000",
    fontSize: SIZES.small,
    fontFamily: "bold",
    marginVertical: 3,
  },

  item: {
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
});
