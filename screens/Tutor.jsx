import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TutorItem from "../components/Tutor/TutorItem";
import useFetch from "../hook/Tutor/useFetch";

const Tutor = () => {
  const navigation = useNavigation();
  const { data, isLoading, error } = useFetch();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 5000);
  }, []);
  return (
    <View styles={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={40}
              color={COLORS.lightWhite}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Danh sách gia sư</Text>
        </View>
      </View>
      <View style={{ marginTop: 80, marginHorizontal: 15, marginBottom: 60 }}>
        <View>
          {isLoading ? (
            <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primarys} />
          ) : error ? (
            <Text>Something went wrong </Text>
          ) : (
            <FlatList
              refreshing={refreshing}
              onRefresh={onRefresh}
              style={{ marginBottom: 40 }}
              data={data.data}
              renderItem={({ item }) => <TutorItem item={item} />}
              keyExtractor={(item) => item.id}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Tutor;

const styles = StyleSheet.create({
  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.lightWhite,
    marginLeft: 5,
  },

  upperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 999,
  },

  wrapper: {
    marginTop: 30,
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
});
