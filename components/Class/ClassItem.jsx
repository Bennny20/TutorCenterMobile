import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const ClassItem = () => {
  const navigation = useNavigation();
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
        onPress={() => navigation.navigate("ClassDetail")}
      >
        <View>
          <Text style={styles.text}>Hello</Text>
          <Text
            style={[
              styles.text,
              {
                fontFamily: "bold",
                fontSize: 14,
                maxWidth: "100%",
              },
            ]}
          >
            Ten khoa hoc
          </Text>
          <Text style={[styles.text, { fontSize: 13, marginBottom: 6 }]}>
            Ten khoa hoc
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ClassItem;

const styles = StyleSheet.create({
  text: {
    color: "#000",
    fontSize: 12,
    fontFamily: "bold",
    marginVertical: 3,
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
    marginVertical: 5,
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
