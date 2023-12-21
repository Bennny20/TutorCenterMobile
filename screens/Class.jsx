import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ClassItem from "../components/Class/ClassItem";
import axios from "axios";
import useFetch from "../hook/Class/useFetch";
import { ActivityIndicator } from "react-native";

const Class = () => {
  const navigation = useNavigation();

  const { data, isLoading, error } = useFetch();
  const [refreshing, setRefreshing] = useState(false);
  // const onRefresh = React.useCallback(() => {
  //   useFetch();
  //   setRefreshing(true);
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);
  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.upperRow}>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back-circle"
                  size={35}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.heading}>Danh sách lớp</Text>
            </View>
          </View>
          <View style={styles.btnSreacrh}>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <Feather name="search" size={35} color={COLORS.lightWhite} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginHorizontal: 5, marginBottom: 40 }}>
        {isLoading ? (
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primarys} />
        ) : error ? (
          <Text>Something went wrong </Text>
        ) : (
          <FlatList
            style={{ marginBottom: 70 }}
            data={data.data}
            renderItem={({ item }) => <ClassItem item={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Class;

const styles = StyleSheet.create({
  btnSreacrh: {
    marginHorizontal: 10,
    marginVertical: 2,
  },
  container: {
    paddingVertical: 5,
    marginHorizontal: 10,
    backgroundColor: COLORS.main,
    borderRadius: SIZES.large,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heading: {
    justifyContent: "center",
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },

  upperRow: {
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  wrapper: {
    marginBottom: 10,
    backgroundColor: COLORS.lightWhite,
  },
});
