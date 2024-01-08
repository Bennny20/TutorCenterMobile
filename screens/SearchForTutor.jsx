import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS, HOST_API, SIZES } from "../constants";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import useFetch from "../hook/Class/useFetch";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ClassItem from "../components/Class/ClassItem";
import ClassItemForTutor from "../components/Class/ClassItemForTutor";
import axios from "axios";

const SearchForTutor = () => {
  const navigation = useNavigation();
  const [classList, setClassList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(HOST_API.local + `/api/clazz/recommended`);
      setClassList(res.data.data);
      setFilterData(res.data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    useFetch();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const search = () => {
    setIsLoading(true);
    if (searchValue) {
      const newData = classList.filter((item) => {
        const itemData = item.provinceName
          ? item.provinceName.toUpperCase()
          : "".toUpperCase();
        const textData = searchValue.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
    } else {
      setFilterData(classList);
    }
    setIsLoading(false);
  };
  return (
    <View style={{ padding: 16, marginTop: 10, marginBottom: 100 }}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            onChangeText={(text) => setSearchValue(text)}
            value={searchValue}
            placeholder="Nhập tỉnh thành muốn dạy"
            keyboardType="default"
          />
        </View>
        <View>
          <TouchableOpacity onPress={search} style={styles.searchBtn}>
            <Ionicons
              name="search"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
            />
          </TouchableOpacity>
        </View>
      </View>
      <GestureHandlerRootView style={{ flex: 0 }}>
        <View style={{ marginHorizontal: 5, marginBottom: 40 }}>
          {isLoading ? (
            <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primarys} />
          ) : error ? (
            <Text>Something went wrong </Text>
          ) : (
            <FlatList
              refreshing={refreshing}
              onRefresh={onRefresh}
              style={{ marginBottom: 70 }}
              data={filterData}
              renderItem={({ item }) => <ClassItemForTutor item={item} />}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </GestureHandlerRootView>
    </View>
  );
};

export default SearchForTutor;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.medium,
    height: 50,
  },

  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },
  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
});
