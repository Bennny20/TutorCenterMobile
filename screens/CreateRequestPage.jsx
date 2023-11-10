import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { Pressable } from "react-native";

const CreateRequestPage = () => {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);
  const [academicOpen, setAcademicOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState();
  const [academicValue, setAcademicValue] = useState();
  const [levelValue, setLevelValue] = useState();
  const [subjectValue, setSubjectValue] = useState([]);
  const [classValue, setClassValue] = useState("");
  const [address, setAddress] = useState("");
  const [slot, setSlot] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  // const [province, setProvince] = useState([]);

  // useEffect(() => {
  //   const fetchProvince = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://192.168.1.203/api/district/province"
  //       );
  //       setProvince(response.data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   fetchProvince();
  // }, []);

  // console.log(province);

  const GioiTinh = [
    { label: "Nam", value: "Nam" },
    { label: "Nữ", value: "Nu" },
  ];

  const trinhDo = [
    { label: "Sinh viên", value: "Sinh viên" },
    { label: "Giáo viên", value: "Giáo viên" },
    { label: "Sinh viên - Giáo viên", value: "Sinh viên - Giáo viên" },
  ];

  const hocLuc = [
    { label: "Giỏi", value: "Giỏi" },
    { label: "Khá", value: "Khá" },
    { label: "Trung bình", value: "Trung bình" },
    { label: "Yếu", value: "Yếu" },
    { label: "Xuat sắc", value: "Xuất sắc" },
  ];

  const monHoc = [
    { label: "Toán", value: "Toán" },
    { label: "Ly", value: "Ly" },
    { label: "Hóa", value: "Hóa" },
    { label: "Văn", value: "Văn" },
    { label: "Anh văn", value: "Anh văn" },
    { label: "Tin học", value: "Tin học" },
    { label: "Đánh đàn", value: "Đánh đàn" },
    { label: "Báo bai", value: "Báo bai" },
    { label: "Khác", value: "Khác" },
  ];

  const lopHoc = [
    { label: "1", value: "Lớp 1" },
    { label: "2", value: "Lớp 2" },
    { label: "3", value: "Lớp 3" },
    { label: "4", value: "Lớp 4" },
    { label: "5", value: "Lớp 5" },
    { label: "6", value: "Lớp 6" },
    { label: "7", value: "Lớp 7" },
    { label: "8", value: "Lớp 8" },
    { label: "9", value: "Lớp 9" },
    { label: "10", value: "Lớp 10" },
    { label: "11", value: "Lớp 11" },
    { label: "12", value: "Lớp 12" },
    { label: "Khác", value: "Order" },
  ];

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerEnd, setShowPickerEnd] = useState(false);

  const formatData = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}/${month}/${year}`;
  };

  const toggleDatePickerStart = () => {
    setShowPicker(!showPicker);
  };

  const confirmDateStart = () => {
    setDateStart(formatData(date));
    toggleDatePickerStart();
  };

  const onChangeStart = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatePickerStart();
    }
  };

  const toggleDatePickerEnd = () => {
    setShowPickerEnd(!showPickerEnd);
  };

  const confirmDateEnd = () => {
    setDateEnd(formatData(date));
    toggleDatePickerEnd();
  };

  const onChangeEnd = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
    } else {
      toggleDatePickerEnd();
    }
  };

  const profileId = "6549376222941aaa4f72bf3f";
  const handleCreate = () => {
    const newRequest = {
      parent: profileId,
      address: address,
      major: subjectValue,
      classNo: classValue,
      slot: slot,
      level: levelValue,
      gender: genderValue,
      price: price,
      dateStart: dateStart,
      dateEnd: dateEnd,
      academicAbility: academicValue,
      description: description,
      status: "Chưa duyệt",
    };
    console.log(newRequest);

    // axios
    //   .post("https://tutor-center.onrender.com/request/create", newRequest)
    //   .then((response) => {
    //     console.log(response.data);
    //     Alert.alert("Tạo yêu cầu thành công", "Quản lý yêu cầu", [
    //       {
    //         text: "Cancel",
    //         onPress: () => navigation.navigate("ManageRequest"),
    //       },
    //       {
    //         text: "Continue",
    //         onPress: () => {
    //           navigation.navigate("ManageRequest", { profileId });
    //         },
    //       },
    //       { defaultIndex: 1 },
    //     ]);
    //   })
    //   .catch((error) => {
    //     Alert.alert("Tạo yêu cầu không thành công", "Quản lý yêu cầu", [
    //       {
    //         text: "Cancel",
    //         onPress: () => {},
    //       },
    //       {
    //         text: "Continue",
    //         onPress: () => {
    //           navigation.navigate("ManageRequest", { profileId });
    //         },
    //       },
    //       { defaultIndex: 1 },
    //     ]);
    //     console.log("Create failed", error);
    //   });
  };

  return (
    <View style={{ padding: 16, marginTop: 40, marginBottom: 80 }}>
      <View style={styles.title}>
        <Text style={styles.titleText}> Đăng kí tìm gia sư</Text>
      </View>

      <KeyboardAwareScrollView extraScrollHeight={50}>
        <View style={{ zIndex: 20 }}>
          <Text style={styles.itemText}>Môn học</Text>
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
        </View>
        <View style={{ zIndex: 19 }}>
          <Text style={styles.itemText}>Lớp học</Text>

          {/* <DropDownPicker
            schema={{
              label: data.name,
              value: data.codename,
            }}
            open={isClassOpen}
            setOpen={() => setIsClassOpen(!isClassOpen)}
            value={classValue}
            setValue={(val) => setClassValue(val)}
            placeholder="Chọn lớp học"
            showTickIcon={true}
            zIndex={10}
          /> */}
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
        <View style={{ zIndex: 18 }}>
          <Text style={styles.itemText}>Trình độ</Text>
          <DropDownPicker
            items={trinhDo}
            open={levelOpen}
            setOpen={() => setLevelOpen(!levelOpen)}
            value={levelValue}
            setValue={(val) => setLevelValue(val)}
            placeholder="Chọn trình độ"
            showTickIcon={true}
            zIndex={10}
          />
        </View>
        <View style={{ zIndex: 17 }}>
          <Text style={styles.itemText}>Học lực</Text>
          <DropDownPicker
            items={hocLuc}
            open={academicOpen}
            setOpen={() => setAcademicOpen(!academicOpen)}
            value={academicValue}
            setValue={(val) => setAcademicValue(val)}
            placeholder="Chọn học lực"
            showTickIcon={true}
            zIndex={10}
          />
        </View>
        <View style={{ zIndex: 16 }}>
          <Text style={styles.itemText}>Giới tính </Text>
          <DropDownPicker
            items={GioiTinh}
            open={genderOpen}
            setOpen={() => setGenderOpen(!genderOpen)}
            value={genderValue}
            lec
            setValue={(val) => setGenderValue(val)}
            placeholder="Chọn giới tính gia sư"
            showTickIcon={true}
            zIndex={10}
          />
        </View>

        <View>
          <Text style={styles.itemText}>Địa chỉ </Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholder="Dia chi "
          />
        </View>

        <View>
          <Text style={styles.itemText}>Lương </Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={(text) => setPrice(text)}
            placeholder="Dia chi "
          />
        </View>

        <View>
          <Text style={styles.itemText}>Số buổi </Text>
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            value={slot}
            onChangeText={(text) => setSlot(text)}
            placeholder="Số buổi"
          />
        </View>

        <View>
          <Text style={styles.itemText}>Ngày bắt đầu</Text>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChangeStart}
              style={styles.datePicker}
              minimumDate={new Date("2020-1-1")}
            />
          )}

          {showPicker && Platform.OS === "ios" && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.picketButton,
                  { backgroundColor: "#11182711" },
                ]}
                onPress={toggleDatePickerStart}
              >
                <Text style={[styles.buttonText, { color: "#075985" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.picketButton]}
                onPress={confirmDateStart}
              >
                <Text style={[styles.buttonText]}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}
          {!showPicker && (
            <Pressable onPress={toggleDatePickerStart}>
              <TextInput
                style={styles.input}
                value={dateStart}
                onChangeText={setDateStart}
                placeholder="Ngày bắt đầu "
                editable={false}
                onPressIn={toggleDatePickerStart}
              />
            </Pressable>
          )}
        </View>

        <View>
          <Text style={styles.itemText}>Ngày kết thúc</Text>
          {showPickerEnd && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChangeEnd}
              style={styles.datePicker}
              minimumDate={new Date("2020-1-1")}
            />
          )}

          {showPickerEnd && Platform.OS === "ios" && (
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.picketButton,
                  { backgroundColor: "#11182711" },
                ]}
                onPress={toggleDatePickerEnd}
              >
                <Text style={[styles.buttonText, { color: "#075985" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.picketButton]}
                onPress={confirmDateEnd}
              >
                <Text style={[styles.buttonText]}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}
          {!showPickerEnd && (
            <Pressable onPress={toggleDatePickerEnd}>
              <TextInput
                style={styles.input}
                value={dateEnd}
                onChangeText={setDateEnd}
                placeholder="Ngày kết thúc "
                editable={false}
                onPressIn={toggleDatePickerEnd}
              />
            </Pressable>
          )}
        </View>

        <View>
          <Text style={styles.itemText}>Mô tả thêm </Text>
          <TextInput
            style={styles.inputArea}
            value={description}
            multiline
            numberOfLines={10}
            onChangeText={(text) => setDescription(text)}
            placeholder="Thông tin thêm"
          />
        </View>
        <TouchableOpacity onPress={handleCreate}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Đăng kí</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default CreateRequestPage;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  picketButton: {
    paddingHorizontal: 20,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginVertical: 10,
    backgroundColor: COLORS.main,
  },
  btnText: {
    borderWidth: 2,
    borderColor: COLORS.main,
    padding: 15,
    borderRadius: 15,
    fontFamily: "bold",
    fontSize: SIZES.medium,
    color: COLORS.main,
  },
  btn: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  inputArea: {
    height: 90,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.lightWhite,
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
  item: {
    marginVertical: 10,
    marginHorizontal: 10,
  },

  titleText: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.main,
  },
  title: {
    justifyContent: "center",
    alignItems: "center",
  },
});
