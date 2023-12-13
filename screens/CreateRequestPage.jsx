import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  LogBox,
  ActivityIndicator,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { COLORS, SIZES, HOST_API } from "../constants";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { Pressable } from "react-native";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateRequestPage = () => {
  useEffect(() => {
    checkExitingUser();
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const checkExitingUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token != null) {
      setLoader(true);
      try {
        const currentUser = await axios.get(
          HOST_API.local + `/api/user/authProfile`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (currentUser !== null) {
          setUserData(currentUser.data.data);
          setUser(currentUser.data.data.id);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoader(false);
      }
    } else {
      Alert.alert("Bạn chưa đăng nhập", "Đăng nhập ngay", [
        {
          text: "Cancel",
          onPress: () => navigation.replace("Bottom Navigation"),
        },
        {
          text: "Continue",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    }
  };

  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [slot, setSlot] = useState(0);
  const [phone, setPhone] = useState();
  const [price, setPrice] = useState("");
  const [priceValue, setPriceValue] = useState(0);
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [dateStartValue, setDateStartValue] = useState("");
  const [dateEndValue, setDateEndValue] = useState("");

  //Tỉnh thành
  const [selectProvince, setSelectProvince] = useState(
    "Chọn tỉnh thành nơi dạy"
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
    "Chọn quận/huyện nơi dạy"
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
    { label: "Nam - Nữ", value: "Nam - Nữ" },
  ];

  //Slot length
  const [selectSlotLength, setSelectSlotLength] =
    useState("Chọn thời gian dạy");
  const [isSlotLength, setIsSlotLength] = useState(false);
  const [slotLength, setSlotLength] = useState("");
  const thoiLuong = [
    { label: "1 Giờ", value: 1 },
    { label: "1 Giờ 30 Phút", value: 2 },
    { label: "2 Giờ", value: 3 },
    { label: "2 Giờ 30 Phút", value: 4 },
    { label: "3 Giờ", value: 5 },
  ];

  //Trình độ
  const [selectLevel, setSelectLevel] = useState("Chọn trình độ gia sư");
  const [isClickLevel, setIsClickLevel] = useState(false);
  const [levelValue, setLevelValue] = useState("");
  const trinhDo = [
    { label: "Sinh viên", value: "Sinh viên" },
    { label: "Giáo viên", value: "Giáo viên" },
    { label: "Sinh viên - Giáo viên", value: "Sinh viên - Giáo viên" },
  ];

  //Lớp học
  const [selectClass, setSelectClass] = useState("Chọn lớp học");
  const [isClickClass, setIsClickClass] = useState(false);
  const [classValue, setClassValue] = useState("");
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

  const [dayOfWeekOpen, setDayOfWeekOpen] = useState(false);
  const [dayOfWeekValue, setDayOfWeekValue] = useState([]);
  const ngayTrongTuan = [
    { label: "Thứ 2", value: "Thứ 2" },
    { label: "Thứ 3", value: "Thứ 3" },
    { label: "Thứ 4", value: "Thứ 4" },
    { label: "Thứ 5", value: "Thứ 5" },
    { label: "Thứ 6", value: "Thứ 6" },
    { label: "Lớp 7", value: "Thứ 7" },
    { label: "Chủ nhật", value: "Chủ nhật" },
  ];

  const [selectTime, setSelectTime] = useState("Chọn thời gian dạy");
  const [timeOpen, setTimeOpen] = useState(false);
  const [timeValue, setTimeValue] = useState([]);
  const time = [
    { label: "Buổi sáng", value: "Buổi sáng" },
    { label: "Buổi chiều", value: "Buổi chiều" },
    { label: "Buổi tối", value: "Buổi tối" },
    { label: "17h00-18h30", value: "17h00-18h30" },
    { label: "17h30-19h00", value: "17h30-19h00" },
    { label: "18h00-19h30", value: "18h00-19h30" },
    { label: "18h30-20h00", value: "18h30-20h00" },
    { label: "19h00-20h30", value: "19h00-20h30" },
    { label: "19h30-21h00", value: "19h30-21h00" },
    { label: "20h00-21h30", value: "20h00-21h30" },
    { label: "20h30-22h00", value: "20h30-22h00" },
  ];

  //Môn học
  const [selectSubject, setSelectSubject] = useState("Chọn môn học");
  const [isClickSubject, setIsClickSubject] = useState(false);
  const [subject, setSubject] = useState([]);
  const [subjectValue, setSubjectValue] = useState([]);
  async function handLoadSubject(classNo) {
    const response = await fetch(
      HOST_API.local + `/api/subject/level?level=` + classNo
    );
    await response.json().then((data) => {
      setSubject(data.data);
      let newArray = data.data.map((item) => {
        return { label: item.name, value: item.id };
      });
      setSubject2(newArray);
      // console.log(subject2);
    });
  }

  const [isOpen, setIsOpen] = useState(false);
  const [subjectValue2, setSubjectValue2] = useState([]);
  const [subject2, setSubject2] = useState([]);
  //Chi phí
  const [isGetTuition, setIsGetTuition] = useState(false);
  const [getTuitionValue, setGetTuitionValue] = useState(false);
  const getTuition = (value) => {
    return setGetTuitionValue(value), setIsGetTuition(true);
  };

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

    return `${year}-${month}-${day}`;
  };

  const toggleDatePickerStart = () => {
    setShowPicker(!showPicker);
  };

  const confirmDateStart = () => {
    setDateStartValue(date);
    setDateStart(formatData(date));
    console.log(dateStartValue);
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
    setDateEndValue(date);
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

  const onClose = () => {
    setIsClickSubject(!isClickSubject);
  };

  const handleCreate = async () => {
    const request = {
      phone: phone,
      address: address,
      listSubjectId: [subjectValue],
      gender: genderValue,
      daysOfWeek: dayOfWeekValue.join(", "),
      time: timeValue,
      slots: Number(slot),
      slotsLength: slotLength,
      tuition: Number(price),
      notes: description,
      dateStart: dateStartValue,
      dateEnd: dateEndValue,
      districtId: districtValue,
      tutorLevel: levelValue,
    };
    console.log(request);
    // console.log(
    //   dateStartValue.getFullYear() +
    //     " - " +
    //     (dateStartValue.getMonth() + 1) +
    //     " - " +
    //     dateStartValue.getDate()
    // );
    const token = await AsyncStorage.getItem("token");
    axios
      .post(
        HOST_API.local + "/api/request/create",
        {
          phone: phone,
          address: address,
          listSubjectId: [subjectValue],
          gender: genderValue,
          daysOfWeek: dayOfWeekValue.join(", "),
          time: timeValue,
          slots: Number(slot),
          slotsLength: slotLength,
          tuition: Number(price),
          notes: description,
          dateStart: dateStartValue,
          dateEnd: dateEndValue,
          districtId: districtValue,
          tutorLevel: levelValue,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.responseCode == "00") {
          setSelectProvince("Chọn tỉnh thành nơi dạy");
          setSelectDistrict("Chọn quận/huyên nơi dạy");
          setSelectGender("Chọn giới tính gia sư");
          setSelectSlotLength("Chọn thời gian dạy");
          setSelectLevel("Chọn trình độ gia sư");
          setSelectClass("Chọn lớp học");
          setSelectSubject("Chọn môn học");
          setIsGetTuition(false);
          setSlot(0);
          setPhone();
          setPrice(0);
          setDateStart("");
          setDateEnd("");
          setAddress("");
          setDescription("");

          Alert.alert("Tạo yêu cầu thành công", "Quản lý yêu cầu", [
            {
              text: "Cancel",
              onPress: () => {
                // navigation.navigate("ManageRequest");
              },
            },
            {
              text: "Continue",
              onPress: () => {
                navigation.navigate("ManageRequest", {
                  user,
                  userData,
                });
              },
            },
            { defaultIndex: 1 },
          ]);
        } else {
          Alert.alert("Tạo yêu cầu không thành công", "Quản lý yêu cầu", [
            {
              text: "Cancel",
              onPress: () => {},
            },
            {
              text: "Continue",
              onPress: () => {
                // navigation.navigate("ManageRequest", { profileId });
              },
            },
            { defaultIndex: 1 },
          ]);
        }
      })
      .catch((error) => {
        Alert.alert("Tạo yêu cầu không thành công", "Quản lý yêu cầu", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {
              // navigation.navigate("ManageRequest", { profileId });
            },
          },
          { defaultIndex: 1 },
        ]);
        console.log("Create failed", error);
      });
  };

  const formattedAmount = (number) => {
    return Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  };

  const inputPrice = (text) => {
    console.log(text);
    if (text) {
      setPrice(formattedAmount(text));
      setPriceValue(text);
    }
  };
  return (
    <View style={{ padding: 16, marginTop: 40, marginBottom: 80 }}>
      <View style={styles.title}>
        <Text style={styles.titleText}> Đăng kí tìm gia sư</Text>
      </View>

      <KeyboardAwareScrollView extraScrollHeight={50}>
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

        {/* Địa chỉ */}
        <View>
          <Text style={styles.itemText}>Địa chỉ </Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={(text) => setAddress(text)}
            placeholder="Địa chỉ"
          />
        </View>

        {/* Số điện thoại */}
        <View>
          <Text style={styles.itemText}>Số điện thoại </Text>
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            placeholder="Số điện thoại"
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

        {/* Trình độ */}
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

        {/* Lớp */}
        <View>
          <Text style={styles.itemText}>Lớp học</Text>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => {
              setIsClickClass(!isClickClass);
            }}
          >
            <Text>{selectClass}</Text>
            {isClickClass ? (
              <Ionicons name="chevron-down-outline" size={24} />
            ) : (
              <Ionicons name="chevron-up-outline" size={24} />
            )}
          </TouchableOpacity>
          {isClickClass && (
            <View style={styles.dropdownArea}>
              <FlatList
                data={lopHoc}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => {
                        setSelectClass(item.label);
                        setIsClickClass(false);
                        setClassValue(item.value);
                        handLoadSubject(item.value);
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

        {/* Môn học */}
        {/* <View style={{ zIndex: 20 }}>
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
        </View> */}

        {/* Môn học */}
        <View>
          <Text style={styles.itemText}>Môn học</Text>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => {
              setIsClickSubject(!isClickSubject);
            }}
          >
            <Text>{selectSubject}</Text>
            {isClickSubject ? (
              <Ionicons name="chevron-down-outline" size={24} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  onClose;
                }}
              >
                <Ionicons name="chevron-up-outline" size={24} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          {isClickSubject && (
            <View style={styles.dropdownArea}>
              <FlatList
                data={subject}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={[styles.item, { borderColor: COLORS.main }]}
                      onPress={() => {
                        setSelectSubject(item.name);
                        // console.log(item);
                        setIsClickSubject(false);
                        setSubjectValue(item.id);
                        getTuition(item.pricePerHour);
                        // getTuition(item.name);
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

        {/* Ngày học trong tuần */}
        <View style={{ zIndex: 18 }}>
          <Text style={styles.itemText}>Ngày học trong tuần</Text>
          <DropDownPicker
            style={styles.dropdownSelector}
            items={ngayTrongTuan}
            open={dayOfWeekOpen}
            setOpen={() => setDayOfWeekOpen(!dayOfWeekOpen)}
            value={dayOfWeekValue}
            setValue={(val) => setDayOfWeekValue(val)}
            placeholder="Ngày học trong tuần"
            showTickIcon={true}
            showArrowIcon={true}
            multiple={true}
            min={1}
            max={7}
            mode="BADGE"
            zIndex={20}
            badgeColors={COLORS.secondMain}
            badgeDotColors={["white"]}
            backgroundColor=""
          />
        </View>

        {/* Thời gian dạy */}
        <View>
          <Text style={styles.itemText}>Thời gian dạy</Text>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => {
              setTimeOpen(!timeOpen);
            }}
          >
            <Text>{selectTime}</Text>
            {timeOpen ? (
              <Ionicons name="chevron-down-outline" size={24} />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  onClose;
                }}
              >
                <Ionicons name="chevron-up-outline" size={24} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          {timeOpen && (
            <View style={styles.dropdownArea}>
              <FlatList
                data={time}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={[styles.item, { borderColor: COLORS.main }]}
                      onPress={() => {
                        setSelectTime(item.label);
                        setTimeOpen(false);
                        setTimeValue(item.value);
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

        {/* Số buổi */}
        <View>
          <Text style={styles.itemText}>Số buổi </Text>
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            value={String(slot)}
            onChangeText={(text) => setSlot(text)}
            placeholder="Số buổi"
          />
        </View>

        {/* Chi phí */}
        <View>
          <Text style={styles.itemText}>Chi phí khóa học </Text>
          {isGetTuition && (
            <Text
              style={[
                styles.itemText,
                {
                  color: COLORS.gray,
                  fontSize: SIZES.small,
                  padding: 0,
                  marginHorizontal: 20,
                },
              ]}
            >
              Chi phí gợi ý cho khóa học:
              {formattedAmount(getTuitionValue * slot)}
            </Text>
          )}

          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            value={formattedAmount(price)}
            onChangeText={(text) => setPrice(text)}
            placeholder="Chi phí"
          />
        </View>

        {/* Slot lenght */}
        <View>
          <Text style={styles.itemText}>Thời gian dạy</Text>
          <TouchableOpacity
            style={styles.dropdownSelector}
            onPress={() => {
              setIsSlotLength(!isSlotLength);
            }}
          >
            <Text>{selectSlotLength}</Text>
            {isSlotLength ? (
              <Ionicons name="chevron-down-outline" size={24} />
            ) : (
              <Ionicons name="chevron-up-outline" size={24} />
            )}
          </TouchableOpacity>
          {isSlotLength && (
            <View style={styles.dropdownArea}>
              <FlatList
                data={thoiLuong}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.item}
                      onPress={() => {
                        setSelectSlotLength(item.label);
                        setIsSlotLength(false);
                        setSlotLength(item.value);
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

        {/* Ngày bắt đầu */}
        <View>
          <Text style={styles.itemText}>Ngày bắt đầu</Text>
          {showPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChangeStart}
              style={{ backgroundColor: COLORS.lightWhite }}
              minimumDate={new Date()}
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

        {/* Ngày kết thúc */}
        <View>
          <Text style={styles.itemText}>Ngày kết thúc</Text>
          {showPickerEnd && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChangeEnd}
              style={styles.datePicker}
              minimumDate={new Date(dateStart)}
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
                placeholder="Ngày kết thúc"
                editable={false}
                onPressIn={toggleDatePickerEnd}
              />
            </Pressable>
          )}
        </View>

        {/* Mô tả */}
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

        {loader ? (
          <ActivityIndicator size={500} color={COLORS.main} />
        ) : (
          <TouchableOpacity onPress={handleCreate}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Đăng kí</Text>
            </View>
          </TouchableOpacity>
        )}
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
    paddingTop: 10,
    width: "90%",
    height: 90,
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

  searchInput: {
    width: "90%",
    height: 50,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignItems: "center",
    marginTop: 20,
    paddingLeft: 15,
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
