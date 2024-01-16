import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Heading from "../components/Heading";
import { COLORS, HOST_API } from "../constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const OTPScreen = () => {
  const route = useRoute();
  const { codeOTP, data, districtValue } = route.params;
  const [loader, setLoader] = useState(false);
  const navigation = useNavigation();
  let textInput = useRef(null);
  let clockCall = null;
  const [internalValue, setInternalValue] = useState("");
  const lengthInput = 6;
  const [countdown, setCountdown] = useState(30);
  const [enableResend, setEnableResend] = useState(false);
  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const onResendOTP = () => {
    if (enableResend) {
      setCountdown(30);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInterval(() => {
        decrementClock();
      }, 1000);
    }
  };
  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const onChangeText = (val) => {
    setInternalValue(val);
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  const register = async () => {
    setLoader(true);
    try {
      const endpoint = HOST_API.local + "/api/auth/registerParent";
      const response = await axios.post(endpoint, {
        email: data.email,
        password: data.password,
        fullname: data.fullname,
        phone: data.phone,
        address: data.location,
        districtId: districtValue,
      });
      console.log(response.data);
      if (response.data.responseCode === "00") {
        console.log(response.data);
        Alert.alert("Chúc mừng ", "Đăng kí tài khoản thành công", [
          {
            text: "Cancel",
            onPress: () => { },
          },
          {
            text: "Continue",
            onPress: () => {
              navigation.replace("Login");
            },
          },
          { defaultIndex: 1 },
        ]);
        setLoader(false);
      } else {
        Alert.alert("Error Logging im", "Please provide all require fields", [
          {
            text: "Cancel",
            onPress: () => { },
          },
          {
            text: "Continue",
            onPress: () => { },
          },
          { defaultIndex: 1 },
        ]);
      }
    } catch (error) {
      console.log(error.message);
      Alert.alert("Error", "error", [
        {
          text: "Cancel",
          onPress: () => { },
        },
        {
          text: "Continue",
          onPress: () => { },
        },
        { defaultIndex: 1 },
      ]);
    } finally {
      setLoader(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Heading title={"Xác thực email"} />
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={"padding"}
        style={styles.keyboard}
      >
        <Text style={styles.title}> Nhập mã OTP đã được gửi đến mail</Text>
        <View>
          <TextInput
            ref={(input) => (textInput = input)}
            onChangeText={onChangeText}
            style={{ width: 0, height: 0 }}
            value={internalValue}
            maxLength={lengthInput}
            returnKeyType="done"
            keyboardType="numeric"
          />
          <View style={styles.input}>
            {Array(lengthInput)
              .fill()
              .map((data, index) => (
                <View
                  key={index}
                  style={[
                    styles.cellView,
                    {
                      borderBottomColor:
                        index === internalValue.length ? "#FB6C6A" : "#234DB7",
                    },
                  ]}
                >
                  <Text
                    style={styles.cellText}
                    onPress={() => textInput.focus()}
                  >
                    {internalValue && internalValue.length > 0
                      ? internalValue[index]
                      : ""}
                  </Text>
                </View>
              ))}
          </View>
        </View>

        <View style={styles.btnView}>

      
          <TouchableOpacity onPress={register}>
            <View style={styles.btnChange}>
              <Text style={styles.txtChange}>Đăng ký</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.btnResend}>
              <Text
                style={[
                  styles.txtResend,
                  {
                    color: enableResend ? COLORS.main : COLORS.gray,
                  },
                ]}
              >
                Gửi lại mã ({countdown})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },

  title: {
    marginTop: 100,
    marginBottom: 40,
    fontSize: 16,
  },

  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  cellView: {
    width: 40,
    margin: 5,
    justifyContent: "center",
    paddingVertical: 11,
    alignItems: "center",
    borderBottomWidth: 1.5,
  },

  cellText: {
    textAlign: "center",
    fontSize: 16,
  },
  btnView: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 50,
    alignItems: "flex-end",
  },

  btnChange: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  txtChange: {
    color: COLORS.main,
    alignItems: "center",
    fontSize: 16,
  },

  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  txtResend: { alignItems: "center", fontSize: 16 },
});
