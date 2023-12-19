import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { COLORS, HOST_API, SIZES } from "../constants";
import Button from "../components/Button";
import * as ImagePicker from "expo-image-picker";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LogBox } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const RegisterTutor = () => {
  const [obscureText, setObscureText] = useState(true);

  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested",
      ` Each child in a list should have a unique "key" prop`,
      `Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead`,
    ]);
  }, []);
  const steps = [
    { title: "Tài khoản", content: "Info Form" },
    { title: "Thông tin", content: "Chuyen Mon" },
    { title: "Chuyên môn", content: "Chuyên môn" },
    { title: "Bằng cấp", content: "Bang Cap" },
  ];
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [idNumber, setIdNumber] = useState();

  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [university, setUniversity] = useState();
  const [major, setMajor] = useState();

  const [isClassOpen, setIsClassOpen] = useState(false);
  const [classValue, setClassValue] = useState([]);
  const lopHoc = [
    { label: "Lớp 1", value: "Lớp 1" },
    { label: "Lớp 2", value: "Lớp 2" },
    { label: "Lớp 3", value: "Lớp 3" },
    { label: "Lớp 4", value: "Lớp 4" },
    { label: "Lớp 5", value: "Lớp 5" },
    { label: "Lớp 6", value: "Lớp 6" },
    { label: "Lớp 7", value: "Lớp 7" },
    { label: "Lớp 8", value: "Lớp 8" },
    { label: "Lớp 9", value: "Lớp 9" },
    { label: "Lớp 10", value: "Lớp 10" },
    { label: "Lớp 11", value: "Lớp 11" },
    { label: "Lớp 12", value: "Lớp 12" },
    { label: "Khác", value: "Order" },
  ];

  //Tỉnh thành
  const [selectProvince, setSelectProvince] = useState(
    "Chọn tỉnh thành nơi dậy"
  );
  const [isClickProvince, setIsClickProvince] = useState(false);
  const [province, setProvince] = useState([]);
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

  //Giới tính
  const [selectGender, setSelectGender] = useState("Chọn giới tính gia sư");
  const [isClickGender, setIsClickGender] = useState(false);
  const [genderValue, setGenderValue] = useState("");
  const GioiTinh = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
  ];

  useEffect(() => {
    const fetchProvince = async () => {
      const response = await fetch(
        HOST_API.local + `/api/subject/level?level=Lớp 12`
      );
      await response.json().then((data) => {
        let newArray = data.data.map((item) => {
          return { label: item.name, value: item.id };
        });
        setSubject2(newArray);
      });
    };
    fetchProvince();
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [subjectValue2, setSubjectValue2] = useState([]);
  const [subject2, setSubject2] = useState([]);

  const [imgProfile, setImgProfile] = useState();
  const [imageProfile, setImageProfile] = useState();
  const [isImage, setIsImage] = useState(false);
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
      setImageProfile(result.assets[0].uri);
      const formData = new FormData();
      formData.append("image", {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });
      axios
        .post(HOST_API.local + "/api/user/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data; ",
          },
        })
        .then((response) => {
          setImgProfile(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Create failed", error);
        });
    }
  };

  const [imgIdFont, setImgIdFont] = useState(null);
  const [imgIdFontValue, setImgIDFontValue] = useState(null);
  const pickerIDFont = async () => {
    let result2 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result2.canceled) {
      setIsImage(true);
      setImgIdFont(result2.assets[0].uri);
      const formData = new FormData();
      formData.append("image", {
        uri: result2.assets[0].uri,
        type: result2.assets[0].type,
        name: result2.assets[0].fileName,
      });
      axios
        .post(HOST_API.local + "/api/user/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data; ",
          },
        })
        .then((response) => {
          setImgIDFontValue(response.data);
          console.log("ID font: ", response.data);
        })
        .catch((error) => {
          console.log("Create failed", error);
        });
    }
  };

  const [imgIdBack, setImgIdBack] = useState(null);
  const [imgIdBackValue, setImgIdBackValue] = useState(null);
  const pickerIDBack = async () => {
    let result2 = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result2.canceled) {
      setIsImage(true);
      setImgIdBack(result2.assets[0].uri);
      const formData = new FormData();
      formData.append("image", {
        uri: result2.assets[0].uri,
        type: result2.assets[0].type,
        name: result2.assets[0].fileName,
      });
      axios
        .post(HOST_API.local + "/api/user/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data; ",
          },
        })
        .then((response) => {
          setImgIdBackValue(response.data);
          console.log("Id Back: ", response.data);
        })
        .catch((error) => {
          console.log("Create failed", error);
        });
    }
  };

  const [imgCertificate, setImgCertificate] = useState(null);
  const [certificateValue, setCertificateValue] = useState(null);
  const pickerCertificate = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setIsImage(true);
      setImgCertificate(result.assets[0].uri);
      const formData = new FormData();
      formData.append("image", {
        uri: result.assets[0].uri,
        type: result.assets[0].type,
        name: result.assets[0].fileName,
      });
      axios
        .post(HOST_API.local + "/api/user/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data; ",
          },
        })
        .then((response) => {
          setCertificateValue(response.data);
          console.log("Ceti: ", response.data);
        })
        .catch((error) => {
          console.log("Create failed", error);
        });
    }
  };

  const [selectLevel, setSelectLevel] = useState("Chọn trình độ gia sư");
  const [isClickLevel, setIsClickLevel] = useState(false);
  const [levelValue, setLevelValue] = useState("");
  const trinhDo = [
    { label: "Sinh viên", value: "Sinh viên" },
    { label: "Giáo viên", value: "Giáo viên" },
  ];

  const [checkEmail, setCheckEmail] = useState(false);
  const handleCheckEmail = async (email) => {
    const temp = email.toLowerCase();
    console.log(idNumber);
    if (idNumber == "" || name == "") {
      Alert.alert("Hãy điền đầy đủ thông tin", "", [
        {
          text: "Cancel",
          onPress: () => { },
        },
        { defaultIndex: 1 },
      ]);
    } else if (password === rePassword) {
      setCurrentStep(1);
    } else {
      Alert.alert("Xác nhập mật khẩu không đúng", "Nhập lại mật khẩu", [
        {
          text: "Cancel",
          onPress: () => { },
        },
        { defaultIndex: 1 },
      ]);
      setPassword(""), setRePassword("");
    }
    // await axios
    //   .get(HOST_API.local + `/api/auth/emailExist/${temp}`)
    //   .then((response) => {
    //     console.log(response.data);
    //     setCheckEmail(response.data);
    //     if (checkEmail.data == true) {
    //       Alert.alert("Email đã được đăng kí", "Nhập lại email", [
    //         {
    //           text: "Cancel",
    //           onPress: () => {},
    //         },
    //         { defaultIndex: 1 },
    //       ]);
    //       setEmail("");
    //     } else {

    //     }
    //   });
  };

  const register = async () => {
    const user = {
      email: email,
      idNumber: idNumber,
      password: password,
      fullname: name,
      phone: phone,
      address: address,
      districtId: districtValue,
      gender: genderValue,
      university: university,
      tutorLevel: levelValue,
      major: major,
      area: selectDistrict + ", " + selectProvince,
      imgCertificate: certificateValue,
      imgAvatar: imgProfile,
      imgIdFront: imgIdFontValue,
      imdIdBack: imgIdBackValue,
      subjects: subjectValue2,
    };
    console.log("Value: ", user);

    setLoader(true);
    try {
      const endpoint = HOST_API.local + "/api/auth/registerTutor";
      const response = await axios.post(endpoint, {
        email: user.email,
        idNumber: user.idNumber,
        password: user.password,
        fullname: user.fullname,
        phone: user.phone,
        address: user.address,
        districtId: user.districtId,
        gender: user.gender,
        university: user.university,
        tutorLevel: user.tutorLevel,
        major: user.major,
        area: user.area,
        imgCertificate: certificateValue,
        imgAvatar: user.imgAvatar,
        imgIdFront: imgIdFontValue,
        imdIdBack: imgIdBackValue,
        subjects: user.subjects,
      });
      console.log(response);
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
      console.log(error);
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
    <View style={{ marginTop: 30, marginBottom: 200 }}>
      <Heading title={"Đăng kí gia sư"} />
      <View
        style={{
          marginTop: 10,
          paddingHorizontal: 20,
          paddingTop: 30,
        }}
      >
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
            <KeyboardAwareScrollView extraScrollHeight={-50}>
              <View>
                <Text style={styles.itemText}>Email </Text>
                <TextInput
                  keyboardType="email-address"
                  style={styles.input}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Nhập email"
                />
              </View>
              <View>
                <Text style={styles.itemText}>Mật khẩu </Text>
                <TextInput
                  secureTextEntry={obscureText}
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  placeholder="Nhập mật khẩu"
                />
              </View>

              <View>
                <Text style={styles.itemText}>Nhập lại mật khẩu </Text>
                <TextInput
                  secureTextEntry={obscureText}
                  style={styles.input}
                  value={rePassword}
                  onChangeText={(text) => setRePassword(text)}
                  placeholder="Nhập lại mật khẩu"
                />
              </View>

              <View>
                <Text style={styles.itemText}>Họ và tên </Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={(text) => setName(text)}
                  placeholder="Nhập họ và tên"
                />
              </View>
              <View>
                <Text style={styles.itemText}>CCCD/CMND </Text>
                <TextInput
                  style={styles.input}
                  value={idNumber}
                  onChangeText={(text) => setIdNumber(text)}
                  placeholder="Nhập họ và tên"
                />
              </View>
            </KeyboardAwareScrollView>
          </Pressable>
          {/* {email != null && password != null && name != null && (
           
          )} */}

          <Button
            title={"Tiếp tục"}
            onPress={() => handleCheckEmail(email)}
            // onPress={() => setCurrentStep(1)}
            isValid={name}
            loader={false}
          />
        </View>
      )}

      {currentStep == 1 && (
        <ScrollView style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Thông tin cá nhân
          </Text>
          <Pressable>
            <KeyboardAwareScrollView extraScrollHeight={-50}>
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
                    {imageProfile && (
                      <Image
                        source={{ uri: imageProfile }}
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

              {/* Tỉnh thành */}
              <View>
                <Text style={styles.itemText}>Tỉnh thành</Text>
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
              <View>
                <Text style={styles.itemText}>Quận huyện</Text>
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

              <View>
                <Text style={styles.itemText}>Địa chỉ </Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={(text) => setAddress(text)}
                  placeholder="Nhập địa chỉ của bạn"
                />
              </View>

              {/* Giới tính */}
              <View>
                <Text style={styles.itemText}>Giới tính </Text>
                <TouchableOpacity
                  style={styles.dropdownSelector}
                  onPress={() => {
                    setIsClickGender(!isClickGender);
                  }}
                >
                  <Text>{selectGender}</Text>
                  {isClickGender ? (
                    <Ionicons name="chevron-down-outline" size={24} />
                  ) : (
                    <Ionicons name="chevron-up-outline" size={24} />
                  )}
                </TouchableOpacity>
                {isClickGender && (
                  <View style={styles.dropdownArea}>
                    <FlatList
                      data={GioiTinh}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            style={styles.item}
                            onPress={() => {
                              setSelectGender(item.label);
                              setIsClickGender(false);
                              setGenderValue(item.value);
                            }}
                          >
                            <Text>{item.label}</Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )}
              </View>

              <View>
                <Text style={styles.itemText}>Số điện thoại </Text>
                <TextInput
                  keyboardType="phone-pad"
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

          <Button
            title={"Tiếp tục"}
            onPress={() => setCurrentStep(2)}
            isValid={name}
            loader={false}
          />
          {/* {address != "" && phone != "" && address != null && phone != null && (
          
          )} */}
        </ScrollView>
      )}

      {currentStep == 2 && (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Thông tin chuyên môn
          </Text>
          <Pressable>
            <KeyboardAwareScrollView extraScrollHeight={-150}>
              <View style={{ zIndex: 20 }}>
                <Text style={styles.itemText}>Lớp học</Text>
                <DropDownPicker
                  style={styles.dropdownSelector}
                  items={lopHoc}
                  open={isClassOpen}
                  setOpen={() => setIsClassOpen(!isClassOpen)}
                  value={classValue}
                  setValue={(val) => setClassValue(val)}
                  placeholder="Chọn lớp học"
                  showTickIcon={true}
                  multiple={true}
                  min={1}
                  max={3}
                  mode="BADGE"
                  zIndex={20}
                  badgeColors={COLORS.secondMain}
                  badgeDotColors={["white"]}
                />
              </View>

              <View style={{ zIndex: 15 }}>
                <Text style={styles.itemText}>Môn học</Text>
                <DropDownPicker
                  style={styles.dropdownSelector}
                  items={subject2}
                  open={isOpen}
                  setOpen={() => setIsOpen(!isOpen)}
                  value={subjectValue2}
                  setValue={(val) => setSubjectValue2(val)}
                  placeholder="Chọn môn học"
                  showTickIcon={true}
                  showArrowIcon={true}
                  multiple={true}
                  min={1}
                  max={4}
                  mode="BADGE"
                  zIndex={20}
                  badgeColors={COLORS.secondMain}
                  badgeDotColors={["white"]}
                  backgroundColor=""
                />
              </View>

              <View>
                <Text style={styles.itemText}>Trình độ</Text>
                <TouchableOpacity
                  style={styles.dropdownSelector}
                  onPress={() => {
                    setIsClickLevel(!isClickLevel);
                  }}
                >
                  <Text>{selectLevel}</Text>
                  {isClickLevel ? (
                    <Ionicons name="chevron-down-outline" size={24} />
                  ) : (
                    <Ionicons name="chevron-up-outline" size={24} />
                  )}
                </TouchableOpacity>
                {isClickLevel && (
                  <View style={styles.dropdownArea}>
                    <FlatList
                      data={trinhDo}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            style={styles.item}
                            onPress={() => {
                              setSelectLevel(item.label);
                              setIsClickLevel(false);
                              setLevelValue(item.value);
                            }}
                          >
                            <Text>{item.label}</Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                )}
              </View>

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
            </KeyboardAwareScrollView>
          </Pressable>
          <Button
            title={"Trở lại"}
            onPress={() => setCurrentStep(1)}
            isValid={name}
            loader={false}
          />
          <Button
            title={"Tiếp tục"}
            onPress={() => setCurrentStep(3)}
            isValid={name}
            loader={false}
          />
        </View>
      )}

      {currentStep == 3 && (
        <ScrollView style={{ marginHorizontal: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Upload ảnh thông tin
          </Text>
          <Pressable>
            <KeyboardAwareScrollView extraScrollHeight={-150}>
              <View>
                {isImage === false ? (
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/userDefault.png")}
                      style={styles.certificate}
                    />
                    <TouchableOpacity
                      onPress={() => pickerIDFont()}
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
                      <Text style={styles.itemText}>Mặt trước CCCD</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ alignItems: "center" }}>
                    {imgIdFont && (
                      <Image
                        source={{ uri: imgIdFont }}
                        style={styles.certificate}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => pickerIDFont()}
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
                      <Text style={styles.itemText}>Mặt trước CCCD</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View>
                {isImage === false ? (
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/userDefault.png")}
                      style={styles.certificate}
                    />
                    <TouchableOpacity
                      onPress={() => pickerIDBack()}
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
                      <Text style={styles.itemText}>Mặt sau CCCD</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ alignItems: "center" }}>
                    {imgIdBack && (
                      <Image
                        source={{ uri: imgIdBack }}
                        style={styles.certificate}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => pickerIDBack()}
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
                      <Text style={styles.itemText}>Mặt sau CCCD</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* certificate */}
              <View>
                {isImage === false ? (
                  <View style={{ alignItems: "center" }}>
                    <Image
                      source={require("../assets/images/userDefault.png")}
                      style={styles.certificate}
                    />
                    <TouchableOpacity
                      onPress={() => pickerCertificate()}
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
                      <Text style={styles.itemText}>Bằng cấp</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ alignItems: "center" }}>
                    {imgCertificate && (
                      <Image
                        source={{ uri: imgCertificate }}
                        style={styles.certificate}
                      />
                    )}
                    <TouchableOpacity
                      onPress={() => pickerCertificate()}
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
                      <Text style={styles.itemText}>Bằng cấp </Text>
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
            title={"Đăng kí"}
            onPress={() => register()}
            isValid={name}
            loader={false}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default RegisterTutor;

const styles = StyleSheet.create({
  certificate: {
    height: 300,
    width: 400,
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "contain",
    marginTop: 10,
  },

  profileImg: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
  },

  avatar: {
    justifyContent: "center",
  },
  input: {
    paddingLeft: 10,
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
  },
  itemText: {
    padding: 10,
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.main,
  },

  dropdownSelector: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: COLORS.lightWhite,
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
    width: "80%",
    height: 50,
    borderBottomWidth: 0.2,
    borderBottomColor: "#8e8e8e",
    alignSelf: "center",
    justifyContent: "center",
  },
});
