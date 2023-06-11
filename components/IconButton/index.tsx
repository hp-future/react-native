import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { PressableProps, Pressable, StyleSheet, Text } from "react-native";

interface IconButtonProps {
  icon: any;
  label: string;
  onPress: PressableProps["onPress"];
}

export default function IconButton(props: IconButtonProps) {
  return (
    <Pressable style={styles.iconButton} onPress={props.onPress}>
      <MaterialIcons name={props.icon} size={24} color="#fff" />
      <Text style={styles.iconButtonLabel}>{props.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
