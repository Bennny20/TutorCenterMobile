import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const Wallet = () => {
  const navigation = useNavigation();
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearcResult] = useState([]);
  return (
    <View>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={40}
              color={COLORS.black}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Ví của bạn </Text>
        </View>
      </View>
      <View style={styles.profile}>
        <Image
          source={require("../assets/images/profile.jpeg")}
          style={styles.profileImg}
        />
        <Text style={styles.textHeading}>Truong Quang Phien</Text>
      </View>
      <View style={{ marginTop: 10, marginHorizontal: 30 }}>
        <View style={styles.wallet}>
          <View>
            <Text style={styles.textHeading}>Số dư khả dụng: </Text>
            <Text style={styles.number}>10 000 000 VNĐ</Text>
          </View>
          <View>
            <View style={styles.btn(COLORS.secondMain)}>
              <Text style={styles.btnText}>Nạp tiền </Text>
            </View>

            <View style={styles.btn(COLORS.gray2)}>
              <Text style={styles.btnText}>Rút tiền </Text>
            </View>
          </View>
        </View>
        <Text style={styles.titleHistory}>Lịch sử giao dịch:</Text>
      </View>

      <View style={styles.search}>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <TextInput
              style={styles.searchInput}
              value={searchKey}
              onChangeText={setSearchKey}
              placeholder="What are you looking for "
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={() => handleSearch()}
            >
              <Feather name="search" size={24} color={COLORS.offwhite} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.listButton}>
          <View style={styles.btn(COLORS.secondMain)}>
            <Text style={styles.btnText}>Tát cả </Text>
          </View>
          <View style={styles.btn(COLORS.secondMain)}>
            <Text style={styles.btnText}>Chuyển tiền </Text>
          </View>
          <View style={styles.btn(COLORS.secondMain)}>
            <Text style={styles.btnText}>Nạp tiền </Text>
          </View>
          <View style={styles.btn(COLORS.secondMain)}>
            <Text style={styles.btnText}>Rút tiền </Text>
          </View>
        </View>
      </View>

      <View style={styles.history}></View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  listButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 10,
  },
  btnText: {
    padding: 7,
    fontFamily: "semibold",
    fontSize: SIZES.medium,
  },

  btn: (color) => ({
    borderWidth: 1,
    borderColor: COLORS.black,
    backgroundColor: color,
    borderRadius: 10,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  }),

  titleHistory: {
    marginTop: 20,
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.black,
  },

  number: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginLeft: 25,
    marginTop: 10,
  },

  textHeading: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.black,
    marginLeft: 5,
  },

  wallet: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderColor: COLORS.main,
    borderWidth: 3,
    borderRadius: 15,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
  },

  profile: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    marginHorizontal: 70,
    borderColor: COLORS.main,
    borderWidth: 3,
    borderRadius: 15,
  },

  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginLeft: 5,
  },

  upperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 1,
  },

  wrapper: {
    marginTop: 30,
    backgroundColor: COLORS.lightWhite,
  },

  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.small - 6,
    height: 50,
  },

  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },

  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },

  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },

  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
});
