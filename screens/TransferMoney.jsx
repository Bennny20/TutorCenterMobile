import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import Heading from "../components/Heading";
import CurrencyFormatter from "../components/CurrencyFormatter ";
import { ScrollView } from "react-native";
import { COLORS, SIZES } from "../constants";
import { ActivityIndicator } from "react-native";
import { TextInput } from "react-native";

const TransferMoney = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { item, userData, wallet } = route.params;
  const [loader, setLoader] = useState(false);
  const [money, setMoney] = useState();
  const [content, setContent] = useState(
    "Thanh toán chi phí requet: " +
      item._id +
      " của phụ huynh " +
      userData?.user.profile.name
  );

  var balance = 0;
  for (var items of wallet) {
    balance += items.balance;
  }

  return (
    <ScrollView style={{ marginTop: 30 }}>
      <Heading title={"Chuyển tiền "} />
      <View style={styles.profile}>
        <Text style={styles.textHeading}>{userData?.user.profile.name}</Text>
        <View style={{ marginRight: 20 }}>
          {loader ? (
            <ActivityIndicator size={20} color={COLORS.main} />
          ) : (
            <CurrencyFormatter amount={balance} />
          )}
        </View>
      </View>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Thông tin chuyển tiền
          </Text>
        </View>

        <View>
          <Text style={styles.itemText}>Số tiền </Text>
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            value={money}
            onChangeText={(text) => setMoney(text)}
            placeholder="Số tiền"
          />
        </View>

        <View>
          <Text style={styles.itemText}>Thông tin người nhận </Text>
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            value={money}
            onChangeText={(text) => setMoney(text)}
            placeholder="Số tiền"
          />
        </View>

        <View>
          <Text style={styles.itemText}>Nội dung chuyển khoản </Text>
          <TextInput
            style={styles.inputArea}
            multiline
            value={content}
            onChangeText={(text) => setContent(text)}
            placeholder="Số tiền"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TransferMoney;

const styles = StyleSheet.create({
  profile: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginHorizontal: 70,
    borderColor: COLORS.main,
    borderWidth: 3,
    borderRadius: 15,
  },

  textHeading: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.black,
    marginLeft: 5,
  },

  number: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginLeft: 25,
    marginTop: 10,
  },
  input: {
    paddingHorizontal: 10,
    paddingLeft: 10,
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
  },

  inputArea: {
    paddingHorizontal: 10,
    paddingLeft: 10,
    height: 95,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
  },
  itemText: {
    padding: 10,
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.main,
  },
});
