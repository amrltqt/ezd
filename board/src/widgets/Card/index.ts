import Joi from "joi";
import { Reference, variableValidator, Widget } from "../../core";
import { CardWidget } from "./Card";
import { PanelTopIcon } from "lucide-react";
import { PropsEditor } from "./playground/PropsEditor";

export enum CardDisplayPosition {
  Right = "right",
  Left = "left",
  Center = "center",
}

export const cardValidator = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid("card").required(),
  label: Joi.string().required(),
  value: variableValidator.required(),
  align: Joi.string().valid("right", "left", "center").required(),
  reference: variableValidator,
  evolution: variableValidator,
});

export interface Card extends Widget {
  value: string | number | Reference;
  label: string;
  align: "left" | "right" | "center";
  reference?: string | number | Reference;
  evolution?: string | number | Reference;
}

export default {
  id: "card",
  name: "Card",
  validator: cardValidator,
  widget: CardWidget,
  icon: PanelTopIcon,
  propsEditor: PropsEditor,
  defaultProps: {
    type: "card",
    label: "Card",
    align: CardDisplayPosition.Center,
    value: "",
    reference: null,
    evolution: null,
    name: "",
  },
};
