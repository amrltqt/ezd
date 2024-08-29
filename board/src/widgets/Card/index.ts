import Joi from "joi";
import { Reference, variableValidator, Widget } from "../../core";
import { CardWidget } from "./Card";

export enum CardDisplayPosition {
  Right = "right",
  Left = "left",
  Center = "center",
}

export const cardValidator = Joi.object({
  type: Joi.string().valid("Card").required(),
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
  reference?: string;
  evolution?: string;
}

export default {
  validator: cardValidator,
  widget: CardWidget,
};
