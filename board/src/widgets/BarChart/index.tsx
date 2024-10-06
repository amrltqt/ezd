import { Dataset, datasetValidator, Widget } from "../../core";
import { WidgetType } from "../../widgets";

import Joi from "joi";

import { BarChartWidget } from "./BarChart";
import { BarChart3Icon } from "lucide-react";
import { PropsEditor } from "./playground/PropsEditor";

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
  name: Joi.string().required(),
  type: Joi.string().valid("barchart").required(),
  title: Joi.string().required(),
  dataset: datasetValidator.required(),
  xaxis: Joi.string().required(),
  yaxis: Joi.array().items(yAxisValidator).required(),
});

export default {
  id: "barchart",
  name: "Bar Chart",
  widget: BarChartWidget,
  validator: barChartValidator,
  icon: BarChart3Icon,
  propsEditor: PropsEditor,
  defaultProps: {
    type: "barchart",
    title: "Bar Chart",
    dataset: { type: "ref", key: "" },
    xaxis: "",
    yaxis: [],
    name: "",
  },
};
