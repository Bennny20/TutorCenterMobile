import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Heading = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View styles={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={40}
              color={COLORS.main}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>{title} </Text>
        </View>
      </View>
    </View>
  );
};

export default Heading;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.large,
    color: COLORS.main,
    marginLeft: 5,
  },

  upperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightWhite,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },
});
