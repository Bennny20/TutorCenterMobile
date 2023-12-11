import { View, Text } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Home,
  Search,
  Profile,
  CreateRequestPage,
  BlogPage,
  SearchForTutor,
} from "../screens";
import { COLORS, HOST_API } from "../constants/index";
import Search2 from "../screens/Search";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
  },
};

const BottomTabNavigation = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    checkExitingUser();
  }, []);

  const checkExitingUser = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token != null) {
      setLoader(true);
      try {
        const currentUser = await axios.get(
          HOST_API.local + `/api/user/authProfile`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (currentUser !== null) {
          setUserLogin(true);
          setUserData(currentUser.data.data);
          if (currentUser.data.data.role === "TUTOR") {
            console.log("TUTOR");
          }
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoader(false);
      }
    }
  };
  console.log(userData);
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={"search-sharp"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />

      {userLogin == true && userData?.role === "TUTOR" ? (
        <Tab.Screen
          name="SearchForTutor"
          component={SearchForTutor}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    position: "absolute",
                    bottom: -10, // space from bottombar
                    height: 60,
                    width: 70,
                    borderRadius: 58,
                    backgroundColor: COLORS.main,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name={"text-search"}
                    size={30}
                    color={focused ? COLORS.white : COLORS.lightWhite}
                  />
                </View>
              );
            },
          }}
        />
      ) : (
        <Tab.Screen
          name="Create"
          component={CreateRequestPage}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    position: "absolute",
                    bottom: -10, // space from bottombar
                    height: 60,
                    width: 70,
                    borderRadius: 58,
                    backgroundColor: COLORS.main,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Ionicons
                    name={"add-circle-outline"}
                    size={30}
                    color={focused ? COLORS.white : COLORS.lightWhite}
                  />
                </View>
              );
            },
          }}
        />
      )}

      <Tab.Screen
        name="Blog"
        component={BlogPage}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name={"newspaper-variant-multiple"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? COLORS.primary : COLORS.gray2}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
