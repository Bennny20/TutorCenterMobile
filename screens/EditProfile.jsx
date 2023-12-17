import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  Platform,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import Heading from "../components/Heading";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { userDefault } from "../assets/images/userDefault.png";
import { COLORS, HOST_API, SIZES } from "../constants";
import * as Yup from "yup";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { TextInput, FlatList } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(8, "Provide your full name").required("Required"),
  phoneNumber: Yup.string()
    .min(10, "Your phone number must be 10 number")
    .max(10, "Your phone number must be 10 number")
    .required("Required"),
});

const EditProfile = () => {
  const route = useRoute();
  const { userData, userTutor } = route.params;
  const [name, setName] = useState();
  const [idNumber, setIdNumber] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [university, setUniversity] = useState();
  const [major, setMajor] = useState();
  const imageID = userTutor.imgId.split("~");

  //Tinh thanh
  const [selectProvince, setSelectProvince] = useState(userTutor.provinceName);
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
  const [selectDistrict, setSelectDistrict] = useState(userTutor.districtName);
  const [isClickDistrict, setIsClickDistrict] = useState(false);
  const [district, setDistrict] = useState([]);
  const [districtValue, setDistrictValue] = useState();
  async function handLoadDistrict(idProvince) {
    const response = await fetch(
      HOST_API.local + `/api/district/province/${idProvince}`
    );
    setDistrict(await response.json());
  }

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

  const [selectGender, setSelectGender] = useState("Chọn giới tính gia sư");
  const [isClickGender, setIsClickGender] = useState(false);
  const [genderValue, setGenderValue] = useState("");
  const GioiTinh = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
  ];

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

  return (
    <SafeAreaView>
      <Heading title={"Chỉnh sửa thông tin "} />

      <ScrollView style={{ marginTop: 15, marginBottom: 40 }}>
        <View style={styles.avatar}>
          {isImage === false ? (
            <View style={{ alignItems: "center" }}>
              <Image
                source={{
                  uri:
                    HOST_API.local + "/api/user/image/" + userTutor.imgAvatar,
                }}
                style={styles.profileImg}
              />
              <TouchableOpacity
                onPress={() => pickerImage()}
                style={{
                  marginTop: 10,
                  height: 30,
                  width: "30%",
                  backgroundColor: "skyblue",
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20 }}>Avatar</Text>
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

        <KeyboardAwareScrollView extraScrollHeight={50}>
          {/* Email */}
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.itemText}>Email </Text>
            <TextInput
              editable={false}
              style={styles.input}
              value={userTutor.email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Nhập email"
            />
          </View>

          {/* Name */}
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.itemText}>Họ và tên</Text>
            <TextInput
              style={styles.input}
              value={userTutor.fullName}
              onChangeText={(text) => setName(text)}
              placeholder="Nhập email"
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

          {/* CCCD */}
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.itemText}>Số CCCD</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              value={userTutor.idNumber}
              onChangeText={(text) => setIdNumber(text)}
              placeholder="Nhập email"
            />
          </View>

          {/* Số điện thoại */}
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.itemText}>Số điện thoại</Text>
            <TextInput
              keyboardType="number-pad"
              style={styles.input}
              value={userTutor.phone}
              onChangeText={(text) => setPhone(text)}
              placeholder="Nhập email"
            />
          </View>

          {/* Tỉnh thành */}
          <View style={{ marginBottom: 5 }}>
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
          <View style={{ marginBottom: 5 }}>
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

          {/* Địa chỉ */}
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.itemText}>Địa chỉ </Text>
            <TextInput
              style={styles.input}
              value={userTutor.address}
              onChangeText={(text) => setAddress(text)}
              placeholder="Nhập địa chỉ của bạn"
            />
          </View>

          {/* Trường đại học*/}
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.itemText}>Trường đại học</Text>
            <TextInput
              style={styles.input}
              value={userTutor.university}
              onChangeText={(text) => setUniversity(text)}
              placeholder="Nhập trương đại học"
            />
          </View>

          {/* Ngành học*/}
          <View style={{ marginBottom: 5 }}>
            <Text style={styles.itemText}>Chuyên ngành học </Text>
            <TextInput
              style={styles.input}
              value={userTutor.major}
              onChangeText={(text) => setMajor(text)}
              placeholder="Nhập ngành học"
            />
          </View>

          {/* Lớp học */}
          {/* <View style={{ zIndex: 20 }}>
            <Text style={styles.itemText}>Lớp học</Text>
            <DropDownPicker
              style={styles.dropdownSelector}
              items={lopHoc}
              open={isClassOpen}
              setOpen={() => setIsClassOpen(!isClassOpen)}
              value={classValue}
              setValue={(val) => setClassValue(val)}
              placeholder={userTutor.}
              showTickIcon={true}
              multiple={true}
              min={1}
              max={3}
              mode="BADGE"
              zIndex={20}
              badgeColors={COLORS.secondMain}
              badgeDotColors={["white"]}
            />
          </View> */}

          {/* Mặt trước */}
          <View>
            {isImage === false ? (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{
                    uri: HOST_API.local + "/api/user/image/" + imageID[0],
                  }}
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

          {/* Mặt sau */}
          <View>
            {isImage === false ? (
              <View style={{ alignItems: "center" }}>
                <Image
                  source={{
                    uri: HOST_API.local + "/api/user/image/" + imageID[1],
                  }}
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
                  source={{
                    uri:
                      HOST_API.local +
                      "/api/user/image/" +
                      userTutor.imgCertificate,
                  }}
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
                  <Text style={styles.itemText}>Bằng cấp</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

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
  itemText: {
    paddingLeft: 10,
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.main,
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
  certificate: {
    height: 300,
    width: 400,
    borderRadius: 10,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "contain",
    marginTop: 10,
  },
});
