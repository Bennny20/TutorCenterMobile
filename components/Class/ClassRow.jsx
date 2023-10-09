import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ClassCardView from "./ClassCardView";

const ClassRow = () => {
  const classes = [1, 2, 3, 4];
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Classes</Text>
        <TouchableOpacity
          style={{ display: "flex", flexDirection: "row" }}
          onPress={() => navigation.navigate("ClassList")}
        >
          <Text style={styles.headerTitle}>xem tất cả</Text>
          <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.containerRow}>
        <FlatList
          data={classes}
          renderItem={({ item }) => <ClassCardView />}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      </View>
    </View>
  );
};

export default ClassRow;

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
