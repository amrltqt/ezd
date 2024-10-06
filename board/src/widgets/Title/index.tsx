import Joi from "joi";
import { Variable, variableValidator, Widget } from "../../core";
import { WidgetType } from "../../widgets";
import { TitleWidget } from "./Title";
import { TypeIcon } from "lucide-react";
import { PropsEditor } from "./playground/PropsEditor";

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

export const titleValidator = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid("title").required(),
  main: variableValidator.required(),
  secondary: variableValidator,
  align: Joi.string().valid("horizontal", "vertical").required(),
});

export default {
  id: "title",
  name: "Title",
  validator: titleValidator,
  widget: TitleWidget,
  icon: TypeIcon,
  propsEditor: PropsEditor,
  defaultProps: {
    type: "title",
    name: "",
    main: "",
    secondary: "",
    align: TitleAlign.Horizontal,
  },
};
