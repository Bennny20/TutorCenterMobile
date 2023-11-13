import React from "react";
import { View, Text } from "react-native";
import { COLORS, SIZES } from "../constants";

const CurrencyFormatter = ({ amount }) => {
  // Format the number as currency
  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);

  return (
    <View>
      <Text>{formattedAmount}</Text>
    </View>
  );
};

export default CurrencyFormatter;
