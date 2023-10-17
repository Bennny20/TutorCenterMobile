import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Heading from "../components/Heading";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

const EditProfile = () => {
  // const imagePicker = () => {
  //   alert("hello");
  // };

  const imagePicker = () => {
    let options = {
      storageOptions: {
        path: "image",
      },
    };
    launchImageLibrary(options, (response) => {
      console.log(response);
    });
  };
  return (
    <SafeAreaView>
      <Heading title={"Chỉnh sửa thông tin "} />
      <View style={{ height: 400, width: "100%" }}></View>

      <TouchableOpacity
        onPress={() => imagePicker()}
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
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
