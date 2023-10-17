import { Text, View, TouchableOpacity, TextInput, Button } from "react-native";
import React, { useState } from "react";
import styles from "./welcome.style";
import { COLORS, SIZES } from "../../constants";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Welcome = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <Text
          style={styles.welcomeText(COLORS.black, SIZES.xSmall, SIZES.xLarge)}
        >
          Find the best
        </Text>
        <Text
          style={styles.welcomeText(COLORS.main, SIZES.xSmall, SIZES.xLarge)}
        >
          for your children
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            editable={false}
            style={styles.searchInput}
            onPressIn={() => navigation.navigate("Search")}
            placeholder="What are you looking for "
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons
              name="search"
              size={SIZES.xLarge}
              color={COLORS.offwhite}
              onPressIn={() => navigation.navigate("Search")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Welcome;
