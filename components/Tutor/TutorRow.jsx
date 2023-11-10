import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TutorCardView from "./TutorCardView";
import useFetch from "../../hook/Tutor/useFetch";
const TutorRow = () => {
  const { data, isLoading, error } = useFetch();

  const products = [1, 2, 3, 4];
  const navigation = useNavigation();

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
        {/* <FlatList
          data={products}
          renderItem={({ item }) => <TutorCardView />}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        /> */}

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
