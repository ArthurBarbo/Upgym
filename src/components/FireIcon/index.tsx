import { StyleProp, ViewStyle } from "react-native";
import FireSvg from "@assets/Fire.svg";

type Props = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function FireIcon({ size = 28, style }: Props) {
  return <FireSvg width={size} height={size} style={style} />;
}
