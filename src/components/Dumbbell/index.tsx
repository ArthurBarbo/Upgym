import { StyleProp, ViewStyle } from "react-native";
import DumbbellSvg from "@assets/dumbells.svg";

type Props = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function Dumbbell({ size = 28, style }: Props) {
  return <DumbbellSvg width={size} height={size} style={style} />;
}
