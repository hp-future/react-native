import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

const PlaceholderImage = require("./assets/background-image.png");

export default function App() {
  const [selectImage, setSelectImage] = useState("");
  const [showAppOptions, setShowAppOptions] = useState(false);
  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          PlaceholderImage={PlaceholderImage}
          selectImage={selectImage}
        />
      </View>
      {showAppOptions ? (
        <View />
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
