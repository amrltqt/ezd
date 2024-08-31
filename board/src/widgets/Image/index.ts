import Joi from "joi";
import { Variable, variableValidator, Widget } from "../../core";
import { WidgetType } from "../../widgets";
import { ImageWidget } from "./Image";

export interface Image extends Widget {
  type: WidgetType.Image;
  url: Variable;
}

const imageValidator = Joi.object({
  type: Joi.string().valid("image").required(),
  url: variableValidator.required(),
});

export default {
  widget: ImageWidget,
  validator: imageValidator,
};
