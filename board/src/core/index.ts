import * as Joi from "joi";

import { WidgetType } from "../widgets";
import React from "react";

export interface Widget {
  name: string;
  type: WidgetType;
  data: { [key: string]: Dataset | string | number };
}

export interface Row {
  [key: string]: string | number;
}

export type Reference = { type: "ref"; key: string };
export type Dataset = Row[] | Reference;
export type Variable = string | number | Reference;

export type WidgetDefinition = {
  widget: () => React.FC;
  validator: Joi.ObjectSchema;
};

export const referenceValidator = Joi.object({
  type: Joi.string().valid("ref").required(),
  key: Joi.string().required(),
});

export const variableValidator = Joi.alternatives().try(
  Joi.string().empty(""),
  Joi.number(),
  referenceValidator
);

const rowValidator = Joi.object().pattern(
  Joi.string(),
  Joi.alternatives().try(Joi.string(), Joi.number())
);

export const datasetValidator = Joi.alternatives().try(
  Joi.array().items(rowValidator),
  referenceValidator
);
