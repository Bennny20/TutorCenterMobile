import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";
import { TouchableOpacity } from "react-native";

const Button = ({ title, onPress, isValid }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(isValid === false ? COLORS.gray : COLORS.primary)}
    >
      <Text style={styles.btnText}>{title}</Text>
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
    marginVertical: 20,
    backgroundColor: color,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  }),
});
