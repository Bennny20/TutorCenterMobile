import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { TouchableOpacity } from "react-native";

const Button = ({ title, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(isValid === false ? COLORS.gray : COLORS.main)}
    >
      {loader === false ? (
        <Text style={styles.btnText}>{title}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    fontFamily: "bold",
    color: COLORS.white,
    fontSize: 18,
  },

  btnStyle: (color) => ({
    height: 50,
    width: "100%",
    marginTop: 25,
    backgroundColor: color,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  }),
});
