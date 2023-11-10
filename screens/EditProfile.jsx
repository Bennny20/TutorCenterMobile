import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Button,
  Platform,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Heading from "../components/Heading";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { userDefault } from "../assets/images/userDefault.png";
import { COLORS } from "../constants";

import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(8, "Provide your full name").required("Required"),
  phoneNumber: Yup.string()
    .min(10, "Your phone number must be 10 number")
    .max(10, "Your phone number must be 10 number")
    .required("Required"),
});

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const [isImage, setIsImage] = useState(false);

  // useEffect(async () => {
  //   if (Platform.OS !== "wed") {
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== "granted") {
  //       alert("Permisson denird!");
  //     }
  //   }
  // }, []);

  const pickerImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setIsImage(true);
      setImage(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView>
      <Heading title={"Chỉnh sửa thông tin "} />
      <View style={styles.avatar}>
        {isImage === false ? (
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/images/userDefault.png")}
              style={styles.profileImg}
            />
            <TouchableOpacity
              onPress={() => pickerImage()}
              style={{
                marginTop: 20,
                height: 50,
                width: "60%",
                backgroundColor: "skyblue",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>Avatar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            {image && (
              <Image source={{ uri: image }} style={styles.profileImg} />
            )}
            <TouchableOpacity
              onPress={() => pickerImage()}
              style={{
                marginTop: 20,
                height: 50,
                width: "60%",
                backgroundColor: "skyblue",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Text style={{ fontSize: 20 }}>Avatar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.info}></View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  profileImg: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: -20,
  },

  avatar: {
    marginTop: 40,
    justifyContent: "center",
  },
});
