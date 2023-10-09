import {
  TouchableOpacity,
  TextInput,
  View,
  Image,
  ScrollView,
  Text,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Search.style";
import { Ionicons, Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";

const Search = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);
  const [academicOpen, setAcademicOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState();
  const [academicValue, setAcademicValue] = useState();
  const [levelValue, setLevelValue] = useState();
  const [subjectValue, setSubjectValue] = useState([]);
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
  const [searchResult, setSearcResult] = useState([]);

  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.get(``);
  //     // console.log("====================");
  //     // console.log(response.data);
  //     // console.log("====================");
  //     setSearcResult(response.data);
  //   } catch (error) {
  //     // console.log("Failed to get products", error);
  //   }
  // };
  // console.log(searchKey);
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          {/* <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="What are you looking for "
          /> */}
          <DropDownPicker
            items={monHoc}
            open={isOpen}
            setOpen={() => setIsOpen(!isOpen)}
            value={subjectValue}
            setValue={(val) => setSubjectValue(val)}
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
          />
          <DropDownPicker
            items={lopHoc}
            open={isClassOpen}
            setOpen={() => setIsClassOpen(!isClassOpen)}
            value={classValue}
            setValue={(val) => setClassValue(val)}
            placeholder="Chọn lớp học"
            showTickIcon={true}
            zIndex={-1}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => handleSearch()}
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
  );
};

export default Search;
