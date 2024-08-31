import Joi from "joi";
import { Widget } from "../../core";
import { RichTextWidget } from "./RichText";

export interface RichText extends Widget {
  text: string;
}

const richTextValidator = Joi.object({
  type: Joi.string().valid("richtext").required(),
  text: Joi.string().required(),
});

export default {
  widget: RichTextWidget,
  validator: richTextValidator,
};
