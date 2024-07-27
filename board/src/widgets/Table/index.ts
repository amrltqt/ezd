import Joi from "joi";
import { Dataset, Widget } from "../../core";
import TableWidget from "./Table";

export interface Table extends Widget {
  values: Dataset;
  selectedColumns: string[];
  showHeaders: boolean;
  title: string;
}

const tableValidator = Joi.object({
  type: Joi.string().valid("Table").required(),
  values: Joi.object().required(),
  selectedColumns: Joi.array().items(Joi.string()).required(),
  showHeaders: Joi.boolean().required(),
  title: Joi.string().required(),
});

export default {
  widget: TableWidget,
  validator: tableValidator,
};
