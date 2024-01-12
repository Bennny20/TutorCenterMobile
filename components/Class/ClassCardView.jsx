import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, HOST_API, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ClassCardView = ({ item }) => {
  const navigation = useNavigation();
  const [error, setError] = useState();

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

  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.tuition);
  return (
    <View>
      <View>
        {loader ? (
          <ActivityIndicator size={500} color={COLORS.main} />
        ) : (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ClassDetail", {
                item,
                classDetail,
                user,
                userData,
              })
            }
          >
            <View style={styles.container}>
              <View style={styles.heading}>
                <Text style={styles.headingText}>{major}</Text>
              </View>

              <View style={styles.details}>
                <Text style={styles.supplier} numberOfLines={1}>
                  Trình độ: {item.tutorLevel}
                </Text>
                <Text style={styles.supplier} numberOfLines={1}>
                  {classNo}
                </Text>
                <Text style={styles.supplier} numberOfLines={1}>
                  Hôn học: {major}
                </Text>
                <Text style={styles.supplier} numberOfLines={1}>
                  Địa điểm:  {item.districtName}
                </Text>
                <Text style={styles.supplier} numberOfLines={1}>
                  Giới tính: {item.gender}
                </Text>
                <Text style={styles.price}>{formattedAmount} </Text>
              </View>
              <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.detailText}>Xem chi tiết</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ClassCardView;

const styles = StyleSheet.create({
  detailText: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
  },

  container: {
    width: 300,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
  },

  heading: {
    flex: 1,
    width: "100%",
    borderRadius: SIZES.small,
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: COLORS.main,
  },

  headingText: {
    fontFamily: "regular",
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.lightWhite,
  },
  details: {
    padding: SIZES.small,
  },

  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: 2,
  },

  supplier: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },

  price: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },

  addBtn: {
    width: 130,
    backgroundColor: COLORS.main,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
    justifyContent: "center",
  },
});
