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
import { RefreshControl } from "react-native";
import { FlatList } from "react-native";

const ManageRequest = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { profileId, userData } = route.params;
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
      onRefresh();
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

  const [wallet, setWallet] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoader(true);
      try {
        const response = await axios.get(
          `https://tutor-center.onrender.com/wallet/${userData?.user._id}`
        );
        setWallet(response.data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoader(false);
      }
    };

    fetchUserProfile();
  }, []);

  const Item = ({ item }) => (
    <View>
      <View style={styles.requestItem}>
        <View style={styles.requestInfo}>
          <Text style={styles.requestTitle}>
            {(majors = item.major.join(" - "))}
          </Text>
          <Text style={styles.requestSup}>Giới tính: {item.gender} </Text>
          <Text style={styles.requestSup}>Lớp: {item.classNo} </Text>
          <Text style={styles.requestSup}>{item.level} </Text>
          <Text style={styles.requestSup}>{item.address} </Text>
          <Text style={styles.requestSup}>{item.academicAbility} </Text>
        </View>
        <View style={styles.requestStatus}>
          <View
            style={{
              backgroundColor: COLORS.secondMain,
              borderRadius: 20,
              borderWidth: 2,
            }}
          >
            <Text style={styles.requestStatusBtn}>{item.status}</Text>
          </View>
          {item.status === "Đã duyệt" && (
            <TouchableOpacity
              onPressIn={() =>
                navigation.navigate("TransferMoney", {
                  item,
                  userData,
                  wallet,
                })
              }
            >
              <View
                style={{
                  marginTop: 10,
                  backgroundColor: COLORS.main,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: COLORS.white,
                }}
              >
                <Text
                  style={[styles.requestStatusBtn, { color: COLORS.white }]}
                >
                  Thanh toán
                </Text>
              </View>
            </TouchableOpacity>
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
          data={data}
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
    width: "95%",
    padding: 8,

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
