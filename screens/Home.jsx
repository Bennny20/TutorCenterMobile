import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Home.style";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import TutorRow from "../components/Tutor/TutorRow";
import ClassRow from "../components/Class/ClassRow";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const navigation = useNavigation();
  // const [userData, setUserData] = useState(null);
  // const [userLogin, setUserLogin] = useState(false);
  // useEffect(() => {
  //   // console.log(userData.data.user?.name);
  //   checkExitingUser();
  // });

  // const checkExitingUser = async () => {
  //   const id = await AsyncStorage.getItem("id");
  //   const userId = `user${JSON.parse(id)}`;

  //   try {
  //     const currentUser = await AsyncStorage.getItem(userId);
  //     if (currentUser !== null) {
  //       const parsedData = JSON.parse(currentUser);
  //       setUserData(parsedData);
  //     }
  //   } catch (error) {
  //     console.log("Error retrieving the data: ", error);
  //   }
  // };
  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="help-circle-outline" size={24} />
          <Text style={styles.location}>
            {/* {userData ? userData.data.user?.name : "TUTOR CENTER"} */}
            TUTOR CENTER
          </Text>

          <TouchableOpacity
            onPressIn={() => navigation.navigate("NotificationPage")}
          >
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.cartCount}>
                <Text style={styles.cartNumber}>8</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="notifications-circle" size={35} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <Carousel />
        <Welcome />
        <TutorRow />
        <ClassRow />
        <View>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
