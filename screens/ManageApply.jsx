import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
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
import { COLORS, HOST_API, SIZES } from "../constants";
import { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageClass = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const route = useRoute();
  const { profileId } = route.params;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = await AsyncStorage.getItem("token");
      setLoader(true);
      try {
        const response = await axios.get(
          HOST_API.local + `/api/tutorApply/tutor`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoader(false);
      }
    };

    fetchUserProfile();
  }, []);
  console.log(data);

  const majors = ({ item }) => {
    var major = "";
    var classNo = "";
    for (let index = 0; index < item.subjects.length; index++) {
      if (index == item.subjects.length - 1) {
        major += item.subjects[index].subjectName;
      } else {
        major += item.subjects[index].subjectName + ", ";
      }
      classNo = item.subjects[index].level;
    }
    return { major, classNo };
  };

  const format = (item) => {
    return (formattedAmount = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(item));
  };

  const Item = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.requestInfo}>
        <Text style={styles.requestTitle}>{majors({ item }).major}</Text>
        <Text style={styles.requestSup}>{item.tutorLevel} </Text>
        <Text style={styles.requestSup}>{majors({ item }).classNo}</Text>
        <Text style={styles.requestSup}>
          {item.address}, {item.districtName}
        </Text>
        <Text style={styles.requestSup}>{format(item.tuition)} </Text>
      </View>
      {item.status == 1 && (
        <TouchableOpacity
          onPress={() => navigation.navigate("AttendancePage")}
          style={styles.requestStatus}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: COLORS.lightWhite,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: COLORS.main,
              alignItems: "center",
            }}
          >
            <Text
              style={styles.requestStatusBtn}
              onPress={() => navigation.navigate("AttendancePage")}
            >
              Đợi xác nhận
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {item.status == 2 && (
        <TouchableOpacity
          onPress={() => navigation.navigate("AttendancePage")}
          style={styles.requestStatus}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: COLORS.lightWhite,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: COLORS.main,
              alignItems: "center",
            }}
          >
            <Text
              style={styles.requestStatusBtn}
              onPress={() => navigation.navigate("AttendancePage")}
            >
              Đã xác nhận
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView>
      <Heading title={"Danh sách đăng kí "} />

      {loader ? (
        <ActivityIndicator size={500} color={COLORS.main} />
      ) : (
        <View>
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{ marginTop: 40, marginBottom: 40 }}
            data={data}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
      {/* <View>
          {data.map((item) => (
           
          ))}
        </View> */}
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
    width: "35%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 5,
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

  requestItem: {
    borderWidth: 2,
    borderColor: COLORS.black,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.secondMain,
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 20,
    padding: 15,
  },
});
