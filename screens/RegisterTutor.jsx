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
    { title: "Tài khoản", content: "Info Form" },
    { title: "Thông tin", content: "Chuyen Mon" },
    { title: "Chuyên môn", content: "Chuyên môn" },
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
  const [certificate1, setCertificate1] = useState(null);
  const [certificate2, setCertificate2] = useState(null);

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

  const pickerCeti1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setIsImage(true);
      setCertificate1(result.assets[0].uri);
    }
  };
  const pickerCeti2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setIsImage(true);
      setCertificate2(result.assets[0].uri);
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
                  placeholder="Nhập địa chỉ của bạn"
                />
              </View>

              <View>
                <Text style={styles.itemText}>Giới tính</Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                  placeholder="Nhập giới tính của bạn"
                />
              </View>

              <View>
                <Text style={styles.itemText}>Số điện thoại </Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  placeholder="Nhập số điện thoại"
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
          {address != "" && phone != "" && address != null && phone != null && (
            <Button
              title={"Tiếp túc"}
              onPress={() => setCurrentStep(2)}
              isValid={name}
              loader={false}
            />
          )}
        </View>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Thông tin chuyên môn
          </Text>
          <Pressable>
            <KeyboardAwareScrollView extraScrollHeight={-150}>
              <View>
                <Text style={styles.itemText}>Trương đại học </Text>
                <TextInput
                  style={styles.input}
                  value={university}
                  onChangeText={(text) => setUniversity(text)}
                  placeholder="Nhập trương đại học"
                />
              </View>

              <View>
                <Text style={styles.itemText}>Ngành học </Text>
                <TextInput
                  style={styles.input}
                  value={major}
                  onChangeText={(text) => setMajor(text)}
                  placeholder="Nhập ngành học"
                />
              </View>

              <View>
                <Text style={styles.itemText}>Chuyên môn (Môn dạy): </Text>
                <TextInput
                  style={styles.input}
                  value={major}
                  onChangeText={(text) => setMajor(text)}
                  placeholder="Nhập họ và tên"
                />
              </View>
            </KeyboardAwareScrollView>
          </Pressable>

          <Button
            title={"Trở lại"}
            onPress={() => setCurrentStep(1)}
            isValid={name}
            loader={false}
          />
          <Button
            title={"Tiếp túc"}
            onPress={() => setCurrentStep(3)}
            isValid={name}
            loader={false}
          />
        </View>
      )}

      {currentStep == 3 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Thông tin bằng cấp
          </Text>
          <Pressable>
            <KeyboardAwareScrollView extraScrollHeight={-150}>
              <View style={styles.cetification}>
                {isImage === false ? (
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/userDefault.png")}
                      style={styles.certificate}
                    />
                    <TouchableOpacity
                      onPress={() => pickerCeti1()}
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
                      <Text style={styles.itemText}>Bằng cấp 1</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ alignItems: "center" }}>
                    {certificate1 && (
                      <Image
                        source={{ uri: certificate1 }}
                        style={styles.certificate}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => pickerCeti1()}
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
                      <Text style={styles.itemText}>Bằng cấp 1</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {/* certificate */}
              <View style={styles.avatar}>
                {isImage === false ? (
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/userDefault.png")}
                      style={styles.certificate}
                    />
                    <TouchableOpacity
                      onPress={() => pickerCeti2()}
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
                      <Text style={styles.itemText}>Bằng cấp 2</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ alignItems: "center" }}>
                    {certificate1 && (
                      <Image
                        source={{ uri: certificate2 }}
                        style={styles.certificate}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => pickerCeti2()}
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
                      <Text style={styles.itemText}>Bằng cấp 2</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </KeyboardAwareScrollView>
          </Pressable>

          <Button
            title={"Trở lại"}
            onPress={() => setCurrentStep(2)}
            isValid={name}
            loader={false}
          />
          <Button
            title={"Tiếp túc"}
            onPress={() => setCurrentStep(3)}
            isValid={name}
            loader={false}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default RegisterTutor;

const styles = StyleSheet.create({
  certificate: {
    height: 200,
    width: 400,
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: 10,
  },

  profileImg: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: 20,
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
