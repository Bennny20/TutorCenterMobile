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
import { COLORS, HOST_API, SIZES } from "../constants";
import Button from "../components/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(1, "Password must be at least 8 characters")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
});

const Login = () => {
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

  const login = async (values) => {
    fetch("http://192.168.1.203:9000/api/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          console.log(data);
          await AsyncStorage.setItem("token", data.data.access_token);
          // await AsyncStorage.setItem("email", values.email);
          navigation.replace("Bottom Navigation");
        } catch (e) {
          console.log("error hai", e);
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
        }
      });

    // setLoader(true);
    // try {
    //   const endpoint = HOST_API.local + `/api/auth/authenticaten`;
    //   console.log(values);
    //   const response = await axios.post(
    //     HOST_API.local + `/api/auth/authenticaten`,
    //     {
    //       email: values.email,
    //       password: values.password,
    //     }
    //   );

    //   if (response.status === 200) {
    //     console.log(response.data);
    //     setResponseData(response.data);

    //     // await AsyncStorage.setItem("token", data.data.access_token);

    //     // await AsyncStorage.setItem(
    //     //   `user${responseData.user?._id}`,
    //     //   JSON.stringify(responseData)
    //     // );

    //     // await AsyncStorage.setItem(
    //     //   "id",
    //     //   JSON.stringify(responseData.user?._id)
    //     // );

    //     // navigation.replace("Bottom Navigation");
    //     setLoader(false);
    //   } else {
    //     Alert.alert("Error Logging im", "Please provide all require fields", [
    //       {
    //         text: "Cancel",
    //         onPress: () => {},
    //       },
    //       {
    //         text: "Continue",
    //         onPress: () => {},
    //       },
    //       { defaultIndex: 1 },
    //     ]);
    //   }
    // } catch (error) {
    //   console.log(error.message);

    // } finally {
    //   setLoader(false);
    // }
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
          </View>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
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
                  loader={loader}
                  title={"Dang nhap"}
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
                      navigation.navigate("Register");
                    }}
                  >
                    Đăng kí tài khoản
                  </Text>
                  <Text style={styles.registration}> | </Text>
                  <Text
                    style={styles.registration}
                    onPress={() => {
                      navigation.navigate("RegisterTutor");
                    }}
                  >
                    Đăng kí làm gia sư
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

export default Login;

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
    color: COLORS.main,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "right",
  },

  title: {
    marginTop: 20,
    fontFamily: "bold",
    fontSize: SIZES.xxLarge,
    color: COLORS.main,
    alignItems: "center",
    marginBottom: SIZES.xxLarge,
  },
});
