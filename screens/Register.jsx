import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import Button from "../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "react-native";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
  location: Yup.string()
    .min(5, "Provide a valid location address")
    .required("Required"),
  phone: Yup.string()
    .min(10, "Provide a valid phone number")
    .max(10, "Provide a valid phone number")
    .required("Required"),
});
const Register = () => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
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

  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
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
          <Formik
            initialValues={{ email: "", password: "", location: "", phone: "" }}
            validationSchema={validationSchema}
            onSubmit={(data) => console.log(data)}
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

                {/* Location */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Location</Text>
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

                {/* Password */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={styles.label}>Password</Text>
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

                <Button
                  title={"Đăng kí tài khoản"}
                  onPress={isValid ? handleSubmit : inValidForm}
                  isValid={isValid}
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
        </View>
      </SafeAreaView>
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
});
