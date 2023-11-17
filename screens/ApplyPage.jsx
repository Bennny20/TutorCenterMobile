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

  return (
    <SafeAreaView>
      <Heading title={"Danh sách gia sư apply "} />
      <View></View>
      {loader ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primarys} />
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          style={{ marginTop: 40, marginHorizontal: 10, marginBottom: 100 }}
          data={data.data}
          renderItem={({ item }) => <TutorItemApply item={item} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default ApplyPage;

const styles = StyleSheet.create({});
