import Joi from "joi";
import { Dataset, Widget } from "../../core";
import TableWidget from "./Table";

export interface Table extends Widget {
  dataset: Dataset;
  columns: string[];
  showHeaders: boolean;
  title: string;
}

const tableValidator = Joi.object({
  type: Joi.string().valid("table").required(),
  dataset: Joi.object().required(),
  columns: Joi.array().items(Joi.string()).required(),
  showHeaders: Joi.boolean().required(),
  title: Joi.string().required(),
});

export default {
  widget: TableWidget,
  validator: tableValidator,
};
