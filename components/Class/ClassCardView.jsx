import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ClassCardView = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ClassDetail")}>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.headingText}> Ten class</Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.supplier} numberOfLines={1}>
            Trinh do:
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            Lop
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            Mon hoc
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            dia diem
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            Gioi tinh
          </Text>
          <Text style={styles.price}>$123</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.detailText}>xem chi tiet</Text>
          <Ionicons
            name="chevron-forward"
            size={20}
            color={COLORS.lightWhite}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ClassCardView;

const styles = StyleSheet.create({
  detailText: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },

  container: {
    width: 300,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },

  heading: {
    flex: 1,
    width: "100%",
    borderRadius: SIZES.small,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: COLORS.main,
  },

  headingText: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
  },
  details: {
    padding: SIZES.small,
  },

  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: 2,
  },

  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },

  price: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },

  addBtn: {
    width: 130,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
    justifyContent: "center",
  },
});