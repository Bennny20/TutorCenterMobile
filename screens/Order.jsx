import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { COLORS, HOST_API, SIZES } from "../constants";
import Heading from "../components/Heading";

const Order = () => {
  const [refreshing, setRefreshing] = useState(false);

  const formattedAmount = (number) => {
    return Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  };

  const onRefresh = React.useCallback(() => {
    fetchUserProfile();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  }, []);

  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const fetchOrder = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    setLoader(true);
    try {
      const response = await axios.get(HOST_API.local + `/api/user/order`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  console.log(data.data);

  const majors = ({ item }) => {
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
      // onPress={() => navigation.navigate("ClassDetail", { item })}
      >
        <View style={styles.requestInfo}>
          {/* <Text style={styles.requestTitle}>{majors(item).major}</Text> */}
          <Text style={styles.requestSup}>Phụ huynh: {item.parentName} </Text>
          <Text style={styles.requestSup}>Gia sư: {item.nameTutor} </Text>
          <Text style={styles.requestSup}>Ngày: {item.time} </Text>
          <Text style={styles.requestSup}>{item.address} </Text>
          <Text style={styles.requestSup}>{item.districtName} </Text>
          {/* <Text style={styles.requestSup}>{majors(item).major}</Text> */}
        </View>
      </TouchableOpacity>
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
          <Text style={styles.requestStatusBtn}>
            {formattedAmount(item.amount)}
          </Text>
        </View>
        {item.type == 1 ? (
          <View
            style={{
              marginTop: 20,
              backgroundColor: COLORS.lightWhite,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: COLORS.main,
            }}
          >
            <Text style={styles.requestStatusBtn}>Chuyển tiền </Text>
          </View>
        ) : (
          <View
            style={{
              marginTop: 20,
              backgroundColor: COLORS.lightWhite,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: COLORS.main,
            }}
          >
            <Text style={styles.requestStatusBtn}>Nhận tiền</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView>
      <Heading title={"Danh sách thanh toán "} />
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

export default Order;

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
    color: COLORS.black,
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
