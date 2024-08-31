import { Dataset, datasetValidator, Widget } from "../../core";
import { WidgetType } from "../../widgets";

import Joi from "joi";

import { BarChartWidget } from "./BarChart";

export interface YAxis {
  name: string;
  color: string;
}

export interface BarChart extends Widget {
  type: WidgetType.BarChart;
  title: string;
  dataset: Dataset;
  xaxis: string;
  yaxis: YAxis[];
}

const yAxisValidator = Joi.object({
  name: Joi.string().required(),
  color: Joi.string().required(),
});

const barChartValidator = Joi.object({
  type: Joi.string().valid("barchart").required(),
  title: Joi.string().required(),
  dataset: datasetValidator.required(),
  xaxis: Joi.string().required(),
  yaxis: Joi.array().items(yAxisValidator).required(),
});

export default {
  widget: BarChartWidget,
  validator: barChartValidator,
};
