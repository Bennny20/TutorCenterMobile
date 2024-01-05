import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Switch, Text, View } from "react-native";
import "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Popup = () => {
  const snapPoints = ["25%", "48%", "75%"];
  const bottomSheetModalRef = useRef(null);
  const handleShowPopup = () => {
    bottomSheetModalRef.current?.present();
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <Button title="Show popup" onPress={handleShowPopup} />
          <Text>Open up App.js to start working on your app!</Text>
          <StatusBar style="auto" />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            backgroundStyle={{ borderRadius: 30 }}
          >
            <View style={styles.containerContainer}>
              <Text style={styles.title}>Dark mode</Text>
              <View style={styles.row}>
                <Text>
                  Dark mode
                  <Switch />
                </Text>
              </View>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default Popup;

const styles = StyleSheet.create({});
