import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import Heading from "../components/Heading";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";

const Transaction = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.amount);
  const changeValueDay = (date) => {
    var date = new Date(date);
    var month = date.getMonth() + 1;
    return `${date.getDate()}/${month}/${date.getFullYear()}`;
  };

  const changeValueTime = (date) => {
    var date = new Date(date);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <SafeAreaView>
      <Heading title={"Chi tiết giao dịch"} />
      <View style={styles.transaction}>
        <View style={styles.header}>
          {item.type === "Nạp" ? (
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name={"credit-card-plus"}
                size={40}
                color={"#00CCFF"}
              />
            </View>
          ) : (
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name={"credit-card-minus"}
                size={40}
                color={COLORS.red}
              />
            </View>
          )}
          {item.type === "Nạp" ? (
            <View style={styles.info}>
              <Text style={styles.title}>Nạp tiền vào ví</Text>
              <Text style={styles.amount}>+ {formattedAmount}</Text>
            </View>
          ) : (
            <View style={styles.info}>
              <Text style={styles.title}>Rút tiền khỏi ví</Text>
              <Text style={styles.amount}>- {formattedAmount}</Text>
            </View>
          )}
        </View>
        <View style={{ marginVertical: 10, marginHorizontal: 20 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={[styles.title, { fontSize: SIZES.medium }]}>
              Trạng thái
            </Text>
            <View style={{ backgroundColor: "#66CC33", borderRadius: 10 }}>
              <Text style={styles.status}>Thành công</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={[styles.title, { fontSize: SIZES.medium }]}>Ngày</Text>
            <View>
              <Text style={[styles.amount, { fontSize: SIZES.medium }]}>
                {changeValueDay(item.timeCreate)}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={[styles.title, { fontSize: SIZES.medium }]}>Giờ</Text>
            <View>
              <Text style={[styles.amount, { fontSize: SIZES.medium }]}>
                {changeValueTime(item.timeCreate)}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={[styles.title, { fontSize: SIZES.medium }]}>
              Nguồn tiền
            </Text>
            <View>
              <Text style={[styles.amount, { fontSize: SIZES.medium }]}>
                TP Bank
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={[styles.title, { fontSize: SIZES.medium }]}>
              Tổng phí
            </Text>
            <View>
              <Text style={[styles.amount, { fontSize: SIZES.medium }]}>
                Miễn phí
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  transaction: {
    paddingVertical: 10,
    marginVertical: 30,
    marginHorizontal: 40,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
  },

  header: {
    flexDirection: "row",
  },

  icon: {
    marginHorizontal: 20,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.secondMain,
    height: 60,
    width: 60,
    borderRadius: 99,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.gray,
  },

  amount: {
    fontFamily: "bold",
    fontSize: SIZES.large,
  },

  status: {
    padding: 5,
    fontFamily: "bold",
    fontSize: SIZES.small,
    color: "#66FF00",
  },
});
