import {
  FlatList,
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
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ManageClassTutor = () => {
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    fetchUserProfile();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  }, []);

  const route = useRoute();
  const { user } = route.params;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const fetchClass = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    setLoader(true);
    try {
      const response = await axios.get(HOST_API.local + `/api/clazz/tutor`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(response.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchClass();
  }, []);
  const majors = (item) => {
    var major = "";
    var classNo = "";
    for (let index = 0; index < item.subjects.length; index++) {
      major += item.subjects[index].name + ", ";
      if (index == item.subjects.length - 1) {
        major += item.subjects[index].name;
      }
      classNo = item.subjects[index].level;
    }

    return { major, classNo };
  };

  const Item = ({ item }) => (
    <View style={styles.requestItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ClassDetailForTutor", { item })}
        style={{ width: "65%" }}
      >
        <View style={styles.requestInfo}>
          <Text style={styles.requestTitle}>{majors(item).major}</Text>
          <Text style={styles.requestSup}>{item.tutorLevel} </Text>
          <Text style={styles.requestSup}>{majors(item).classNo}</Text>
          <Text style={styles.requestSup}>{item.address} </Text>
        </View>
      </TouchableOpacity>
      {item.status == 1 ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("AttendancePage", { item, user })}
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
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate("AttendancePage", { item, user })}
          style={styles.requestStatus}
        >
          <View
            style={{
              backgroundColor: COLORS.main,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: COLORS.main,
            }}
          >
            <Text
              style={[styles.requestStatusBtn, { color: COLORS.lightWhite }]}
            >
              Hoàn thành
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
  return (
    <SafeAreaView>
      <Heading title={"Danh sách lớp "} />

      {loader ? (
        <ActivityIndicator size={500} color={COLORS.main} />
      ) : (
        <View>
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{ marginTop: 40, marginBottom: 40 }}
            data={data.data}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ManageClassTutor;

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
