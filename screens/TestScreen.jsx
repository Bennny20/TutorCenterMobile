import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants";

const TestScreen = () => {
  const snapPoints = ["25%", "48%", "75%"];
  const bottomSheetModalRef = useRef(null);
  const handleShowPopup = () => {
    bottomSheetModalRef.current?.present();
  };

  const data = [
    { subject: "Toán", choice: false },
    { subject: "Lý", choice: false },
    { subject: "Hóa", choice: false },
    { subject: "Sinh", choice: false },
    { subject: "Anh văn", choice: false },
  ];

  const [mon, setMon] = useState(false);
  const [tus, setTus] = useState(false);
  const [wed, setWed] = useState(false);
  const [thu, setThu] = useState(false);
  const [fri, setFri] = useState(false);
  const [sat, setSat] = useState(false);
  const [sun, setSun] = useState(false);

  const [toan, setToan] = useState(false);

  const day = () => {
    var dayOfWeek2 = [];
    if (mon) {
      dayOfWeek2.push("Thứ 2");
    }
    if (tus) {
      dayOfWeek2.push("Thứ 3");
    }
    if (wed) {
      dayOfWeek2.push("Thứ 4");
    }
    if (thu) {
      dayOfWeek2.push("Thứ 5");
    }
    if (fri) {
      dayOfWeek2.push("Thứ 6");
    }
    if (sat) {
      dayOfWeek2.push("Thứ 7");
    }
    if (sun) {
      dayOfWeek2.push("Chủ nhật");
    }
    console.log(dayOfWeek2.join(", "));
  };
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    //   <BottomSheetModalProvider>
    //     <View style={styles.container}>
    //       <Button title="Show popup" onPress={handleShowPopup} />
    //       <Text>Open up App.js to start working on your app!</Text>
    //       <BottomSheetModal
    //         ref={bottomSheetModalRef}
    //         index={1}
    //         snapPoints={snapPoints}
    //         backgroundStyle={{ borderRadius: 30 }}
    //       >
    //         <View style={styles.containerContainer}>
    //           <Text style={styles.title}>Dark mode</Text>
    //           <View style={styles.row}>
    //             <Text>Dark mode</Text>
    //           </View>
    //         </View>
    //       </BottomSheetModal>
    //     </View>
    //   </BottomSheetModalProvider>

    // </GestureHandlerRootView>
    <SafeAreaView>
      <View style={styles.dayOfWeek}>
        {mon ? (
          <TouchableOpacity
            onPress={() => {
              setMon(false), console.log(mon);
            }}
            style={styles.dayOn}
          >
            <Text style={styles.title}>2</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setMon(true), console.log(mon);
            }}
            style={styles.dayOff}
          >
            <Text style={styles.title}>2</Text>
          </TouchableOpacity>
        )}

        {tus ? (
          <TouchableOpacity
            onPress={() => {
              setTus(false);
            }}
            style={styles.dayOn}
          >
            <Text style={styles.title}>3</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setTus(true);
            }}
            style={styles.dayOff}
          >
            <Text style={styles.title}>3</Text>
          </TouchableOpacity>
        )}

        {wed ? (
          <TouchableOpacity
            onPress={() => {
              setWed(false);
            }}
            style={styles.dayOn}
          >
            <Text style={styles.title}>4</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setWed(true);
            }}
            style={styles.dayOff}
          >
            <Text style={styles.title}>4</Text>
          </TouchableOpacity>
        )}

        {thu ? (
          <TouchableOpacity
            onPress={() => {
              setThu(false);
            }}
            style={styles.dayOn}
          >
            <Text style={styles.title}>5</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setThu(true);
            }}
            style={styles.dayOff}
          >
            <Text style={styles.title}>5</Text>
          </TouchableOpacity>
        )}

        {fri ? (
          <TouchableOpacity
            onPress={() => {
              setFri(false);
            }}
            style={styles.dayOn}
          >
            <Text style={styles.title}>6</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setFri(true);
            }}
            style={styles.dayOff}
          >
            <Text style={styles.title}>6</Text>
          </TouchableOpacity>
        )}

        {sat ? (
          <TouchableOpacity
            onPress={() => {
              setSat(false);
            }}
            style={styles.dayOn}
          >
            <Text style={styles.title}>7</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setSat(true);
            }}
            style={styles.dayOff}
          >
            <Text style={styles.title}>7</Text>
          </TouchableOpacity>
        )}

        {sun ? (
          <TouchableOpacity
            onPress={() => {
              setSun(false);
            }}
            style={styles.dayOn}
          >
            <Text style={styles.title}>CN</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setSun(true);
            }}
            style={styles.dayOff}
          >
            <Text style={styles.title}>CN</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.btn} onPress={day}>
        <Text>Day of week </Text>
      </TouchableOpacity>

      {toan == false ? (
        <TouchableOpacity
          onPress={() => {
            setToan(true);
          }}
        >
          <MaterialCommunityIcons name={"checkbox-blank-outline"} size={35} />
          <Text>Toán</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            setToan(false);
          }}
        >
          <MaterialCommunityIcons name={"checkbox-outline"} size={35} />
          <Text>Toán</Text>
        </TouchableOpacity>
      )}
      <View>
        {data.map((item, stt = 0) => (
          <View>
            {item.choice == false ? (
              <TouchableOpacity
                onPress={() => {
                  item.choice = true;
                  console.log(item);
                }}
              >
                <MaterialCommunityIcons
                  name={"checkbox-blank-outline"}
                  size={35}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  item.choice = false;
                }}
              >
                <MaterialCommunityIcons name={"checkbox-outline"} size={35} />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dayOff: {
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 99,
    borderWidth: 0.2,
  },

  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },

  dayOn: {
    backgroundColor: COLORS.main,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 99,
    borderWidth: 0.2,
  },

  dayOfWeek: {
    marginHorizontal: 40,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  containerContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },

  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
