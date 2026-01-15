import DumbbellSvg from "@assets/dumbells.svg";

type Props = { size?: number };

export function Dumbbell({ size = 28 }: Props) {
  return <DumbbellSvg width={size} height={size} />;
}
