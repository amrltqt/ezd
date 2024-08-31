import Joi from "joi";
import { Widget } from "../../core";
import { AnyWidget, WidgetType } from "../../widgets";
import { ContainerWidget } from "./Container";

export enum ContainerDirection {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export interface Container extends Widget {
  type: WidgetType.Container;
  widgets: AnyWidget[];
  direction: ContainerDirection;
}

const containerValidator = Joi.object({
  type: Joi.string().valid("container").required(),
  widgets: Joi.array().items(Joi.link("#widget")).required(),
  direction: Joi.string().valid("horizontal", "vertical").required(),
}).id("container");

export default {
  widget: ContainerWidget,
  validator: containerValidator,
};
