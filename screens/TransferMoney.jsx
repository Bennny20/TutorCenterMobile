import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import Heading from "../components/Heading";
import { ScrollView } from "react-native";
import { COLORS, HOST_API, SIZES } from "../constants";
import { ActivityIndicator } from "react-native";
import { TextInput } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CurrencyFormatter from "../components/CurrencyFormatter ";
import Button from "../components/Button";
import { Alert } from "react-native";

const TransferMoney = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { item, userData, classID } = route.params;
  const [loader, setLoader] = useState(false);
  const [money, setMoney] = useState(classID.tuition);
  const [content, setContent] = useState(
    "Thanh toán chi phí class: " +
      classID.id +
      " của phụ huynh " +
      userData?.fullName
  );
  const [data, setData] = useState();
  const [temp, setTemp] = useState();
  const fetchBalance = async () => {
    const token = await AsyncStorage.getItem("token");
    setLoader(true);
    try {
      const response = await axios.get(
        HOST_API.local + `/api/userWallet/balance`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTemp(response.data);
      setData(
        Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(response.data.data.balance)
      );
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const [checkPayment, setCheckPayment] = useState(false);
  const tuition = classID.tuition * 0.1;

  const createOrder = async () => {
    const token = await AsyncStorage.getItem("token");
    const order = {
      clazzId: classID.id,
      amount: tuition,
      type: "Chuyển",
    };
    setLoader(true);
    try {
      const response = await axios.post(
        HOST_API.local + "/api/order/create",
        {
          clazzId: classID.id,
          amount: new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(tuition),
          type: 1,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      if (response.data.responseCode === "00") {
        setLoader(false);
        navigation.navigate("History", { item, order });
        // Alert.alert("Thanh toán thành công", "", [
        //   {
        //     text: "Cancel",
        //     onPress: () => {},
        //   },
        //   {
        //     text: "Continue",
        //     onPress: () => {
        //       navigation.navigate("History", { item, order });
        //     },
        //   },
        //   { defaultIndex: 1 },
        // ]);
      } else {
        Alert.alert("Thanh toán không thành công", "", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {},
          },
          { defaultIndex: 1 },
        ]);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", "error", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {},
        },
        { defaultIndex: 1 },
      ]);
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView style={{ marginTop: 30 }}>
      <Heading title={"Chuyển tiền "} />
      <View style={styles.profile}>
        <Text style={styles.textHeading}>{userData?.fullName}</Text>
        <View style={{ marginRight: 20 }}>
          {loader ? (
            <ActivityIndicator size={20} color={COLORS.main} />
          ) : (
            <CurrencyFormatter amount={temp?.data.balance} />
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
          <View style={styles.input}>
            <CurrencyFormatter amount={tuition} />
          </View>
        </View>

        <View>
          <Text style={styles.itemText}>Thông tin người nhận </Text>
          <View style={styles.input}>
            <Text>Trung tâm giá sư - Tutor Center</Text>
          </View>
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
        {loader ? (
          <ActivityIndicator size={50} color={COLORS.main} />
        ) : (
          <View>
            {temp?.data.balance < tuition ? (
              <View
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.warring}>
                  Tài khoản không đủ vui lòng nạp thêm thêm
                </Text>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <TouchableOpacity
                    onPressIn={() =>
                      navigation.navigate("DepositAndWithdrawMoney", {
                        userData,
                        data,
                      })
                    }
                  >
                    <View style={[styles.btn(COLORS.secondMain)]}>
                      <Text style={styles.btnText}>Nạp tiền vào ví </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Button
                loader={loader}
                title={"Thanh toán"}
                onPress={createOrder}
                isValid={{}}
              />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default TransferMoney;

const styles = StyleSheet.create({
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
    justifyContent: "center",
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

  warring: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.red,
  },
});
