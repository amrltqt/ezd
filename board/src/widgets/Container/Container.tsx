import { Container, ContainerDirection } from ".";
import { classNames } from "../../utils";

export function ContainerWidget({
  direction,
  children,
}: Container & { children: (null | JSX.Element)[] }) {
  const classes = classNames(
    "flex",
    direction == ContainerDirection.Horizontal ? "flex-row" : "flex-col",
    direction == ContainerDirection.Horizontal ? "space-x-2" : "space-y-2"
  );

  return <div className={classes}>{children}</div>;
}
