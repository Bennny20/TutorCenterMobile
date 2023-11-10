import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
const ClassItem = ({ item }) => {
  const navigation = useNavigation();
  console.log(item);

  const majors = item.request.major.join(" - ");
  console.log(majors);
  return (
    <View style={styles.card_container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "5%",
        }}
      >
        <View style={styles.circle} />
      </View>
      <TouchableOpacity
        style={styles.content}
        onPress={() => navigation.navigate("ClassDetail", { item })}
      >
        <View style={styles.title}>
          <Text style={styles.titleText}>{majors}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>Trình đồ: {item.request.level}</Text>
          <Text style={styles.text}>Lớp: {item.request.classNo}</Text>
          <Text style={styles.text}>Địa chỉ: {item.request.address}</Text>
          <Text style={styles.text}>Giới tính: {item.request.gender}</Text>
        </View>
        <View style={styles.price}>
          <Text style={styles.priceText}>{item.request.price} VNĐ</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ClassItem;

const styles = StyleSheet.create({
  priceText: {
    color: COLORS.red,
    fontSize: SIZES.medium,
    fontFamily: "bold",
    marginVertical: 3,
  },
  price: {
    padding: 2,
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: COLORS.main,
    borderRadius: 10,
  },
  info: {
    marginHorizontal: 20,
  },
  title: {
    borderRadius: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.main,
  },
  titleText: {
    color: COLORS.main,
    fontSize: SIZES.large,
    fontFamily: "bold",
    marginVertical: 3,
  },
  text: {
    fontSize: SIZES.medium,
    fontFamily: "regular",
  },
  card_container: {
    borderColor: COLORS.main,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 12,
    backgroundColor: COLORS.main,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColorL: "",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  content: {
    backgroundColor: COLORS.lightWhite,
    width: "90%",
    paddingVertical: 3,
    paddingHorizontal: 7,
  },

  content: {
    backgroundColor: COLORS.lightWhite,
    width: "90%",
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  item_press: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
