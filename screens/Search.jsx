import { TouchableOpacity, TextInput, View, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Search.style";
import { Ionicons, Feather } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { FlatList } from "react-native-gesture-handler";

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearcResult] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(``);
      // console.log("====================");
      // console.log(response.data);
      // console.log("====================");
      setSearcResult(response.data);
    } catch (error) {
      // console.log("Failed to get products", error);
    }
  };
  // console.log(searchKey);
  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons name="camera-outline" size={24} style={styles.searchIcon} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={setSearchKey}
            placeholder="What are you looking for "
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => handleSearch()}
          >
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      {searchResult.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            {
            }
          }}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
