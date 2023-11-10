import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Heading from "../components/Heading";
import ClassItem from "../components/Class/ClassItem";
import { COLORS, SIZES } from "../constants";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native";

const ManageRequest = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { profileId } = route.params;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          `https://tutor-center.onrender.com/parent/request/${profileId}`
        );
        setData(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoader(false);
      }
    };

    fetchUserProfile();
  }, []);
  var majors = "";
  // console.log(data);
  return (
    <SafeAreaView>
      <Heading title={"Danh sách yêu cầu tạo lớp "} />
      <ScrollView style={{ marginTop: 40, marginBottom: 40 }}>
        <View>
          {loader ? (
            <ActivityIndicator size={500} color={COLORS.main} />
          ) : (
            data.map((item) => (
              <View style={styles.requestItem}>
                <View style={styles.requestInfo}>
                  <Text style={styles.requestTitle}>
                    {(majors = item.major.join(" - "))}
                  </Text>
                  <Text style={styles.requestSup}>
                    Giới tính: {item.gender}{" "}
                  </Text>
                  <Text style={styles.requestSup}>Lớp: {item.classNo} </Text>
                  <Text style={styles.requestSup}>{item.level} </Text>
                  <Text style={styles.requestSup}>{item.address} </Text>
                  <Text style={styles.requestSup}>{item.academicAbility} </Text>
                </View>
                <View style={styles.requestStatus}>
                  <View>
                    <Text style={styles.requestStatusBtn}>{item.status}</Text>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageRequest;

const styles = StyleSheet.create({
  requestStatusBtn: {
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    fontFamily: "bold",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },

  requestStatus: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
    // paddingLeft: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.main,
  },

  requestSup: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },

  requestTitle: {
    fontFamily: "bold",
    fontSize: SIZES.medium + 3,
    color: COLORS.main,
  },

  requestInfo: {
    width: "65%",
    paddingLeft: 15,
  },

  requestItem: {
    borderWidth: 2,
    borderColor: COLORS.main,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightWhite,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 5,
  },
});
