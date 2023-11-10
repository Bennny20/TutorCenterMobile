import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TutorItem from "../components/Tutor/TutorItem";
import useFetch from "../hook/Tutor/useFetch";

const Tutor = () => {
  const navigation = useNavigation();
  const tutors = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13];
  const { data, isLoading, error } = useFetch();

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
      <ScrollView
        style={{ marginTop: 80, marginHorizontal: 15, marginBottom: 60 }}
      >
        <View>
          {isLoading ? (
            <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primarys} />
          ) : error ? (
            <Text>Something went wrong </Text>
          ) : (
            data.map((item) => <TutorItem item={item} />)
          )}
        </View>
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
