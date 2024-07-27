import React from "react";
import { AnyWidget } from "./widgets";
import { Dataset } from "./core";

export interface BoardContextData {
  size: number;
  data: { [key: string]: Dataset | string | number };
  widgets: AnyWidget[];
  setData: (data: { [key: string]: Dataset | string | number }) => void;
  setWidgets: (widgets: AnyWidget[]) => void;
  setSize: (size: number) => void;
}

export const BoardContext = React.createContext<BoardContextData>({
  size: 500,
  data: {},
  widgets: [] as AnyWidget[],
  setData: () => {},
  setWidgets: () => [],
  setSize: () => 500,
});
