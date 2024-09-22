import { Dataset, datasetValidator, Widget } from "../../core";
import { WidgetType } from "../../widgets";

import Joi from "joi";

import { LineChartWidget } from "./LineChart";
import { LineChartIcon } from "lucide-react";

export interface YAxis {
  name: string;
  color: string;
}

export interface LineChart extends Widget {
  type: WidgetType.LineChart;
  title: string;
  dataset: Dataset;
  xaxis: string;
  yaxis: YAxis[];
}

const yAxisValidator = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().required(),
});

const lineChartValidator = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid("linechart").required(),
  title: Joi.string().required(),
  dataset: datasetValidator.required(),
  xaxis: Joi.string().required(),
  yaxis: Joi.array().items(yAxisValidator).required(),
});

export default {
  id: "linechart",
  name: "Line Chart",
  widget: LineChartWidget,
  validator: lineChartValidator,
  icon: LineChartIcon,
};
