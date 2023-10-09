import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TutorItem from "../components/Tutor/TutorItem";

const Tutor = () => {
  const navigation = useNavigation();
  const tutors = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13];

  return (
    <View styles={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={40}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Best Tutors</Text>
        </View>
      </View>
      <ScrollView style={{ marginTop: 80 }}>
        <View>
          {tutors.map((item) => (
            <TutorItem />
          ))}
        </View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </ScrollView>
    </View>
  );
};

export default Tutor;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },

  upperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },

  wrapper: {
    marginTop: 30,
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
});
