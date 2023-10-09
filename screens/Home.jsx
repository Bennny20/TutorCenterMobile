import { TouchableOpacity, Text, View, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Home.style";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import TutorRow from "../components/Tutor/TutorRow";
import ClassRow from "../components/Class/ClassRow";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="help-circle-outline" size={24} />
          <Text style={styles.location}>TUTOR CENTER</Text>

          <TouchableOpacity
            onPressIn={() => navigation.navigate("NotificationPage")}
          >
            <View style={{ alignItems: "flex-end" }}>
              <View style={styles.cartCount}>
                <Text style={styles.cartNumber}>8</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="notifications-circle" size={35} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <Carousel />
        <Welcome />
        <TutorRow />
        <ClassRow />
        <View>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
          <Text> </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
