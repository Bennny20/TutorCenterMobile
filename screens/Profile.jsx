import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  AntDesign,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    checkExitingUser();
  }, []);

  const checkExitingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      const currentUser = await AsyncStorage.getItem(userId);
      if (currentUser !== null) {
        const parsedData = JSON.parse(currentUser);
        setUserData(parsedData);
        setUserLogin(true);
      }
    } catch (error) {
      console.log("Error retrieving the data: ", error);
    }
  };
  const userLogout = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;

    try {
      await AsyncStorage.multiRemove([userId, "id"]);
      navigation.replace("Bottom Navigation");
    } catch (error) {
      console.log("Error retrieving the data: ", error);
    }
  };

  const logout = () => {
    Alert.alert("logout", "Are you sure you want to logout", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel pressed"),
      },
      {
        text: "Continue",
        onPress: () => userLogout(),
      },
    ]);
  };
  const profileId = userData?.user.profile.id;
  return (
    <SafeAreaView>
      <View style={styles.heading}>
        <Text style={styles.headingText}> Thong tin ca nhan</Text>
        <View style={{ alignItems: "flex-end", marginRight: 10 }}>
          <View style={styles.cartCount}>
            <Text style={styles.cartNumber}>8</Text>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-circle" size={45} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.profilePage}>
        <View style={styles.profile}>
          <View style={styles.edit}>
            <Text></Text>
            {userLogin === true ? (
              <TouchableOpacity
                onPressIn={() => navigation.navigate("EditProfile")}
              >
                <Ionicons name="create-outline" size={40} color={COLORS.main} />
              </TouchableOpacity>
            ) : (
              <Text style={{ marginBottom: 30 }}></Text>
            )}
          </View>
          <View style={styles.info}>
            <Image
              source={require("../assets/images/profile.jpeg")}
              style={styles.profileImg}
            />
            <Text style={styles.name}>
              {userLogin === true
                ? userData.user?.name
                : "Please login into your account"}
            </Text>
            {userLogin === false ? (
              <TouchableOpacity onPressIn={() => navigation.navigate("Login")}>
                <View style={styles.loginBtn}>
                  <Text style={styles.menuText}>Đăng nhập </Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.loginBtn}>
                <Text style={styles.email}>{userData.user?.email}</Text>
                <Text style={styles.supplier}>{userData.user?.role}</Text>
              </View>
            )}
            {userLogin === false ? (
              <View></View>
            ) : (
              <View style={styles.menuWrapper}>
                <TouchableOpacity
                  onPressIn={() => navigation.navigate("Wallet")}
                >
                  <View style={styles.menuItem(0.5)}>
                    <MaterialCommunityIcons
                      name="wallet-outline"
                      size={30}
                      color={COLORS.main}
                    />
                    <Text style={styles.menuItemText}> Ví của bạn </Text>
                  </View>
                </TouchableOpacity>
                {userData.user.role === "USER_TUTOR" ? (
                  <TouchableOpacity
                    onPressIn={() =>
                      navigation.navigate("ManageApply", { profileId })
                    }
                  >
                    <View style={styles.menuItem(0.5)}>
                      <MaterialCommunityIcons
                        name="frequently-asked-questions"
                        size={30}
                        color={COLORS.main}
                      />
                      <Text style={styles.menuItemText}>
                        Danh sách lớp apply
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPressIn={() =>
                      navigation.navigate("ManageRequest", { profileId })
                    }
                  >
                    <View style={styles.menuItem(0.5)}>
                      <MaterialCommunityIcons
                        name="frequently-asked-questions"
                        size={30}
                        color={COLORS.main}
                      />
                      <Text style={styles.menuItemText}>
                        Quản lý yêu cầu tạo lớp
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPressIn={() =>
                    navigation.navigate("ManageClass", { profileId })
                  }
                >
                  <View style={styles.menuItem(0.5)}>
                    <MaterialCommunityIcons
                      name="clipboard-text-clock"
                      size={30}
                      color={COLORS.main}
                    />
                    <Text style={styles.menuItemText}>
                      Quản lý lớp & Điêm danh
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity>
                  <View style={styles.menuItem(0.5)}>
                    <AntDesign
                      name="deleteuser"
                      size={30}
                      color={COLORS.main}
                    />
                    <Text style={styles.menuItemText}> Xóa tài khoản </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => logout()}>
                  <View style={styles.menuItem(0.5)}>
                    <AntDesign name="logout" size={30} color={COLORS.main} />
                    <Text style={styles.menuItemText}> Đăng xuất </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Old version */}
        {/* <ScrollView>
          <View style={styles.wallet}>
            <View
              style={
                (styles.title,
                { marginLeft: 30, marginTop: 15, flexDirection: "row" })
              }
            >
              <Ionicons name="wallet-outline" size={30} color={COLORS.main} />
              <Text style={styles.titleText}>Vi cua ban:</Text>
            </View>
            <View style={{ marginLeft: 40, marginTop: 5 }}>
              <Text style={styles.numberText}>10.000.000 VND</Text>
            </View>
            <TouchableOpacity style={styles.historyBtn}>
              <Text></Text>
              <View style={styles.btn}>
                <Text
                  style={{
                    fontFamily: "bold",
                    fontSize: SIZES.large,
                    color: COLORS.lightWhite,
                  }}
                  onPressIn={() => navigation.navigate("Search")}
                >
                  Xem lich su
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.classList}>
            <View style={styles.title}>
              <Text style={styles.titleText}>Danh sach lop cua ban</Text>
            </View>
          </View>
         <View style={{ alignItems: "center", marginTop: 20 }}>
          <TouchableOpacity
            style={{ width: 100 }}
            onPressIn={() => navigation.navigate("Login")}
          >
            <View style={styles.logoutBtn}>
              <Text style={styles.menuText}>L O G O U T</Text>
            </View>
          </TouchableOpacity>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View> 
        </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  menuItemText: {
    fontFamily: "regular",
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 26,
    marginLeft: 20,
  },
  menuWrapper: {
    marginTop: SIZES.xxLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },

  menuItem: (borderWidth) => ({
    borderBottomWidth: borderWidth,
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.gray,
  }),

  menuText: {
    fontFamily: "regular",
    fontWeight: "600",
    fontSize: 17,
    lineHeight: 26,
  },
  email: {
    fontFamily: "bold",
  },

  logoutBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondMain,
    padding: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: SIZES.small + 2,
  },

  loginBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondMain,
    padding: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: SIZES.small + 2,
  },

  name: {
    fontFamily: "bold",
    fontSize: SIZES.medium + 3,
    color: COLORS.primary,
    marginVertical: 5,
  },

  info: {
    flex: 1,
    alignItems: "center",
  },

  profileImg: {
    height: 155,
    width: 155,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
    marginTop: -20,
  },

  btn: {
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    backgroundColor: COLORS.main,
  },
  historyBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  edit: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },

  numberText: {
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.main,
  },
  titleText: {
    marginLeft: 10,
    fontFamily: "bold",
    fontSize: SIZES.large,
  },

  title: {
    marginTop: 10,
  },

  classList: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 30,
    borderColor: COLORS.main,
    borderRadius: 30,
    borderWidth: 2,
    width: 400,
    height: 500,
  },

  wallet: {
    marginTop: 30,
    borderColor: COLORS.main,
    borderRadius: 10,
    borderWidth: 2,
    width: 400,
    height: 120,
  },
  profile: {
    marginTop: 30,
    borderColor: COLORS.main,
    borderRadius: 30,
    borderWidth: 2,
    width: 350,
    height: 300,
  },
  cartCount: {
    position: "absolute",
    bottom: 25,
    width: 16,
    heightL: 30,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "red",
    justifyContent: "center",
    zIndex: 999,
  },

  cartNumber: {
    fontFamily: "regular",
    fontWeight: "600",
    fontSize: 10,
    color: COLORS.lightWhite,
  },
  heading: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 999,
    alignItems: "center",
  },

  headingText: {
    marginLeft: 10,
    fontSize: SIZES.xLarge,
    fontFamily: "bold",
    color: COLORS.main,
  },

  profilePage: {
    justifyContent: "center",
    alignItems: "center",
  },
});
