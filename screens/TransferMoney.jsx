import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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
  const { item, user, classID } = route.params;
  const [loader, setLoader] = useState(false);
  const [money, setMoney] = useState(classID.tuition);
  const [content, setContent] = useState(
    "Thanh toán chi phí class: " +
      classID.id +
      " của phụ huynh " +
      user?.fullName
  );
  const [data, setData] = useState();
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
      setData(response.data);
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
  const [payment, setPayment] = useState();

  const handleChoose = async () => {
    createOrder();
    const token = await AsyncStorage.getItem("token");
    // const item = {
    //   type: 1,
    //   amount: classID.tuition,
    // };
    console.log("payment ", payment);
    console.log("checkPayment ", checkPayment);
    if (checkPayment) {
      const response = await fetch(
        HOST_API.local + `/api/tutorApply/acceptTutor/${item.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      if (result.responseCode == "00") {
        Alert.alert("Chọn gia sư thành công", "Quản lý lớp", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("ManageClass", { user });
            },
          },
          { defaultIndex: 1 },
        ]);
      }
    } else {
      Alert.alert("Chọn gia sư khoong thành công", "Quản lý lớp", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {
            {
            }
          },
        },
        { defaultIndex: 1 },
      ]);
    }
  };

  const createOrder = async () => {
    const token = await AsyncStorage.getItem("token");
    const order = {
      clazzId: classID.id,
      amount: classID.tuition,
      type: 1,
    };
    setLoader(true);
    try {
      const response = await axios.post(
        HOST_API.local + "/api/order/create",
        {
          clazzId: classID.id,
          amount: classID.tuition,
          type: 1,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data.responseCode === "00") {
        console.log(response.data);
        setCheckPayment(true);
        setPayment(response.data);
        setLoader(false);
      } else {
        setCheckPayment(false);
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
        <Text style={styles.textHeading}>{user?.fullName}</Text>
        <View style={{ marginRight: 20 }}>
          {loader ? (
            <ActivityIndicator size={20} color={COLORS.main} />
          ) : (
            <CurrencyFormatter amount={data?.data.balance} />
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
            <CurrencyFormatter amount={classID.tuition} />
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
            {data?.data.balance < classID.tuition ? (
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
                <Button
                  loader={loader}
                  title={"Nạp tiền vào ví "}
                  onPress={{}}
                  isValid={{}}
                />
              </View>
            ) : (
              <Button
                loader={loader}
                title={"Thanh toán"}
                onPress={handleChoose}
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
