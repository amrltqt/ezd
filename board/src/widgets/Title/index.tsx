import Joi from "joi";
import { Variable, variableValidator, Widget } from "../../core";
import { WidgetType } from "../../widgets";
import { TitleWidget } from "./Title";

export enum TitleAlign {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export interface Title extends Widget {
  type: WidgetType.Title;
  main: Variable;
  secondary: Variable;
  align: TitleAlign;
}

const titleValidator = Joi.object({
  type: Joi.string().valid("Title").required(),
  main: variableValidator.required(),
  secondary: variableValidator,
  align: Joi.string().valid("horizontal", "vertical").required(),
});

export default {
  validator: titleValidator,
  widget: TitleWidget,
};
