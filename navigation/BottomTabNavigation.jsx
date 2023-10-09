import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Home, Search, Profile, CreateRequestPage } from "../screens";
import { COLORS } from "../constants/index";
import Search2 from "../screens/Search2";

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
        component={Search2}
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

      <Tab.Screen
        name="Blog"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name={"chatbox-ellipses-outline"}
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
