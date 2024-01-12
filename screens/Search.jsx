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
  const [province, setProvince] = useState([]);
  const [provinceValue, setProvinceValue] = useState();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchProvince = async () => {
      try {
        const response = await axios.get(
          HOST_API.local + `/api/district/province`
        );
        let newArray = response.data.data.map((item) => {
          return { label: item.name, value: item.name };
        });
        setProvince(newArray);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoader(false);
      }
    };
    fetchProvince();
  }, []);

  const GioiTinh = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nữ" },
  ];

  const trinhDo = [
    { label: "Sinh viên", value: "Sinh viên" },
    { label: "Giáo viên", value: "Giáo viên" },
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

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    useFetch();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [searchTemp, setSearchTemp] = useState();
  const [searchValue, setSearchValue] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(HOST_API.local + `/api/clazz`);
      setSearchTemp(res.data.data);
      // setSearchValue(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const search = () => {
    setIsLoading(true);
    setSearchValue(searchTemp);

    if (genderValue !== undefined) {
      if (genderValue) {
        const newData = searchTemp.filter((item) => {
          const itemData = item.gender
            ? item.gender.toUpperCase()
            : "".toUpperCase();
          const textData = genderValue.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setSearchValue(newData);
      } else {
        setSearchValue(searchTemp);
      }
    }

    if (levelValue !== undefined) {
      if (levelValue) {
        const newData = searchValue.filter((item) => {
          const itemData = item.tutorLevel
            ? item.tutorLevel.toUpperCase()
            : "".toUpperCase();
          const textData = levelValue.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setSearchValue(newData);
      } else {
        setSearchValue(searchTemp);
      }
    }

    if (provinceValue !== undefined) {
      if (provinceValue) {
        console.log(provinceValue);
        const newData = searchValue.filter((item) => {
          const itemData = item.provinceName
            ? item.provinceName.toUpperCase()
            : "".toUpperCase();
          const textData = provinceValue.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setSearchValue(newData);
      } else {
        setSearchValue(searchTemp);
      }
    }
    setIsLoading(false);
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
                min={1}
                max={1}
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
                items={province}
                open={academicOpen}
                setOpen={() => setAcademicOpen(!academicOpen)}
                value={provinceValue}
                setValue={(val) => setProvinceValue(val)}
                placeholder="Chọn tỉnh thành"
                showTickIcon={true}
                zIndex={19}
                style={{ marginBottom: 10 }}
              />
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={(text) => setAddress(address)}
                placeholder="Địa chỉ "
              />
            </View>
          </View>
          <View style={styles.btn}>
            <TouchableOpacity style={styles.searchBtn} onPress={search}>
              <Feather name="search" size={24} color={COLORS.offwhite} />
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? (
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primarys} />
        ) : (
          <View>
            {searchValue == null ? (
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../assets/images/Pose23.png")}
                  style={styles.searchImage}
                />
              </View>
            ) : searchValue.length == 0 ? (
              <View style={{ flex: 1 }}>
                <Image
                  source={require("../assets/images/Pose23.png")}
                  style={styles.searchImage}
                />
              </View>
            ) : (
              <View style={{ marginBottom: 450 }}>
                <FlatList
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  data={searchValue}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => <ClassItem item={item} />}
                />
              </View>
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
    padding: 10,
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
