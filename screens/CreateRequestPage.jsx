import React, { useState } from "react";
import { ScrollView, TextInput, View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS, SIZES } from "../constants";

const CreateRequestPage = () => {
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

  return (
    <ScrollView style={{ padding: 16, marginTop: 40, marginBottom: 100 }}>
      <View style={styles.title}>
        <Text style={styles.titleText}> Đăng kí tìm gia sư</Text>
      </View>
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
      {/* <View style={{ zIndex: 15 }}>
        <Text style={styles.itemText}>Tỉnh thành</Text>
        <DropDownPicker
          items={lopHoc}
          open={isClassOpen}
          setOpen={() => setIsClassOpen(!isClassOpen)}
          value={classValue}
          setValue={(val) => setClassValue(val)}
          placeholder="Chọn lớp học"
          showTickIcon={true}
          zIndex={10}
        />
      </View>
      <View style={{ zIndex: 14 }}>
        <Text style={styles.itemText}>Quận huyện </Text>
        <DropDownPicker
          items={lopHoc}
          open={isClassOpen}
          setOpen={() => setIsClassOpen(!isClassOpen)}
          value={classValue}
          setValue={(val) => setClassValue(val)}
          placeholder="Chọn lớp học"
          showTickIcon={true}
          zIndex={10}
        />
      </View> */}
      <View>
        <Text style={styles.itemText}>Địa chỉ </Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={(text) => setAddress(address)}
          placeholder="Dia chi "
        />
      </View>

      <View>
        <Text style={styles.itemText}>Mô tả thêm </Text>
        <TextInput
          style={styles.inputArea}
          value={address}
          multiline
          numberOfLines={10}
          onChangeText={(text) => setAddress(address)}
          placeholder="Thông tin thêm"
        />
      </View>

      <View style={styles.btn}>
        <Text style={styles.btnText}>Đăng kí</Text>
      </View>
    </ScrollView>
  );
};

export default CreateRequestPage;

const styles = StyleSheet.create({
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
