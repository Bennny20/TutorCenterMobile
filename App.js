import { useFonts } from "expo-font";
import { useCallback } from "react";
import * as SlashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigation from "./navigation/BottomTabNavigation";
import {
  AttendancePage,
  BlogDetail,
  Class,
  ClassDetail,
  EditProfile,
  Login,
  ManageClass,
  ManageRequest,
  NotificationPage,
  Register,
  RegisterTutor,
  Tutor,
  TutorDetail,
  Wallet,
  ManageApply,
  DepositAndWithdrawMoney,
  TransferMoney,
  FeedbackClass,
  ApplyPage,
  Transaction,
  History,
  ManageClassTutor,
  Order,
} from "./screens";
import { useEffect } from "react";
import { LogBox } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs([
      "VirtualizedLists should never be nested",
      `Each child in a list should have a unique "key" prop`,
      `Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead`,
      "Failed prop type: Invalid prop `value` of type `number` supplied to `TextInput`, expected `string`",
    ]);
  }, []);

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
          component={Login}
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
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterTutor"
          component={RegisterTutor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BlogDetail"
          component={BlogDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageApply"
          component={ManageApply}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TransferMoney"
          component={TransferMoney}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DepositAndWithdrawMoney"
          component={DepositAndWithdrawMoney}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="FeedbackClass"
          component={FeedbackClass}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ApplyPage"
          component={ApplyPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Transaction"
          component={Transaction}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManageClassTutor"
          component={ManageClassTutor}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Order"
          component={Order}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
