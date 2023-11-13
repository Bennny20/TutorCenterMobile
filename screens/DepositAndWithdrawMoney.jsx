import {
  Image,
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
import { COLORS, SIZES } from "../constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const DepositAndWithdrawMoney = () => {
  const layout = [
    { title: "Nạp tiền", content: "Nạp tiền" },
    { title: "Rủt tiền", content: "Rủt tiền" },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [money, setMoney] = useState();
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
                <Text style={styles.activeTxt}>Nạp tiền</Text>
              </View>
            ) : (
              <View style={styles.nonActiveLayout}>
                <Text style={styles.nonActiveTxt}>Nạp tiền</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={{ borderWidth: 2, height: 40 }}></View>
          <TouchableOpacity style={styles.layout} onPress={handelWithdraw}>
            {activeWithdraw ? (
              <View style={styles.activeLayout}>
                <Text style={styles.activeTxt}>Rút tiền</Text>
              </View>
            ) : (
              <View style={styles.nonActiveLayout}>
                <Text style={styles.nonActiveTxt}>Rút tiền</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {currentStep == 0 && (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Thông tin nạp tiền
            </Text>

            <View>
              <Text style={styles.itemText}>Số tiên </Text>
              <TextInput
                keyboardType="phone-pad"
                style={styles.input}
                value={money}
                onChangeText={(text) => setMoney(text)}
                placeholder="Số tiền"
              />
            </View>

            <View>
              <Text style={styles.itemText}>Từ nguồn tiền</Text>
              <View style={styles.cardItem}>
                <View style={styles.logo}>
                  {/* <Image source={require("../assets/images/profile.jpeg")} /> */}
                </View>
                <View style={styles.info}></View>
              </View>
            </View>
          </View>
        )}

        {currentStep == 1 && (
          <View>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Thông tin rút tiền
            </Text>

            <View>
              <Text style={styles.itemText}>Số tiên </Text>
              <TextInput
                keyboardType="phone-pad"
                style={styles.input}
                value={money}
                onChangeText={(text) => setMoney(text)}
                placeholder="Số tiền"
              />
            </View>

            <View>
              <Text style={styles.itemText}>Từ nguồn tiền</Text>
              <View style={styles.cardItem}>
                <View style={styles.logo}>
                  {/* <Image source={require("../assets/images/profile.jpeg")} /> */}
                </View>
                <View style={styles.info}></View>
              </View>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DepositAndWithdrawMoney;

const styles = StyleSheet.create({
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
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.black,
    backgroundColor: COLORS.secondMain,
  },
  nonActiveLayout: {
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
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
});
