import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  LogBox,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, HOST_API, SIZES } from "../constants";
import Button from "../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "react-native";
import axios from "axios";
import { useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(1, "Mật khẩu tối thiểu 8 kí tự")
    .required("Required"),
  email: Yup.string()
    .email("Cung cấp địa chỉ email")
    .required("Required"),
  location: Yup.string()
    .min(5, "Cung cấp địa chỉ của bạn")
    .required("Required"),
  phone: Yup.string()
    .min(10, "Không đúng định dạng")
    .max(10, "Không đúng định dạng")
    .required("Required"),
  fullname: Yup.string()
    .min(5, "Cung cấp họ và tên của bạn")
    .required("Required"),
});
const Register = () => {
  const navigation = useNavigation();
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  //Tỉnh thành
  const [province, setProvince] = useState([]);
  const [selectProvince, setSelectProvince] = useState(
    "Chọn tỉnh thành nơi dậy"
  );
  const [isClickProvince, setIsClickProvince] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    const fetchProvince = async () => {
      try {
        const response = await axios.get(
          HOST_API.local + `/api/district/province`
        );
        setProvince(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoader(false);
      }
    };
    fetchProvince();
  }, []);

  //Quận huyện
  const [selectDistrict, setSelectDistrict] = useState(
    "Chọn quận/huyện nơi dậy"
  );
  const [isClickDistrict, setIsClickDistrict] = useState(false);
  const [district, setDistrict] = useState([]);
  const [districtValue, setDistrictValue] = useState();
  async function handLoadDistrict(idProvince) {
    const response = await fetch(
      HOST_API.local + `/api/district/province/${idProvince}`
    );
    setDistrict(await response.json());
  }

  const [obsecureText, setObsecureText] = useState(false);
  const inValidForm = () => {
    Alert.alert("Invalid form", "Please provide all require fields", [
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
  };

  const [checkEmail, setCheckEmail] = useState(false);
  const handleCheckEmail = async (email) => {
    console.log(email);
    await axios
      .get(HOST_API.local + `/api/auth/emailExist/${email}`)
      .then((response) => {
        console.log(response.data);
        setCheckEmail(response.data);
        if (checkEmail.data == true) {
          Alert.alert("Email đã được đăng kí", "Nhập lại email", [
            {
              text: "Cancel",
              onPress: () => {
                // navigation.navigate("ManageRequest");
              },
            },
            { defaultIndex: 1 },
          ]);
        }
      });
  };
  //register
  const [codeOTP, setCodeOTP] = useState(123456);

  const randomOTP = () => {
    var digits = "0123456789";
    let OTP = "";
    for (let index = 0; index < 6; index++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
  const sendOTP = async (data) => {
    setCodeOTP(randomOTP());
    console.log(codeOTP);
    // console.log(data);

    handleCheckEmail(data.email);
    if (checkEmail.data == false) {
      try {
        setLoader(true);
        const response = await axios.post(
          HOST_API.local +
            `/api/auth/send-code?code=${codeOTP}&email=${data.email}`,
          {}
        );
        console.log("code", response.data);
        if (response.data.responseCode === "00") {
          navigation.replace("OTPScreen", {
            codeOTP,
            data,
            districtValue,
          });
        } else {
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    }
  };
  return (
    <ScrollView
      style={{ marginHorizontal: 20, marginTop: 30, marginBottom: 20 }}
    >
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 5 }}
        >
          <Ionicons
            name="chevron-back-circle"
            size={40}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>TUTOR CENTER</Text>
          <Text style={styles.supTitle}>ĐĂNG KÍ TÀI KHOẢN</Text>
        </View>
        <KeyboardAwareScrollView extraScrollHeight={50}>
          <Formik
            initialValues={{
              email: "",
              password: "",
              location: "",
              phone: "",
              fullname: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data) => sendOTP(data)}
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
                {/* Email */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Email</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.main : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      keyboardType="email-address"
                      placeholder="Enter your email"
                      onFocus={() => {
                        setFieldTouched("email");
                      }}
                      onBlur={() => {
                        setFieldTouched("email", "");
                      }}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                {/* Password */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Mật khẩu</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.main : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      secureTextEntry={obsecureText}
                      placeholder="Enter your password"
                      onFocus={() => {
                        setFieldTouched("password");
                      }}
                      onBlur={() => {
                        setFieldTouched("password", "");
                      }}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setObsecureText(!obsecureText);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={obsecureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>

                {/* Fullname */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Họ và tên</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.fullname ? COLORS.main : COLORS.offwhite
                    )}
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={COLORS.gray}
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="Enter your your fullname"
                      onFocus={() => {
                        setFieldTouched("fullname");
                      }}
                      onBlur={() => {
                        setFieldTouched("fullname", "");
                      }}
                      value={values.fullname}
                      onChangeText={handleChange("fullname")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.fullname && errors.fullname && (
                    <Text style={styles.errorMessage}>{errors.fullname}</Text>
                  )}
                </View>

                {/* Phonenumber */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Số điện thoại</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.phone ? COLORS.main : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="phone-alert"
                      size={20}
                      color={COLORS.gray}
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      keyboardType="phone-pad"
                      placeholder="Enter your phone"
                      onFocus={() => {
                        setFieldTouched("phone");
                      }}
                      onBlur={() => {
                        setFieldTouched("phone", "");
                      }}
                      value={values.phone}
                      onChangeText={handleChange("phone")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.phone && errors.phone && (
                    <Text style={styles.errorMessage}>{errors.phone}</Text>
                  )}
                </View>

                {/* Tỉnh thành */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Tỉnh thành</Text>
                  <TouchableOpacity
                    style={styles.dropdownSelector}
                    onPress={() => {
                      setIsClickProvince(!isClickProvince);
                    }}
                  >
                    <Text>{selectProvince}</Text>
                    {isClickProvince ? (
                      <Ionicons name="chevron-down-outline" size={24} />
                    ) : (
                      <Ionicons name="chevron-up-outline" size={24} />
                    )}
                  </TouchableOpacity>
                  {isClickProvince && (
                    <View style={styles.dropdownArea}>
                      <FlatList
                        data={province.data}
                        renderItem={({ item, index }) => {
                          return (
                            <TouchableOpacity
                              style={styles.item}
                              onPress={() => {
                                setSelectProvince(item.name);
                                setIsClickProvince(false);
                                handLoadDistrict(item.id);
                              }}
                            >
                              <Text>{item.name}</Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  )}
                </View>

                {/* Quận huyện */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Quận huyện</Text>
                  <TouchableOpacity
                    style={styles.dropdownSelector}
                    onPress={() => {
                      setIsClickDistrict(!isClickDistrict);
                    }}
                  >
                    <Text>{selectDistrict}</Text>
                    {isClickDistrict ? (
                      <Ionicons name="chevron-down-outline" size={24} />
                    ) : (
                      <Ionicons name="chevron-up-outline" size={24} />
                    )}
                  </TouchableOpacity>
                  {isClickDistrict && (
                    <View style={styles.dropdownArea}>
                      <FlatList
                        data={district.data}
                        renderItem={({ item, index }) => {
                          return (
                            <TouchableOpacity
                              style={styles.item}
                              onPress={() => {
                                setSelectDistrict(item.name);
                                setIsClickDistrict(false);
                                setDistrictValue(item.id);
                              }}
                            >
                              <Text>{item.name}</Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  )}
                </View>

                {/* Location */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Địa chỉ</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.location ? COLORS.main : COLORS.offwhite
                    )}
                  >
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color={COLORS.gray}
                      style={{ marginRight: 10 }}
                    />
                    <TextInput
                      placeholder="Enter your location"
                      onFocus={() => {
                        setFieldTouched("location");
                      }}
                      onBlur={() => {
                        setFieldTouched("location", "");
                      }}
                      value={values.location}
                      onChangeText={handleChange("location")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.location && errors.location && (
                    <Text style={styles.errorMessage}>{errors.location}</Text>
                  )}
                </View>

                <Button
                  title={"Đăng kí tài khoản"}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
                  loader={loader}
                />

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={styles.registration}
                    onPress={() => {
                      navigation.navigate("Login");
                    }}
                  >
                    Bạn đã có tài khoản ?
                  </Text>
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAwareScrollView>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  registration: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.main,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: "regular",
    marginTop: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
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
  label: {
    fontFamily: "regular",
    fontSize: SIZES.Small,
    color: COLORS.black,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "right",
  },
  supTitle: {
    marginTop: 10,
    fontFamily: "bold",
    fontSize: SIZES.xLarge - 5,
    color: COLORS.black,
    alignItems: "center",
  },
  title: {
    marginTop: 10,
    fontFamily: "bold",
    fontSize: SIZES.xxLarge,
    color: COLORS.main,
    alignItems: "center",
    marginBottom: SIZES.xLarge,
  },
  dropdownSelector: {
    backgroundColor: COLORS.lightWhite,
    height: 55,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.lightWhite,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  dropdownArea: {
    width: "90%",
    height: 150,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "",
    elevation: 5,
    alignSelf: "center",
  },
  item: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
