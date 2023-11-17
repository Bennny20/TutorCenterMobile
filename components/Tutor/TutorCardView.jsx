import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const TutorCartView = ({ item }) => {
  const navigation = useNavigation();
  // const userId = item.user;
  // const [user, setUser] = useState();

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://tutor-center.onrender.com/user/${userId}`
  //       );
  //       setUser(response.data);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   };

  //   fetchUserProfile();
  // }, []);

  // const subjects = item.subject.join(" - ");
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("TutorDetail", { item })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://img.freepik.com/premium-photo/blue-white-sign-with-man-white-shirt-blue-circle-with-man-front-it_745528-3249.jpg?w=2000",
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {item.tutorName}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.major}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {item.gender}
          </Text>
          <Text style={styles.univetsity}>{item.university}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons
            name="ellipsis-horizontal-outline"
            size={35}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default TutorCartView;

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 240,
    marginEnd: 22,
    borderRadius: SIZES.medium,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
  },

  imageContainer: {
    display: "flex",
    flex: 1,
    width: 120,
    height: 120,
    marginTop: SIZES.small / 2,
    borderRadius: "50%",
    overflow: "hidden",
    alignItems: "center",
  },

  image: {
    width: 100,
    borderRadius: 50,
    aspectRatio: 1,
    resizeMode: "cover",
  },

  details: {
    padding: SIZES.small,
    alignItems: "center",
  },

  title: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    marginBottom: 2,
  },

  supplier: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },

  univetsity: {
    fontFamily: "bold",
    fontSize: SIZES.medium,
  },

  addBtn: {
    marginLeft: 30,
    bottom: SIZES.xSmall,
    right: SIZES.xSmall,
  },
});
