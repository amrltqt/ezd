import Joi from "joi";
import { Widget } from "../../core";
import { WidgetType } from "../../widgets";
import { ContainerWidget } from "./Container";
import { ContainerIcon } from "lucide-react";
import { PropsEditor } from "./playground/PropsEditor";

export enum ContainerDirection {
  Horizontal = "horizontal",
  Vertical = "vertical",
}

export interface Container extends Widget {
  type: WidgetType.Container;
  widgets: Widget[];
  direction: ContainerDirection;
}

export const containerValidator = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid("container").required(),
  widgets: Joi.array().items(Joi.link("#widget")).required(),
  direction: Joi.string().valid("horizontal", "vertical").required(),
}).id("container");

export default {
  id: "container",
  name: "Container",
  widget: ContainerWidget,
  validator: containerValidator,
  icon: ContainerIcon,
  propsEditor: PropsEditor,
};
