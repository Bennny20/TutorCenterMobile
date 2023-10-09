import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { SIZES, SHADOWS, COLORS } from "../../constants";

const TutorItemApply = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity style={styles.container}>
        <View style={styles.image}>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-photo/blue-white-sign-with-man-white-shirt-blue-circle-with-man-front-it_745528-3249.jpg?w=2000",
            }}
            style={styles.productImg}
          />
        </View>
        <View style={styles.textContent}>
          <Text style={styles.name}>Truong Quang Phiên</Text>
          <Text style={styles.supplier}>Sinh viên</Text>
          <Text style={styles.supplier}>Đại học FPT</Text>
          <Text style={styles.supplier}>Toan - Lý - Hóa</Text>
        </View>
      </TouchableOpacity>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            borderWidth: 2,
            borderColor: COLORS.black,
            borderRadius: SIZES.small,
            backgroundColor: COLORS.secondMain,
            marginRight: 6,
          }}
        >
          <Text
            style={{
              padding: 5,
              fontSize: SIZES.small,
              fontFamily: "regular",
              color: COLORS.primary,
            }}
          >
            Chờ xác nhận
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TutorItemApply;

const styles = StyleSheet.create({
  supplier: {
    fontSize: SIZES.small,
    fontFamily: "bold",
    color: COLORS.gray,
    marginTop: 3,
  },

  name: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },

  textContent: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productImg: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
  image: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
  },
  container: {
    marginRight: 10,
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.main,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.small,
    flexDirection: "row",
    padding: SIZES.small - 5,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.lightWhite,
  },
});
