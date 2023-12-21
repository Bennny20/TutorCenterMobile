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
import ClassCardView from "./ClassCardView";
import useFetch from "../../hook/Class/useFetch";

const ClassRow = () => {
  const navigation = useNavigation();
  const { data, isLoading, error } = useFetch();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lớp chưa có gia sư</Text>
        <TouchableOpacity
          style={{ display: "flex", flexDirection: "row" }}
          onPress={() => navigation.navigate("ClassList")}
        >
          <Text style={styles.headerTitle}>xem tất cả</Text>
          <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerRow}>
        {isLoading ? (
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primarys} />
        ) : error ? (
          <Text>Something went wrong </Text>
        ) : (
          <FlatList
            data={data.data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => item.status === 0 && <ClassCardView item={item} />}
            horizontal
            contentContainerStyle={{ columnGap: SIZES.medium }}
          />
        )}
      </View>
    </View>
  );
};

export default ClassRow;

export const styles = StyleSheet.create({
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
