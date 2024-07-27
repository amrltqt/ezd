import { Title, TitleAlign } from ".";
import { resolveString } from "../../hooks";
import { classNames } from "../../utils";

import "./Title.css";

export function TitleWidget({ main, secondary, align, data }: Title) {
  const cn = classNames(
    "widget-text",
    align === TitleAlign.Horizontal
      ? "widget-text-horizontal"
      : "widget-text-vertical"
  );

  return (
    <div className={cn}>
      <p className="widget-text-title">{resolveString(main, data)}</p>
      {secondary && (
        <p className="widget-text-subtitle">{resolveString(secondary, data)}</p>
      )}
    </div>
  );
}
