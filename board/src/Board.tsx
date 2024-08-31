import { Dataset } from "./core";
import { AnyWidget, renderWidget } from "./widgets";

export interface BoardProps {
  widgets: AnyWidget[];
  data: { [key: string]: Dataset | string | number };
  size: number;
}

export default function Board({ widgets, data, size }: BoardProps) {
  const tree = widgets.map((def) => renderWidget(def, data));
  return (
    <div
      id="canvas"
      className={`p-2 flex flex-col space-y-2`}
      style={{
        width: size,
      }}
    >
      {tree}
    </div>
  );
}
