import Joi from "joi";
import { referenceValidator, variableValidator, Widget } from "../../core";
import BadgeWidget from "./Badge";
import { TagIcon } from "lucide-react";

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
  name: Joi.string().required(),
  type: Joi.string().valid("badge").required(),
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
  id: "badge",
  name: "Badge",
  widget: BadgeWidget,
  validator: badgeValidator,
  icon: TagIcon,
};
