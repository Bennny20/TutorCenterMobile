import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const History = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item, order } = route.params;
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(item?.amount);

  const formattedOrder = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(order?.amount);
  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.replace("Bottom Navigation")}
        >
          <View style={{ marginTop: 60, marginLeft: 10 }}>
            <MaterialCommunityIcons
              name={"home"}
              size={40}
              color={COLORS.black}
            />
          </View>
        </TouchableOpacity>
      </View>

      {item.type === "Nạp" ? (
        <View style={styles.body}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.logo}>
              <MaterialCommunityIcons
                name={"checkbox-marked-circle-outline"}
                size={80}
                color={"green"}
              />
            </View>
          </View>

          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Text style={styles.amount}>Nạp tiền vào ví thành công</Text>
            <Text style={[styles.amount, { fontSize: SIZES.large }]}>
              + {formattedAmount}
            </Text>
          </View>

          <View>
            <View style={styles.info}>
              <Text style={styles.title}>Nạp tiền từ</Text>
              <Text style={styles.amount}>TP Bank</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>Số tiền nạp</Text>
              <Text style={styles.amount}> + {formattedAmount}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>Phí giao dịch</Text>
              <Text style={styles.amount}>Miễn phí</Text>
            </View>
          </View>
        </View>
      ) : item.type === "Rút" ? (
        <View style={styles.body}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.logo}>
              <MaterialCommunityIcons
                name={"checkbox-marked-circle-outline"}
                size={80}
                color={"green"}
              />
            </View>
          </View>

          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Text style={styles.amount}>Yêu cầu rút tiền thành công</Text>
            <Text style={[styles.amount, { fontSize: SIZES.large }]}>
              - {formattedAmount}
            </Text>
          </View>

          <View>
            <View style={styles.info}>
              <Text style={styles.title}>Rút tiền từ</Text>
              <Text style={styles.amount}>Ví</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>Số tiền rút</Text>
              <Text style={styles.amount}> - {formattedAmount}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>Phí giao dịch</Text>
              <Text style={styles.amount}>Miễn phí</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.body}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.logo}>
              <MaterialCommunityIcons
                name={"checkbox-marked-circle-outline"}
                size={80}
                color={"green"}
              />
            </View>
          </View>

          <View style={{ alignItems: "center", marginVertical: 20 }}>
            <Text style={styles.amount}>Thanh toán khóa học</Text>
            <Text style={styles.amount}>Chuyển tiền thành công</Text>
            <Text style={[styles.amount, { fontSize: SIZES.large }]}>
              - {formattedOrder}
            </Text>
          </View>

          <View>
            <View style={styles.info}>
              <Text style={styles.title}>Nguồn tiền từ</Text>
              <Text style={styles.amount}>Ví</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>Số tiền chuyển khoản</Text>
              <Text style={styles.amount}> - {formattedOrder}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>Phí giao dịch</Text>
              <Text style={styles.amount}>Miễn phí</Text>
            </View>
          </View>
        </View>
      )}
      <View
        style={{
          borderTopColor: COLORS.gray2,
          borderTopWidth: 2,
          marginTop: 160,
          borderRadius: 99,
        }}
      >
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Profile")}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Text style={styles.amount}>Trang cá nhân</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            {
              marginTop: 10,
              backgroundColor: COLORS.gray2,
              borderColor: COLORS.secondMain,
            },
          ]}
          onPress={() => navigation.replace("Bottom Navigation")}
        >
          <TouchableOpacity
            onPress={() => navigation.replace("Bottom Navigation")}
          >
            <Text style={styles.amount}>Màn hình chính</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: COLORS.secondMain,
  },
  body: {
    marginHorizontal: 20,
    height: 400,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 20,
    marginTop: -40,
    borderWidth: 0.5,
    borderColor: COLORS.gray2,
  },

  logo: {
    marginTop: -50,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    borderRadius: 99,
    backgroundColor: COLORS.lightWhite,
  },

  info: {
    justifyContent: "space-between",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 15,
  },

  title: {
    fontFamily: "regular",
    fontSize: SIZES.medium,
    color: COLORS.gray,
  },

  amount: {
    fontFamily: "bold",
    fontSize: SIZES.large - 5,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginHorizontal: 40,
    marginTop: 20,
    padding: 10,
    borderWidth: 2,
    backgroundColor: COLORS.secondMain,
    borderColor: COLORS.gray2,
    borderRadius: 20,
  },
});
