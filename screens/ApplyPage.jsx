import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native";
import Heading from "../components/Heading";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { COLORS, HOST_API, SIZES } from "../constants";
import TutorItemApply from "../components/Tutor/TuorItemApply";

const ApplyPage = () => {
  const route = useRoute();
  const { item } = route.params;
  console.log(item);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchListApply = async () => {
    const token = await AsyncStorage.getItem("token");

    setLoader(true);
    try {
      const response = await axios.get(
        HOST_API.local + `/api/tutorApply/clazz/${item.id}`,
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

  useEffect(() => {
    fetchListApply();
  }, []);

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

  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item.tuition);
  return (
    <SafeAreaView>
      <Heading title={"Danh sách gia sư apply "} />
      <View style={styles.headingInfo}>
        <View style={styles.headingName}>
          <Text style={styles.name}>{item.address}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <View style={styles.infoDetail}>
          <Text style={styles.sup}>
            Mon hoc: {major} - {classNo}
          </Text>
          <Text style={styles.sup}>Gioi tinh:{item.gender}</Text>
          <Text style={styles.sup}>
            Dia diem: {item.address}, {item.provinceName}
          </Text>
          {/* <Text style={styles.sup}>Ngay hoc: {item.dateStart}</Text> */}
          {/* <Text style={styles.sup}>Ngay kết thúc: {item.dateEnd}</Text> */}
          <Text style={styles.sup}>Giá tiền: {formattedAmount}</Text>
          <Text style={styles.sup}>Trình độ: {item.tutorLevel}</Text>
          {item.status == 0 && (
            <Text style={styles.sup}>Trạng thái: Chưa có gia sư</Text>
          )}
          {item.status == 1 && (
            <Text style={styles.sup}>Trạng thái: Đã có gia sư</Text>
          )}
          {item.status == 2 && (
            <Text style={styles.sup}>Trạng thái: Hoàn thành</Text>
          )}
        </View>
      </View>

      <View style={{ marginTop: 5 }}>
        <View style={styles.title}>
          <Text style={styles.titleText}> Thong tin gia su</Text>
          <Text style={styles.titleText}>Trang thai</Text>
        </View>
      </View>

      {loader ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primarys} />
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          style={{ marginTop: 10, marginHorizontal: 10, marginBottom: 100 }}
          data={data.data}
          renderItem={({ item }) => <TutorItemApply item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default ApplyPage;

const styles = StyleSheet.create({
  headingInfo: {
    alignItems: "center",
    marginTop: 40,
    zIndex: 999,
  },

  name: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.lightWhite,
  },
  headingName: {
    marginTop: -10,
    width: 300,
    borderColor: COLORS.main,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: "center",
    backgroundColor: COLORS.main,
  },

  info: {
    borderWidth: 2,
    borderColor: COLORS.black,
    borderRadius: 30,
    marginHorizontal: 50,
    marginTop: -10,
    backgroundColor: COLORS.secondMain,
  },
  infoDetail: {
    marginLeft: 15,
    marginTop: 10,
  },
  sup: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginBottom: 10,
  },
  titleText: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.main,
  },
  title: {
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});