import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: "bold",
    fontSize: 40,
  },

  appBarWrapper: {
    marginHorizontal: 22,
    marginTop: SIZES.small,
  },

  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  location: {
    fontFamily: "extrabold",
    fontSize: SIZES.large,
    color: COLORS.main,
  },

  cartCount: {
    position: "absolute",
    bottom: 16,
    width: 16,
    heightL: 16,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "green",
    justifyContent: "center",
    zIndex: 999,
  },

  cartNumber: {
    fontFamily: "regular",
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.lightWhite,
  },
});

export default styles;
