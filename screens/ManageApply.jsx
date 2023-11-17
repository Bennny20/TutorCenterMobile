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
import { COLORS, HOST_API, SIZES } from "../constants";
import { useState } from "react";
import axios from "axios";

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
      setLoader(true);
      try {
        const response = await axios.get(
          HOST_API.local + `/api/request/parent/${profileId}`
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{ marginTop: 40, marginBottom: 40 }}
      >
        <View>
          {data.map((item) => (
            <View style={styles.requestItem}>
              <View style={styles.requestInfo}>
                <Text style={styles.requestTitle}>
                  {item.class.major.join(", ")}
                </Text>
                <Text style={styles.requestSup}>{item.class.level} </Text>
                <Text style={styles.requestSup}>Lớp: {item.class.classNo}</Text>
                <Text style={styles.requestSup}>{item.class.address} </Text>
                <Text style={styles.requestSup}>{item.class.price} </Text>
              </View>
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
                    {item.status}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
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
    width: "40%",
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
