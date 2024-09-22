import Joi from "joi";
import { Widget } from "../../core";
import { RichTextWidget } from "./RichText";
import { PenToolIcon } from "lucide-react";

export interface RichText extends Widget {
  text: string;
}

const richTextValidator = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().valid("richtext").required(),
  text: Joi.string().required(),
});

export default {
  id: "richtext",
  name: "Rich Text",
  widget: RichTextWidget,
  validator: richTextValidator,
  icon: PenToolIcon,
};
