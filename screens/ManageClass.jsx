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
import { COLORS, SIZES } from "../constants";
import { useState } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { RefreshControl } from "react-native";

const ManageClass = () => {
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
  const { profileId } = route.params;
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

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
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const Item = ({ item }) => (
    <View style={styles.requestItem}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ClassDetail", { item })}
      >
        <View style={styles.requestInfo}>
          <Text style={styles.requestTitle}>
            {item.request.major.join(", ")}
          </Text>
          <Text style={styles.requestSup}>{item.request.level} </Text>
          <Text style={styles.requestSup}>Lớp: {item.request.classNo}</Text>
          <Text style={styles.requestSup}>{item.request.address} </Text>
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
          onPress={() => navigation.navigate("AttendancePage", { item })}
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
            data={data}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      )}
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
