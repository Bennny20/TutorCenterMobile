import {
  Pressable,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { COLORS, SIZES } from "../constants";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const RegisterTutor = () => {
  const steps = [
    { title: "Infomation", content: "Info Form" },
    { title: "Chuyên môn", content: "Chuyen Mon" },
    { title: "Trình độ", content: "Trinh Do" },
    { title: "Bằng cấp", content: "Bang Cap" },
  ];
  const [currentStep, setCurrentStep] = useState(0);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [image, setImage] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [university, setUniversity] = useState();
  const [major, setMajor] = useState();
  const [certificate, setCertificate] = useState([]);
  const [subject, setSubject] = useState([]);

  const [isImage, setIsImage] = useState(false);
  // useEffect(async () => {
  //   if (Platform.OS !== "wed") {
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== "granted") {
  //       alert("Permisson denird!");
  //     }
  //   }
  // }, []);

  const pickerImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setIsImage(true);
      setImage(result.assets[0].uri);
    }
  };
  // console.log(image);
  return (
    <ScrollView style={{ marginTop: 30 }}>
      <Heading title={"Đăng kí gia sư"} />
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          {steps?.map((step, index) => (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              {index > 0 && (
                <View
                  style={[
                    { flex: 1, height: 2, backgroundColor: "green" },
                    index <= currentStep && { backgroundColor: "green" },
                  ]}
                />
              )}
              <View
                style={[
                  {
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: "#ccc",
                    justifyContent: "center",
                    alignItems: "center",
                  },
                  index < currentStep && { backgroundColor: "green" },
                ]}
              >
                {index < currentStep ? (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text style={{ textAlign: "center", marginTop: 8 }}>
                {step.title}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {currentStep == 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Thông tin tài khoản
          </Text>
          <Pressable>
            <View>
              <Text style={styles.itemText}>Email </Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Nhập email"
              />
            </View>
            <View>
              <Text style={styles.itemText}>Password </Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Nhập password"
              />
            </View>

            <View>
              <Text style={styles.itemText}>Fullname </Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder="Nhập họ và tên"
              />
            </View>
          </Pressable>
          {email != null && password != null && name != null && (
            <Button
              title={"Tiếp túc"}
              onPress={() => setCurrentStep(1)}
              isValid={name}
              loader={false}
            />
          )}
        </View>
      )}

      {currentStep == 1 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Thông tin cá nhân
          </Text>
          <Pressable>
            <KeyboardAwareScrollView extraScrollHeight={-150}>
              <View style={styles.avatar}>
                {isImage === false ? (
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/userDefault.png")}
                      style={styles.profileImg}
                    />
                    <TouchableOpacity
                      onPress={() => pickerImage()}
                      style={{
                        marginTop: 20,
                        height: 50,
                        width: "60%",
                        backgroundColor: "skyblue",
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Text style={styles.itemText}>Avatar</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ alignItems: "center" }}>
                    {image && (
                      <Image
                        source={{ uri: image }}
                        style={styles.profileImg}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => pickerImage()}
                      style={{
                        marginTop: 20,
                        height: 50,
                        width: "60%",
                        backgroundColor: "skyblue",
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                      }}
                    >
                      <Text style={styles.itemText}>Avatar</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View>
                <Text style={styles.itemText}>Địa chỉ </Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                  placeholder="Nhập email"
                />
              </View>

              <View>
                <Text style={styles.itemText}>Trường đại học </Text>
                <TextInput
                  style={styles.input}
                  value={university}
                  onChangeText={(text) => setUniversity(text)}
                  placeholder="Nhập password"
                />
              </View>

              <View>
                <Text style={styles.itemText}>Số điện thoại </Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  placeholder="Nhập họ và tên"
                />
              </View>
            </KeyboardAwareScrollView>
          </Pressable>

          <Button
            title={"Trở lại"}
            onPress={() => setCurrentStep(0)}
            isValid={name}
            loader={false}
          />
          {address != "" &&
            phone != "" &&
            university != "" &&
            address != null &&
            phone != null &&
            university != null && (
              <Button
                title={"Tiếp túc"}
                onPress={() => setCurrentStep(1)}
                isValid={name}
                loader={false}
              />
            )}
        </View>
      )}
    </ScrollView>
  );
};

export default RegisterTutor;

const styles = StyleSheet.create({
  profileImg: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: -20,
  },

  avatar: {
    marginTop: 40,
    justifyContent: "center",
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
});
