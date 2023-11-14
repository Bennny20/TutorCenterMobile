import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { COLORS, SIZES, HOST_API } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TutorCardView from "./TutorCardView";
import useFetch from "../../hook/Tutor/useFetch";
import { useState } from "react";
import axios from "axios";
const TutorRow = () => {
  const { data, isLoading, error } = useFetch();

  const products = [1, 2, 3, 4];
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [classes, setClasses] = useState([]);
  // const getMoviesFromApiAsync = async () => {
  //   try {
  //     const response = await fetch(HOST_API.local + "class/");
  //     const json = await response.json();
  //     setClasses(json);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   getMoviesFromApiAsync();
  // }, []);
  // console.log("Test class local:  ", classes);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Best Tutors</Text>
        <TouchableOpacity
          style={{ display: "flex", flexDirection: "row" }}
          onPress={() => navigation.navigate("TutorList")}
        >
          <Text style={styles.headerTitle}>xem tất cả</Text>
          <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerRow}>
        {isLoading ? (
          <ActivityIndicator size={SIZES.xxLarge + 10} color={COLORS.main} />
        ) : error ? (
          <Text>Something went wrong </Text>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <TutorCardView item={item} />}
            horizontal
            contentContainerStyle={{ columnGap: SIZES.medium }}
          />
        )}
      </View>
    </View>
  );
};

export default TutorRow;

const styles = StyleSheet.create({
  containerRow: {
    marginTop: SIZES.medium,
    marginTop: 12,
  },
  container: {
    marginTop: SIZES.medium,
    // marginBottom: -SIZES.xSmall,
    marginHorizontal: 12,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontFamily: "semibold",
    fontSize: SIZES.xLarge - 2,
  },
});
