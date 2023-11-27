import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect } from "react";
import { SIZES, SHADOWS, COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";

const TutorItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("TutorDetail", { item })}
      >
        <View style={styles.image}>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-photo/blue-white-sign-with-man-white-shirt-blue-circle-with-man-front-it_745528-3249.jpg?w=2000",
            }}
            style={styles.productImg}
          />
        </View>
        <View style={styles.textContent}>
          <Text style={styles.name}> {item.tutorName} </Text>
          <Text style={styles.supplier}>{item.major}</Text>
          <Text style={styles.supplier}>{item.university}</Text>
          <Text style={styles.supplier}>{item.gender}</Text>
          <Text style={styles.supplier}>
            {item.districtName}, {item.provinceName}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TutorItem;

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
    marginHorizontal: SIZES.small - 5,
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
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.main,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.small,
    flexDirection: "row",
    padding: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.lightWhite,
  },
});
