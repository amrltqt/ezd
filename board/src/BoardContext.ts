import React from "react";
import { Dataset, Widget } from "./core";

export interface BoardContextData {
  size: number;
  data: { [key: string]: Dataset | string | number };
  widgets: Widget[];
  setData: (data: { [key: string]: Dataset | string | number }) => void;
  setWidgets: (widgets: Widget[]) => void;
  setSize: (size: number) => void;
}

export const BoardContext = React.createContext<BoardContextData>({
  size: 500,
  data: {},
  widgets: [] as Widget[],
  setData: () => {},
  setWidgets: () => [],
  setSize: () => 500,
});
