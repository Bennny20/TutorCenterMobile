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
import { COLORS, HOST_API, SIZES } from "../constants";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { RefreshControl } from "react-native";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageRequest = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, userData } = route.params;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = await AsyncStorage.getItem("token");

      setLoader(true);
      try {
        const response = await axios.get(
          HOST_API.local + `/api/request/parent/${user}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
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

  const majors = ({ item }) => {
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
    return { major, classNo };
  };

  const Item = ({ item }) => (
    <View>
      <View style={styles.requestItem}>
        <View style={styles.requestInfo}>
          <TouchableOpacity
            onPressIn={() => navigation.navigate("RequestDetail", { item })}
          >
            <Text style={styles.requestTitle}>{majors({ item }).major}</Text>
            <Text style={styles.requestSup}>Giới tính: {item.gender} </Text>
            <Text style={styles.requestSup}>{majors({ item }).classNo} </Text>
            <Text style={styles.requestSup}>{item.address} </Text>
            <Text style={styles.requestSup}>{item.tutorLevel}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.requestStatus}>
          {item.status === 0 && (
            <View
              style={{
                backgroundColor: COLORS.gray2,
                borderRadius: 20,
                borderWidth: 2,
                width: "80%",
                alignItems: "center",
              }}
            >
              <Text style={[styles.requestStatusBtn, { color: COLORS.black }]}>
                Chưa duyệt
              </Text>
            </View>
          )}
          {item.status === 1 && (
            <View
              style={{
                backgroundColor: COLORS.secondMain,
                borderRadius: 20,
                borderWidth: 2,
                width: "80%",
                alignItems: "center",
              }}
            >
              <Text style={styles.requestStatusBtn}>Đã duyệt</Text>
            </View>
          )}

          {item.status === 2 && (
            <View
              style={{
                backgroundColor: COLORS.red,
                borderRadius: 20,
                borderWidth: 2,
                width: "80%",
                alignItems: "center",
              }}
            >
              <Text style={styles.requestStatusBtn}>Chưa đạt</Text>
            </View>
          )}

          {item.status === 3 && (
            <View
              style={{
                backgroundColor: COLORS.red,
                borderRadius: 20,
                borderWidth: 2,
                width: "80%",
                alignItems: "center",
              }}
            >
              <Text style={styles.requestStatusBtn}>Đã hủy</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <Heading title={"Danh sách yêu cầu tạo lớp "} />
      {loader ? (
        <ActivityIndicator size={500} color={COLORS.main} />
      ) : (
        <FlatList
          refreshing={loader}
          style={{ marginTop: 40, marginBottom: 40 }}
          data={data.data}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default ManageRequest;

const styles = StyleSheet.create({
  requestStatusBtn: {
    padding: 8,
    justifyContent: "center",
    fontFamily: "bold",
    fontSize: SIZES.small,
    color: COLORS.black,
  },

  requestStatus: {
    width: "35%",
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
