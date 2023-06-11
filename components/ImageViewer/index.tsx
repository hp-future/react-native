import {
  Image,
  ImageSourcePropType,
  View,
  StyleSheet,
  ImageURISource,
} from "react-native";

type ImageViewerProps = {
  PlaceholderImage: ImageSourcePropType;
  selectImage: ImageURISource["uri"];
};

export default function ImageViewer(props: ImageViewerProps) {
  const imageSource = props.selectImage
    ? { uri: props.selectImage }
    : props.PlaceholderImage;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
