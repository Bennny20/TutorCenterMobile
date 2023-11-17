import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const ClassItem = ({ item }) => {
  const navigation = useNavigation();

  for (let index = 0; index < item.subjects.length; index++) {
    major += item.subjects[index].name + ", ";
    if (index == item.subjects.length - 1) {
      major += item.subjects[index].name;
    }
    classNo = item.subjects[index].level;
  }

  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.tuition);
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
          <Text style={styles.titleText}>{major}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>Trình đồ: {item.tutorLevel}</Text>
          <Text style={styles.text}> {classNo}</Text>
          <Text style={styles.text}>Địa chỉ: {item.address}</Text>
          <Text style={styles.text}>
            {item.address}, {item.provinceName}
          </Text>
          <Text style={styles.text}>Giới tính: {item.gender}</Text>
        </View>
        <View style={styles.price}>
          <Text style={styles.priceText}>{formattedAmount}</Text>
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
