from typing import Literal
from ezd.core import Widget, Variable

class Image(Widget):
    type: Literal["image"] = "image"
    url: Variable