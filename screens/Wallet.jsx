import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { COLORS, HOST_API, SIZES } from "../constants";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import { FlatList } from "react-native";

const Wallet = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userData } = route.params;
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [obscureText, setObscureText] = useState(true);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();
  const [currentStep, setCurrentStep] = useState(0);
  const [activeAll, setActiveAll] = useState(true);
  const [activeDeposit, setActiveDeposit] = useState(false);
  const [activeWithdraw, setActiveWithdraw] = useState(false);

  const fetchBalance = async () => {
    const token = await AsyncStorage.getItem("token");
    setLoader(true);
    try {
      const response = await axios.get(
        HOST_API.local + `/api/userWallet/balance`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      // setData(response.data.data.balance);
      setData(
        Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(response.data.data.balance)
      );
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };

  const [listTranSaction, setListTranSaction] = useState();
  const fetchListTranSaction = async () => {
    const token = await AsyncStorage.getItem("token");
    setLoader(true);
    try {
      const response = await axios.get(
        HOST_API.local + `/api/userWallet/transactions`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setListTranSaction(response.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchBalance();
    fetchListTranSaction();
  }, []);

  const changeValueDay = (date) => {
    var date = new Date(date);
    var month = date.getMonth() + 1;
    return `${date.getDate()}/${month}/${date.getFullYear()}`;
  };

  const changeValueTime = (date) => {
    var date = new Date(date);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  const format = (value) => {
    const amount = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
    return amount;
  };

  const handelAll = () => {
    setCurrentStep(0);
    setActiveAll(true);
    setActiveDeposit(false);
    setActiveWithdraw(false);
  };

  const handelDeposit = () => {
    setCurrentStep(1);
    setActiveAll(false);
    setActiveDeposit(true);
    setActiveWithdraw(false);
  };
  const handelWithdraw = () => {
    setCurrentStep(2);
    setActiveAll(false);
    setActiveDeposit(false);
    setActiveWithdraw(true);
  };
  const Item = ({ item }) => (
    <View style={styles.requestItem}>
      {currentStep == 0 && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Transaction", {
              item,
            })
          }
        >
          <View style={styles.itemInfo}>
            <View style={styles.itemIcon}>
              {item.type === "Nạp" ? (
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name={"credit-card-plus"}
                    size={27}
                    color={COLORS.secondMain}
                  />
                </View>
              ) : (
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name={"credit-card-minus"}
                    size={27}
                    color={COLORS.red}
                  />
                </View>
              )}
            </View>
            <View>
              <Text style={styles.requestTitle}>
                Day: {changeValueDay(item.timeCreate)}
              </Text>
              <Text style={styles.requestTitle}>
                Time: {changeValueTime(item.timeCreate)}
              </Text>
              {item.type === "Nạp" ? (
                <Text style={styles.requestSup}>
                  Amount: + {format(item.amount)}
                </Text>
              ) : (
                <Text style={styles.requestSup}>
                  Amount: - {format(item.amount)}
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      )}
      {currentStep == 1 && item.type === "Nạp" && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Transaction", {
              item,
            })
          }
        >
          <View style={styles.itemInfo}>
            <View style={styles.itemIcon}>
              {item.type === "Nạp" ? (
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name={"credit-card-plus"}
                    size={27}
                    color={COLORS.secondMain}
                  />
                </View>
              ) : (
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name={"credit-card-minus"}
                    size={27}
                    color={COLORS.red}
                  />
                </View>
              )}
            </View>
            <View>
              <Text style={styles.requestTitle}>
                Day: {changeValueDay(item.timeCreate)}
              </Text>
              <Text style={styles.requestTitle}>
                Time: {changeValueTime(item.timeCreate)}
              </Text>
              <Text style={styles.requestSup}>
                Amount: + {format(item.amount)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      {currentStep == 2 && item.type === "Rút" && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Transaction", {
              item,
            })
          }
        >
          <View style={styles.itemInfo}>
            <View style={styles.itemIcon}>
              {item.type === "Nạp" ? (
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name={"credit-card-plus"}
                    size={27}
                    color={COLORS.secondMain}
                  />
                </View>
              ) : (
                <View style={styles.icon}>
                  <MaterialCommunityIcons
                    name={"credit-card-minus"}
                    size={27}
                    color={COLORS.red}
                  />
                </View>
              )}
            </View>
            <View>
              <Text style={styles.requestTitle}>
                Day: {changeValueDay(item.timeCreate)}
              </Text>
              <Text style={styles.requestTitle}>
                Time: {changeValueTime(item.timeCreate)}
              </Text>
              <Text style={styles.requestSup}>
                Amount: - {format(item.amount)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
  return (
    <View style={{ backgroundColor: COLORS.lightWhite, marginBottom: 730 }}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-circle"
              size={40}
              color={COLORS.black}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Ví của bạn </Text>
        </View>
      </View>
      <View style={styles.profile}>
        <Image
          source={require("../assets/images/profile.jpeg")}
          style={styles.profileImg}
        />
        <Text style={styles.textHeading}>{userData.fullName}</Text>
      </View>
      <View style={{ marginTop: 10, marginHorizontal: 30 }}>
        <View style={styles.wallet}>
          <View style={{ marginRight: 20 }}>
            <Text style={styles.textHeading}>Số dư khả dụng: </Text>
            {loader ? (
              <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primarys} />
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                }}
              >
                {obscureText ? (
                  <Text style={styles.number}>******</Text>
                ) : (
                  <Text style={styles.number}>{data}</Text>
                )}
                <TouchableOpacity
                  onPress={() => {
                    setObscureText(!obscureText);
                  }}
                >
                  <MaterialCommunityIcons
                    name={obscureText ? "eye-off-outline" : "eye-outline"}
                    size={24}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              onPressIn={() =>
                navigation.navigate("DepositAndWithdrawMoney", {
                  userData,
                  data,
                })
              }
            >
              <View style={[styles.btn(COLORS.secondMain)]}>
                <Text style={styles.btnText}>Nạp/Rút tiền </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.titleHistory}>Lịch sử giao dịch:</Text>
      </View>
      <View style={styles.search}>
        <View style={styles.listButton}>
          <TouchableOpacity onPress={handelAll}>
            <View style={styles.btn(COLORS.secondMain)}>
              <Text style={styles.btnText}>Tát cả </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handelDeposit}>
            <View style={styles.btn(COLORS.secondMain)}>
              <Text style={styles.btnText}>Nạp tiền </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handelWithdraw}>
            <View style={styles.btn(COLORS.secondMain)}>
              <Text style={styles.btnText}>Rút tiền </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 5 }}>
        {loader ? (
          <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primarys} />
        ) : (
          <FlatList
            // refreshing={refreshing}
            // onRefresh={onRefresh}
            style={{ marginBottom: 200, backgroundColor: COLORS.lightWhite }}
            data={listTranSaction?.data}
            renderItem={({ item }) => <Item item={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  listButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    marginTop: 10,
  },
  btnText: {
    padding: 7,
    fontFamily: "semibold",
    fontSize: SIZES.medium,
  },

  btn: (color) => ({
    borderWidth: 1,
    borderColor: COLORS.black,
    backgroundColor: color,
    borderRadius: 10,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  }),

  titleHistory: {
    marginTop: 20,
    fontFamily: "bold",
    fontSize: SIZES.large,
    color: COLORS.black,
  },

  number: {
    fontFamily: "semibold",
    fontSize: SIZES.medium + 3,
    color: COLORS.black,
    marginLeft: 25,
    marginRight: 7,
  },

  textHeading: {
    fontFamily: "bold",
    fontSize: SIZES.large - 5,
    color: COLORS.black,
    marginLeft: 5,
  },

  wallet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
    borderColor: COLORS.main,
    borderWidth: 3,
    borderRadius: 15,
  },
  profileImg: {
    height: 80,
    width: 80,
    borderRadius: 999,
    borderColor: COLORS.primary,
    borderWidth: 2,
    resizeMode: "cover",
  },

  profile: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
    marginHorizontal: 70,

    backgroundColor: COLORS.lightWhite,
    borderRadius: 15,
  },

  heading: {
    fontFamily: "semibold",
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginLeft: 5,
  },

  upperRow: {
    width: SIZES.width - 50,
    marginHorizontal: SIZES.large,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.large,
    top: SIZES.large,
    zIndex: 1,
  },

  wrapper: {
    marginTop: 30,
    backgroundColor: COLORS.lightWhite,
  },

  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    marginHorizontal: SIZES.small,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    marginVertical: SIZES.small - 6,
    height: 50,
  },

  searchIcon: {
    marginHorizontal: 10,
    color: COLORS.gray,
    marginTop: SIZES.small,
  },

  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    marginRight: SIZES.small,
    borderRadius: SIZES.small,
  },

  searchInput: {
    fontFamily: "regular",
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.small,
  },

  searchBtn: {
    width: 50,
    height: "100%",
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },

  itemInfo: {
    justifyContent: "flex-start",
    flexDirection: "row",
    borderBottomColor: COLORS.black,
    borderBottomWidth: 0.5,
    marginHorizontal: 10,
    paddingVertical: 10,
  },

  itemIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },

  icon: {
    padding: 3,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    height: 35,
    width: 35,
    borderRadius: 99,
  },
});
