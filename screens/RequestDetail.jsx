import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import Heading from "../components/Heading";

const RequestDetail = () => {
  const route = useRoute();
  const { item } = route.params;
  console.log(item);
  return (
    <SafeAreaView>
      <Heading title={"Yêu cầu chi tiết "} />
      <Text style={{ marginTop: 10 }}>RequestDetail</Text>
    </SafeAreaView>
  );
};

export default RequestDetail;

const styles = StyleSheet.create({});
