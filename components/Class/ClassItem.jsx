import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, HOST_API, SIZES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ClassItem = ({ item }) => {
  const navigation = useNavigation();
  console.log(item);
  const status = item.status;
  var major = "";
  var classNo = "";

  for (let index = 0; index < item.subjects.length; index++) {
    if (index == item.subjects.length - 1) {
      major += item.subjects[index].name;
    } else {
      major += item.subjects[index].name + ", ";
    }
    classNo = item.subjects[index].level;
  }

  const [classDetail, setClassDetail] = useState();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    fetchClassDetail();
    checkExitingUser();
  }, []);

  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const checkExitingUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token !== null) {
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
        console.log("Get user data error", error);
      } finally {
        setLoader(false);
      }
    }
  };

  const fetchClassDetail = async () => {
    setLoader(true);
    try {
      const response = await axios.get(
        HOST_API.local + `/api/clazz/${item.id}`
      );
      setClassDetail(response.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.tuition);
  return (
    <View>
      <View style={styles.card_container}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "5%",
          }}
        >
          <View style={styles.circle} />
        </View>
        {loader ? (
          <ActivityIndicator size={500} color={COLORS.main} />
        ) : (
          <TouchableOpacity
            style={styles.content}
            onPress={() =>
              navigation.navigate("ClassDetail", {
                item,
                classDetail,
                user,
                userData,
              })
            }
          >
            <View style={styles.title}>
              <Text style={styles.titleText}>{major}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.text}>Trình độ: {item.tutorLevel}</Text>
              <Text style={styles.text}> {classNo}</Text>
              {/* <Text style={styles.text}>Địa chỉ: {item.address}</Text> */}
              <Text style={styles.text}>
                {item.districtName}, {item.provinceName}
              </Text>
              <Text style={styles.text}>Giới tính: {item.gender}</Text>
            </View>
            <View style={styles.price}>
              <Text style={styles.priceText}>{formattedAmount}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ClassItem;

const styles = StyleSheet.create({
  priceText: {
    color: COLORS.red,
    fontSize: SIZES.medium,
    fontFamily: "bold",
    marginVertical: 3,
  },
  price: {
    padding: 2,
    alignItems: "center",
    borderTopWidth: 2,
    borderTopColor: COLORS.main,
    borderRadius: 10,
  },
  info: {
    marginHorizontal: 20,
  },
  title: {
    borderRadius: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: COLORS.main,
  },
  titleText: {
    color: COLORS.main,
    fontSize: SIZES.large,
    fontFamily: "bold",
    marginVertical: 3,
  },
  text: {
    fontSize: SIZES.medium,
    fontFamily: "regular",
  },
  card_container: {
    borderColor: COLORS.main,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: 12,
    backgroundColor: COLORS.main,
    borderRadius: 15,
    marginVertical: 10,
    backgroundColorL: "",
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 100,
    backgroundColor: "#fff",
  },
  content: {
    backgroundColor: COLORS.lightWhite,
    width: "90%",
    paddingVertical: 3,
    paddingHorizontal: 7,
  },

  content: {
    backgroundColor: COLORS.lightWhite,
    width: "90%",
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  item_press: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});
