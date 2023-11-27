import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { SIZES, SHADOWS, COLORS, HOST_API } from "../../constants";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TutorItemApply = ({ item, classID }) => {
  const navigation = useNavigation();
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    checkExitingUser();
  }, []);

  const checkExitingUser = async () => {
    const token = await AsyncStorage.getItem("token");
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
        setUser(currentUser.data.data);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };
  console.log(user);

  const handleChoose = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(
      HOST_API.local + `/api/tutorApply/acceptTutor/${item.id}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    const result = await response.json();
    console.log(result.responseCode);
    if (result.responseCode == "00") {
      Alert.alert("Chọn gia sư thành công", "Quản lý lớp", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {
            navigation.navigate("ManageClass");
          },
        },
        { defaultIndex: 1 },
      ]);
    } else {
      Alert.alert("Chọn gia sư khoong thành công", "Quản lý lớp", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {
            {
            }
          },
        },
        { defaultIndex: 1 },
      ]);
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <TouchableOpacity style={styles.container}>
        <View style={styles.image}>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-photo/blue-white-sign-with-man-white-shirt-blue-circle-with-man-front-it_745528-3249.jpg?w=2000",
            }}
            style={styles.productImg}
          />
        </View>
        <View style={styles.textContent}>
          <Text style={styles.name}>{item.tutorName}</Text>
          {/* <Text style={styles.supplier}>{item.major}</Text> */}
          <Text style={styles.supplier}>{item.tutorUniversity}</Text>
          <Text style={styles.supplier}>{item.tutorUniversity}</Text>
          <Text style={styles.supplier}>{item.tutorAddress}</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "35%",
        }}
      >
        {item.status == 1 ? (
          <View style={styles.btnStatus}>
            <Text style={styles.txtStatus}>Đã chọn gia sư</Text>
          </View>
        ) : (
          item.status == 0 && (
            // <TouchableOpacity style={styles.btnStatus} onPress={handleChoose}>
            //   <Text style={styles.txtStatus}>Chọn gia sư</Text>
            // </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnStatus}
              onPress={() =>
                navigation.navigate("TransferMoney", { item, user, classID })
              }
            >
              <Text style={styles.txtStatus}>Chọn gia sư</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

export default TutorItemApply;

const styles = StyleSheet.create({
  txtStatus: {
    padding: 5,
    fontSize: SIZES.small,
    fontFamily: "regular",
    color: COLORS.primary,
  },
  btnStatus: {
    width: "80%",
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.secondMain,
    alignItems: "center",
  },
  supplier: {
    fontSize: SIZES.small,
    fontFamily: "bold",
    color: COLORS.gray,
    marginTop: 3,
  },

  name: {
    fontSize: SIZES.small + 1,
    fontFamily: "bold",
    color: COLORS.primary,
  },

  textContent: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productImg: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
  image: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
  },
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.main,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.small,
    flexDirection: "row",
    padding: SIZES.small - 5,
    borderRadius: SIZES.small,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: COLORS.lightWhite,
  },
});
