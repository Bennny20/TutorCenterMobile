import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SlashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import {
  AttendancePage,
  Class,
  ClassDetail,
  LoginPage,
  ManageClass,
  ManageRequest,
  Notification,
  NotificationPage,
  Tutor,
  TutorDetail,
  Wallet,
} from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoad] = useFonts({
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoad) {
      await SlashScreen.hideAsync();
    }
  }, [fontsLoad]);

  if (!fontsLoad) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Bottom Navigation"
          component={BottomTabNavigation}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TutorDetail"
          component={TutorDetail}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="NotificationPage"
          component={NotificationPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TutorList"
          component={Tutor}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ClassList"
          component={Class}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ClassDetail"
          component={ClassDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Wallet"
          component={Wallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageClass"
          component={ManageClass}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageRequest"
          component={ManageRequest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AttendancePage"
          component={AttendancePage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
