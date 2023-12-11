import React, { useState } from "react";
import {
  ScrollView,
  TextInput,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS, SIZES } from "../constants";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);
  const [academicOpen, setAcademicOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState();
  const [academicValue, setAcademicValue] = useState();
  const [levelValue, setLevelValue] = useState();
  const [subjectValue, setSubjectValue] = useState();
  const [classValue, setClassValue] = useState();
  const [address, setAddress] = useState();

  const GioiTinh = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nu" },
  ];

  const trinhDo = [
    { label: "Dại học", value: "Student" },
    { label: "Giáo viên", value: "Teacher" },
  ];

  const hocLuc = [
    { label: "Giỏi", value: "Student" },
    { label: "Khá", value: "Teacher" },
    { label: "Trung bình", value: "Teacher" },
    { label: "Yếu", value: "Teacher" },
    { label: "Xuat sắc", value: "Teacher" },
  ];

  const monHoc = [
    { label: "Toán", value: "Toan" },
    { label: "Ly", value: "Ly" },
    { label: "Hóa", value: "Hóa" },
    { label: "Văn", value: "Văn" },
    { label: "Anh văn", value: "Anh văn" },
    { label: "Báo bai", value: "Báo bai" },
  ];

  const lopHoc = [
    { label: "1", value: "Toan" },
    { label: "2", value: "Ly" },
    { label: "3", value: "Hóa" },
    { label: "4", value: "Văn" },
    { label: "5", value: "Anh văn" },
    { label: "6", value: "Báo bai" },
  ];

  const [searchKey, setSearchKey] = useState("");
  const search = () => {
    console.log("Search result");
    if (subjectValue != undefined) {
      setSearchKey("subjectValue");
    }
    if (genderValue != undefined) {
      setSearchKey("subjectValue - genderValue");
    }
    if (levelValue != undefined) {
      setSearchKey("subjectValue - genderValue - levelValue");
    }
    if (academicValue != undefined) {
      setSearchKey("subjectValue - genderValue - levelValue - academicValue");
    }
    if (classValue != undefined) {
      setSearchKey(
        "subjectValue - genderValue - levelValue - academicValue - classValue"
      );
    }
    if (address != undefined) {
      setSearchKey(
        "subjectValue - genderValue - levelValue - academicValue - classValue - address"
      );
    }
    console.log(searchKey);
  };
  const [searchResult, setSearcResult] = useState([]);
  return (
    <ScrollView style={{ padding: 16, marginTop: 40, marginBottom: 100 }}>
      <SafeAreaView>
        <View style={styles.formSearch}>
          <View style={styles.fieldSearch}>
            <View style={{ flexDirection: "column", padding: 10, width: 190 }}>
              <DropDownPicker
                items={monHoc}
                open={isOpen}
                setOpen={() => setIsOpen(!isOpen)}
                value={subjectValue}
                setValue={(val) => setSubjectValue(val)}
                placeholder="Chọn môn học"
                showTickIcon={true}
                showArrowIcon={true}
                // multiple={true}
                // min={1}
                // max={4}
                mode="BADGE"
                zIndex={20}
                badgeColors={COLORS.secondMain}
                badgeDotColors={["white"]}
                style={{ marginBottom: 10 }}
              />

              <DropDownPicker
                items={GioiTinh}
                open={genderOpen}
                setOpen={() => setGenderOpen(!genderOpen)}
                value={genderValue}
                setValue={(val) => setGenderValue(val)}
                placeholder="Chọn giới tính"
                showTickIcon={true}
                zIndex={18}
                style={{ marginBottom: 10 }}
              />
              <DropDownPicker
                items={lopHoc}
                open={isClassOpen}
                setOpen={() => setIsClassOpen(!isClassOpen)}
                value={classValue}
                setValue={(val) => setClassValue(val)}
                placeholder="Chọn lớp học"
                showTickIcon={true}
                zIndex={17}
                style={{ marginBottom: 10 }}
              />
            </View>
            <View style={{ flexDirection: "column", padding: 10, width: 190 }}>
              <DropDownPicker
                items={trinhDo}
                open={levelOpen}
                setOpen={() => setLevelOpen(!levelOpen)}
                value={levelValue}
                setValue={(val) => setLevelValue(val)}
                placeholder="Chọn trình độ"
                showTickIcon={true}
                zIndex={20}
                style={{ marginBottom: 10 }}
              />
              <DropDownPicker
                items={hocLuc}
                open={academicOpen}
                setOpen={() => setAcademicOpen(!academicOpen)}
                value={academicValue}
                setValue={(val) => setAcademicValue(val)}
                placeholder="Chọn học lực"
                showTickIcon={true}
                zIndex={19}
                style={{ marginBottom: 10 }}
              />
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={(text) => setAddress(address)}
                placeholder="Dia chi "
              />
            </View>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={() => {
                search();
              }}
            >
              <Feather name="search" size={24} color={COLORS.offwhite} />
            </TouchableOpacity>
          </View>
        </View>

        {searchResult.length === 0 ? (
          <View style={{ flex: 1 }}>
            <Image
              source={require("../assets/images/Pose23.png")}
              style={styles.searchImage}
            />
          </View>
        ) : (
          <FlatList
            data={searchResult}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              {
              }
            }}
            style={{ marginHorizontal: 12 }}
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchImage: {
    resizeMode: "contain",
    width: SIZES.width - 100,
    height: SIZES.height - 300,
  },
  searchBtn: {
    width: 100,
    padding: 10,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },

  btn: {
    marginTop: -5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    zIndex: -1,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
    zIndex: 10,
  },
  fieldSearch: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  formSearch: {
    backgroundColor: COLORS.secondMain,
    borderRadius: 20,
  },
});
