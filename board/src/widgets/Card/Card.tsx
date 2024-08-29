import { Card } from ".";
import { resolveString } from "../../hooks";
import { classNames } from "../../utils";

import "./Card.css";

function EvolutionMetric({
  value,
  reverseEvolutionColor = false,
}: {
  value: string;
  reverseEvolutionColor: boolean;
}) {
  const evol = value;

  if (!value || value === "") {
    return null;
  }

  const EVOLUTION_COLORS = {
    POSITIVE: reverseEvolutionColor
      ? "widget-card-evol-negative"
      : "widget-card-evol-positive",
    NEGATIVE: reverseEvolutionColor
      ? "widget-card-evol-positive"
      : "widget-card-evol-negative",
    NULL: "widget-card-evol-null",
  };

  return (
    <span
      className={classNames(
        `widget-card-evol inline-flex`,
        EVOLUTION_COLORS.POSITIVE
      )}
    >
      {evol}
    </span>
  );
}

export const CardWidget = ({
  value,
  label,
  align,
  reference,
  evolution,
  data,
}: Card) => {
  function getAlign() {
    if (align === "right") {
      return "widget-card-label-right";
    } else if (align === "left") {
      return "widget-card-label-left";
    } else {
      return "widget-card-label-center";
    }
  }

  function getComparisonAlign() {
    if (align === "right") {
      return "widget-card-value-comparison-right";
    } else if (align === "left") {
      return "widget-card-value-comparison-left";
    } else {
      return "widget-card-value-comparison-center";
    }
  }

  return (
    <div className={classNames(`widget-card`, getAlign())}>
      <p className="widget-card-label">{label}</p>

      <p className="widget-card-value">{resolveString(value, data)}</p>
      {evolution && evolution !== null && (
        <div
          className={classNames(
            `widget-card-value-comparison`,
            getComparisonAlign()
          )}
        >
          {align === "right" && <div className="flex-grow"></div>}
          <EvolutionMetric
            value={resolveString(evolution, data).toString()}
            reverseEvolutionColor={true}
          />
          {reference && <>from {reference}</>}
        </div>
      )}
    </div>
  );
};
