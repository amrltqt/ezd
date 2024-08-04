import { Badge } from ".";
import { resolveString } from "../../hooks";

const colorClasses: { [key: string]: string } = {
  gray: "bg-gray-200 text-gray-600 ring-gray-500/50",
  red: "bg-red-200 text-red-700 ring-red-500/50",
  yellow: "bg-yellow-200 text-yellow-700 ring-yellow-500/50",
  green: "bg-green-200 text-green-700 ring-green-500/50",
  blue: "bg-blue-200 text-blue-700 ring-blue-500/50",
  indigo: "bg-indigo-200 text-indigo-700 ring-indigo-500/50",
  purple: "bg-purple-200 text-purple-700 ring-purple-500/50",
  pink: "bg-pink-200 text-pink-700 ring-pink-500/50",
};

export default function BadgeWidget({ label, color, data }: Badge) {
  const badgeLabel = resolveString(label, data);
  const badgeColor = resolveString(color, data).toString();

  const classes = `inline-flex items-center justify-center rounded px-2 py-0.5 text-xs w-full h-full ring-1 ${
    colorClasses[badgeColor] || colorClasses.gray
  }`;

  return <span className={classes}>{badgeLabel.toString()}</span>;
}
