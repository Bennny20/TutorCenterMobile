import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Heading from "../components/Heading";
import { COLORS, SIZES } from "../constants";
import { useState } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native";

const ManageClass = () => {
  const navigation = useNavigation();
  const classes = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13];
  const route = useRoute();
  const { profileId } = route.params;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          `https://tutor-center.onrender.com/class/parent/${profileId}`
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
  // console.log(data);

  return (
    <SafeAreaView>
      <Heading title={"Danh sách lớp "} />
      <ScrollView style={{ marginTop: 40, marginBottom: 40 }}>
        {loader ? (
          <ActivityIndicator size={500} color={COLORS.main} />
        ) : (
          <View>
            {data.map((item) => (
              <View style={styles.requestItem}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ClassDetail", { item })}
                >
                  <View style={styles.requestInfo}>
                    <Text style={styles.requestTitle}>
                      {item.request.major.join(", ")}
                    </Text>
                    <Text style={styles.requestSup}>{item.request.level} </Text>
                    <Text style={styles.requestSup}>
                      Lớp: {item.request.classNo}
                    </Text>
                    <Text style={styles.requestSup}>
                      {item.request.address}{" "}
                    </Text>
                  </View>
                </TouchableOpacity>
                {item.status === "CHƯA CÓ GIÁO VIÊN" ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ClassDetail", { item })}
                    style={styles.requestStatus}
                  >
                    <View
                      style={{
                        backgroundColor: COLORS.lightWhite,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: COLORS.main,
                      }}
                    >
                      <Text style={styles.requestStatusBtn}>Chọn gia sư</Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("AttendancePage", { item })
                    }
                    style={styles.requestStatus}
                  >
                    <View
                      style={{
                        backgroundColor: COLORS.lightWhite,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: COLORS.main,
                      }}
                    >
                      <Text style={styles.requestStatusBtn}>Điểm danh</Text>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageClass;

const styles = StyleSheet.create({
  requestStatusBtn: {
    padding: 8,

    fontFamily: "bold",
    fontSize: SIZES.small,
    color: COLORS.gray,
  },

  requestStatus: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
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
    color: COLORS.black,
  },

  requestInfo: {},

  requestItem: {
    borderWidth: 2,
    borderColor: COLORS.black,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.secondMain,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 15,
  },
});
