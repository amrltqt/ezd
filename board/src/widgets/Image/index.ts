import Joi from "joi";
import { Variable, variableValidator, Widget } from "../../core";
import { WidgetType } from "../../widgets";
import { ImageWidget } from "./Image";
import { ImagesIcon } from "lucide-react";

export interface Image extends Widget {
  type: WidgetType.Image;
  url: Variable;
}

const imageValidator = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid("image").required(),
  url: variableValidator.required(),
});

export default {
  id: "image",
  name: "Image",
  widget: ImageWidget,
  validator: imageValidator,
  icon: ImagesIcon,
};
