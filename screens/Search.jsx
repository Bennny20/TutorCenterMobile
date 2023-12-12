import React, { useEffect, useState } from "react";
import {
  ScrollView,
  TextInput,
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS, HOST_API, SIZES } from "../constants";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import useFetch from "../hook/Class/useFetch";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ClassItem from "../components/Class/ClassItem";
import axios from "axios";

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
    { label: "Nữ", value: "Nữ" },
    { label: "Nam - Nữ", value: "Nam - Nữ" },
  ];

  const trinhDo = [
    { label: "Sinh viên", value: "Sinh viên" },
    { label: "Giáo viên", value: "Giáo viên" },
    { label: "Sinh viên - Giáo viên", value: "Sinh viên - Giáo viên" },
    { label: "hhh", value: "HHH" },
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
  const [searchTemp, setSearchTemp] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(HOST_API.local + `/api/clazz`);
      setSearchTemp(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const [searchValue, setSearchValue] = useState([]);
  const search = async () => {
    setSearchValue([]);
    if (genderValue === undefined && levelValue === undefined) {
      setSearchValue(searchTemp);
    }

    // if (searchValue.length > 0) {
    //   console.log("searchValue");

    //   if (genderValue !== undefined) {
    //     const newArray = [];
    //     console.log(searchTemp);
    //     for (let index = 0; index < searchValue.length; index++) {
    //       if (genderValue === "Nam") {
    //         if (
    //           searchTemp[index].gender === "Nam" ||
    //           searchTemp[index].gender === "Nam - Nữ"
    //         ) {
    //           // console.log(searchTemp[index]);
    //           newArray.push(searchTemp[index]);
    //         }
    //       }

    //       if (genderValue === "Nữ") {
    //         if (
    //           searchTemp[index].gender === "Nữ" ||
    //           searchTemp[index].gender === "Nam - Nữ"
    //         ) {
    //           // console.log(searchTemp[index]);
    //           newArray.push(searchTemp[index]);
    //         }
    //       }

    //       if (genderValue === "Nam - Nữ") {
    //         newArray.push(searchTemp[index]);
    //       }
    //     }
    //     setSearchValue(newArray);
    //   }

    //   if (levelValue !== undefined) {
    //     const newArray = [];
    //     for (let index = 0; index < searchValue.length; index++) {
    //       if (levelValue === "Sinh viên") {
    //         if (
    //           searchTemp[index].gender === "Sinh viên" ||
    //           searchTemp[index].gender === "Sinh viên - Giáo viên"
    //         ) {
    //           // console.log(searchTemp[index]);
    //           newArray.push(searchTemp[index]);
    //         }
    //       }

    //       if (levelValue === "Giáo viên") {
    //         if (
    //           searchTemp[index].gender === "Giáo viên" ||
    //           searchTemp[index].gender === "Sinh viên - Giáo viên"
    //         ) {
    //           // console.log(searchTemp[index]);
    //           newArray.push(searchTemp[index]);
    //         }
    //       }

    //       if (levelValue === "Sinh viên - Giáo viên") {
    //         newArray.push(searchTemp[index]);
    //       }
    //     }
    //     setSearchValue(newArray);
    //   }
    // }

    if (genderValue !== undefined) {
      const newArray = [];
      for (let index = 0; index < searchTemp.length; index++) {
        if (genderValue === "Nam") {
          if (
            searchTemp[index].gender === "Nam" ||
            searchTemp[index].gender === "Nam - Nữ"
          ) {
            // console.log(searchTemp[index]);
            newArray.push(searchTemp[index]);
          }
        }

        if (genderValue === "Nữ") {
          if (
            searchTemp[index].gender === "Nữ" ||
            searchTemp[index].gender === "Nam - Nữ"
          ) {
            // console.log(searchTemp[index]);
            newArray.push(searchTemp[index]);
          }
        }

        if (genderValue === "Nam - Nữ") {
          newArray.push(searchTemp[index]);
        }
      }
      setSearchValue(newArray);
    }

    if (levelValue !== undefined) {
      const newArray = [];
      for (let index = 0; index < searchTemp.length; index++) {
        if (levelValue === "Sinh viên") {
          if (
            searchTemp[index].tutorLevel === "Sinh viên" ||
            searchTemp[index].tutorLevel === "Sinh viên - Giáo viên"
          ) {
            console.log(searchTemp[index]);
            newArray.push(searchTemp[index]);
          }
        }

        if (levelValue === "Giáo viên") {
          if (
            searchTemp[index].tutorLevel === "Giáo viên" ||
            searchTemp[index].tutorLevel === "Sinh viên - Giáo viên"
          ) {
            console.log(searchTemp[index]);
            newArray.push(searchTemp[index]);
          }
        }

        if (levelValue === "Sinh viên - Giáo viên") {
          newArray.push(searchTemp[index]);
        }
      }
      setSearchValue(newArray);
    }

    // console.log("Search: ", searchValue);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ padding: 16, marginTop: 40, marginBottom: 100 }}>
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
            <TouchableOpacity style={styles.searchBtn} onPress={search}>
              <Feather name="search" size={24} color={COLORS.offwhite} />
            </TouchableOpacity>
          </View>
        </View>

        {searchValue?.length == 0 ? (
          <View style={{ flex: 1 }}>
            <Image
              source={require("../assets/images/Pose23.png")}
              style={styles.searchImage}
            />
          </View>
        ) : (
          <View style={{ marginBottom: 450 }}>
            {isLoading ? (
              <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primarys} />
            ) : (
              <FlatList
                data={searchValue}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <ClassItem item={item} />}
              />
            )}
          </View>
        )}
      </View>
    </GestureHandlerRootView>
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
