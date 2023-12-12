import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { useState } from "react";
import Heading from "../components/Heading";
import { TouchableOpacity } from "react-native";
import { COLORS, HOST_API, SIZES } from "../constants";
import { Ionicons, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import Button from "../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  money: Yup.number()
    .min(10000, "Số tiền tối thiểu là 10.000đ")
    .max(10000000, "Số tiền tối đa là 10.000.000đ")
    .required("Required"),
});

const DepositAndWithdrawMoney = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData, data } = route.params;
  console.log(userData);
  const cart = [
    { id: 1, name: "TP Bank", cartNumber: "012345678" },
    { id: 2, name: "ACB Bank", cartNumber: "012345678" },
  ];
  const layout = [
    { title: "Nạp tiền", content: "Nạp tiền" },
    { title: "Rủt tiền", content: "Rủt tiền" },
  ];
  const [money, setMoney] = useState();

  const [currentStep, setCurrentStep] = useState(0);
  const [activeDeposit, setActiveDeposit] = useState(true);
  const [activeWithdraw, setActiveWithdraw] = useState(false);

  const handelDeposit = () => {
    setCurrentStep(0);
    setActiveDeposit(true);
    setActiveWithdraw(false);
  };

  const handelWithdraw = () => {
    setCurrentStep(1);
    setActiveDeposit(false);
    setActiveWithdraw(true);
  };

  const [loader, setLoader] = useState(false);
  const buttonDeposit = async (values) => {
    const item = {
      type: "Nạp",
      amount: values.money,
    };
    const token = await AsyncStorage.getItem("token");
    setLoader(true);
    const url =
      HOST_API.local +
      `/api/userWallet/deposit?userId=${userData.id}&amount=${values.money}`;

    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const result = await response.json();
    console.log(result);
    setLoader(false);
    if (result.responseCode === "00") {
      if (result.message == null) {
        Alert.alert("Nạp tiền thành công", "", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("History", { item });
            },
          },
          { defaultIndex: 1 },
        ]);
      } else {
        Alert.alert("Nạp tiền không thành công", "", [
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
    } else {
      Alert.alert("Error Logging im", "Please provide all require fields", [
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
  };

  const buttonWithdraw = async (values) => {
    const token = await AsyncStorage.getItem("token");
    const item = {
      type: "Rút",
      amount: values.money,
    };
    setLoader(true);
    const url =
      HOST_API.local +
      `/api/userWallet/withdraw?userId=${userData.id}&amount=${values.money}`;

    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const result = await response.json();
    console.log(result);
    setLoader(false);
    if (result.responseCode === "00") {
      if (result.message == null) {
        Alert.alert("Rút tiền thành công", "", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("History", { item });
            },
          },
          { defaultIndex: 1 },
        ]);
      } else {
        Alert.alert("Rút tiền không thành công", "", [
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
    } else {
      Alert.alert("Error Logging im", "Please provide all require fields", [
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
  };
  return (
    <SafeAreaView>
      <Heading title={"Nạp/Rút tiền"} />
      <View style={{ paddingHorizontal: 20, paddingTop: 30 }}>
        <View
          style={{
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-around",
            borderBottomWidth: 2,
          }}
        >
          <TouchableOpacity style={styles.layout} onPress={handelDeposit}>
            {activeDeposit ? (
              <View style={styles.activeLayout}>
                <Ionicons name="enter-outline" size={30} color={COLORS.black} />
                <Text style={styles.activeTxt}>Nạp tiền</Text>
              </View>
            ) : (
              <View style={styles.nonActiveLayout}>
                <Ionicons name="enter" size={30} color={COLORS.black} />
                <Text style={styles.nonActiveTxt}>Nạp tiền</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={{ borderWidth: 2, height: 40 }}></View>
          <TouchableOpacity style={styles.layout} onPress={handelWithdraw}>
            {activeWithdraw ? (
              <View style={styles.activeLayout}>
                <Text style={styles.activeTxt}>Rút tiền</Text>
                <Ionicons name="exit-outline" size={30} color={COLORS.black} />
              </View>
            ) : (
              <View style={styles.nonActiveLayout}>
                <Text style={styles.nonActiveTxt}>Rút tiền</Text>
                <Ionicons name="exit" size={30} color={COLORS.black} />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.wallet}>
          <View style={{ marginRight: 20 }}>
            <Text style={styles.textHeading}>Số dư khả dụng: </Text>
            <Text style={styles.number}>{data}</Text>
          </View>
        </View>
        {currentStep == 0 && (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Thông tin nạp tiền
            </Text>

            <Formik
              initialValues={{ money: 0 }}
              validationSchema={validationSchema}
              onSubmit={(data) => buttonDeposit(data)}
            >
              {({
                handleChange,
                handleBlur,
                touched,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldTouched,
              }) => (
                <View>
                  <View style={{ marginBottom: 20 }}>
                    <Text style={styles.label}>Số tiền</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.money ? COLORS.main : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="cash-plus"
                        size={20}
                        color={COLORS.gray}
                        style={{ marginRight: 10 }}
                      />
                      <TextInput
                        placeholder="Enter your money"
                        onFocus={() => {
                          setFieldTouched("money");
                        }}
                        onBlur={() => {
                          setFieldTouched("money", "");
                        }}
                        value={values.money}
                        onChangeText={handleChange("money")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                        keyboardType="number-pad"
                      />
                    </View>
                    {touched.money && errors.money && (
                      <Text style={styles.errorMessage}>{errors.money}</Text>
                    )}
                  </View>

                  <Text style={styles.itemText}>Từ nguồn tiền</Text>
                  <View style={styles.cardItem}>
                    <View style={styles.info}>
                      {cart.map((item, index) => {
                        <Pressable style={styles.item}>
                          <Entypo
                            onPress={() => ({})}
                            name="circle"
                            size={20}
                            color="gray"
                          />
                          <View style={{ marginLeft: 6 }}>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <Text
                                style={{ fontSize: 15, fontWeight: "bold" }}
                              >
                                {item?.name}
                              </Text>
                              <Entypo
                                name="location-pin"
                                size={24}
                                color="red"
                              />
                            </View>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                              {item?.cartNumber}
                            </Text>
                          </View>
                        </Pressable>;
                      })}
                    </View>
                  </View>

                  <Button
                    loader={loader}
                    title={"Nạp tiền"}
                    onPress={handleSubmit}
                    isValid={isValid}
                  />
                </View>
              )}
            </Formik>
          </View>
        )}

        {currentStep == 1 && (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Thông tin rút tiền
            </Text>

            <Formik
              initialValues={{ money: 0 }}
              validationSchema={validationSchema}
              onSubmit={(data) => buttonWithdraw(data)}
            >
              {({
                handleChange,
                handleBlur,
                touched,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldTouched,
              }) => (
                <View>
                  <View style={{ marginBottom: 20 }}>
                    <Text style={styles.label}>Số tiền</Text>
                    <View
                      style={styles.inputWrapper(
                        touched.money ? COLORS.main : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="cash-minus"
                        size={20}
                        color={COLORS.gray}
                        style={{ marginRight: 10 }}
                      />
                      <TextInput
                        placeholder="Enter your money"
                        onFocus={() => {
                          setFieldTouched("money");
                        }}
                        onBlur={() => {
                          setFieldTouched("money", "");
                        }}
                        value={values.money}
                        onChangeText={handleChange("money")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                        keyboardType="number-pad"
                      />
                    </View>
                    {touched.money && errors.money && (
                      <Text style={styles.errorMessage}>{errors.money}</Text>
                    )}
                  </View>

                  <Text style={styles.itemText}>Từ nguồn tiền</Text>
                  <View style={styles.cardItem}>
                    <View style={styles.info}>
                      {cart.map((item, index) => {
                        <Pressable style={styles.item}>
                          <Entypo
                            onPress={() => ({})}
                            name="circle"
                            size={20}
                            color="gray"
                          />
                          <View style={{ marginLeft: 6 }}>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 3,
                              }}
                            >
                              <Text
                                style={{ fontSize: 15, fontWeight: "bold" }}
                              >
                                {item?.name}
                              </Text>
                              <Entypo
                                name="location-pin"
                                size={24}
                                color="red"
                              />
                            </View>

                            <Text style={{ fontSize: 15, color: "#181818" }}>
                              {item?.cartNumber}
                            </Text>
                          </View>
                        </Pressable>;
                      })}
                    </View>
                  </View>

                  <Button
                    loader={loader}
                    title={"Rút tiền"}
                    onPress={handleSubmit}
                    isValid={isValid}
                  />
                </View>
              )}
            </Formik>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DepositAndWithdrawMoney;

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    width: "90%",
    height: 40,
    marginHorizontal: 20,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
  },
  input: {
    paddingLeft: 10,
    height: 45,
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
  activeLayout: {
    paddingHorizontal: 10,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 4,
    borderColor: COLORS.black,
    backgroundColor: COLORS.secondMain,
  },
  nonActiveLayout: {
    paddingHorizontal: 10,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
  },
  nonActiveTxt: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    padding: 15,
    color: COLORS.black,
  },
  activeTxt: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    padding: 15,
    color: COLORS.black,
  },

  layout: {
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },

  wallet: {
    padding: 10,
    borderColor: COLORS.main,
    borderWidth: 3,
    borderRadius: 15,
    marginHorizontal: 40,
    marginBottom: 10,
  },
  number: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginLeft: 25,
    marginVertical: 5,
  },

  textHeading: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginLeft: 5,
  },

  item: {
    borderWidth: 1,
    borderColor: "#D0D0D0",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingBottom: 17,
    marginVertical: 7,
    borderRadius: 6,
  },
  label: {
    fontFamily: "regular",
    fontSize: SIZES.Small,
    color: COLORS.main,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "right",
  },
  inputWrapper: (color) => ({
    borderColor: color,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 55,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),
  errorMessage: {
    color: COLORS.red,
    fontFamily: "regular",
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
});
