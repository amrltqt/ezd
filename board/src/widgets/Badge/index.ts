import Joi from "joi";
import { referenceValidator, variableValidator, Widget } from "../../core";
import BadgeWidget from "./Badge";

export interface Badge extends Widget {
  label: string;
  color: string;
}

export enum BadgeColor {
  Gray = "gray",
  Red = "red",
  Yellow = "yellow",
  Green = "green",
  Blue = "blue",
  Indigo = "indigo",
  Purple = "purple",
  Pink = "pink",
}

const badgeValidator = Joi.object({
  type: Joi.string().valid("Badge").required(),
  label: variableValidator.required(),
  color: Joi.alternatives()
    .try(
      Joi.string().valid(
        BadgeColor.Gray,
        BadgeColor.Red,
        BadgeColor.Yellow,
        BadgeColor.Green,
        BadgeColor.Blue,
        BadgeColor.Indigo,
        BadgeColor.Purple,
        BadgeColor.Pink
      ),
      referenceValidator
    )
    .required(),
});

export default {
  widget: BadgeWidget,
  validator: badgeValidator,
};
