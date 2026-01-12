import { Image, StyleSheet } from "react-native";

type Props = {
  size?: number;
};

export function Dumbbell({ size = 28 }: Props) {
  return (
    <Image
      source={require("../../../assets/dumbells.png")}
      style={[styles.icon, { width: size, height: size }]}
      resizeMode="contain"
      accessibilityLabel="Dumbbell icon"
    />
  );
}

const styles = StyleSheet.create({
  icon: {},
});
