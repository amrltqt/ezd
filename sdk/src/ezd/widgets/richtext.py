from typing import Literal

from ezd.core import Widget, Variable

class RichText(Widget):
    type: Literal["richtext"] = "richtext"
    text: Variable
