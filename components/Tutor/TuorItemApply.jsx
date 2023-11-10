import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { SIZES, SHADOWS, COLORS } from "../../constants";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TutorItemApply = ({ item, profile, classInfo }) => {
  const navigation = useNavigation();

  const profileId = classInfo.parent;
  const handleChoose = () => {
    const tutor = {
      id: item.idTutor,
      name: item.nameTutor,
    };

    axios
      .put(`https://tutor-center.onrender.com/class/${classInfo._id}`, tutor)
      .then((response) => {
        console.log(response.data);
        Alert.alert("Chọn gia sư thành công", "Quản lý lớp", [
          {
            text: "Cancel",
            onPress: () => navigation.navigate("ManageClass", { profileId }),
          },
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("ManageClass", { profileId });
            },
          },
          { defaultIndex: 1 },
        ]);
      })
      .catch((error) => {
        Alert.alert("Chọn gia sư thành công", "Quản lý lớp", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {
              navigation.navigate("ManageClass", { profileId });
            },
          },
          { defaultIndex: 1 },
        ]);
        console.log("Create failed", error);
      });
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
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
          <Text style={styles.name}>{item.nameTutor}</Text>
          {/* <Text style={styles.supplier}>{item.major}</Text> */}
          <Text style={styles.supplier}>{item.university}</Text>
          <Text style={styles.supplier}>{item.subject}</Text>
          <Text style={styles.supplier}>{item.address}</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "30%",
        }}
      >
        {classInfo.parent == profile?.user.profile.id ? (
          <TouchableOpacity style={styles.btnStatus} onPress={handleChoose}>
            <Text style={styles.txtStatus}>Chọn gia sư</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.btnStatus}>
            <Text style={styles.txtStatus}>
              Đợi xác nhận
              {/* {idParent} */}
            </Text>
          </TouchableOpacity>
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
    marginRight: 6,
    alignItems: "center",
  },
  supplier: {
    fontSize: SIZES.small,
    fontFamily: "bold",
    color: COLORS.gray,
    marginTop: 3,
  },

  name: {
    fontSize: SIZES.medium,
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
