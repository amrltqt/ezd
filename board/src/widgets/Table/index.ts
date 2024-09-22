import Joi from "joi";
import { Dataset, Widget } from "../../core";
import TableWidget from "./Table";
import { Table2Icon } from "lucide-react";

export interface Table extends Widget {
  dataset: Dataset;
  columns: string[];
  showHeaders: boolean;
  title: string;
}

const tableValidator = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid("table").required(),
  dataset: Joi.object().required(),
  columns: Joi.array().items(Joi.string()).required(),
  showHeaders: Joi.boolean().required(),
  title: Joi.string().required(),
});

export default {
  id: "table",
  name: "Table",
  widget: TableWidget,
  validator: tableValidator,
  icon: Table2Icon,
};
