from typing import Literal

from ezd.core import Widget

class Container(Widget):
    type: Literal["Container"] = "Container"
    widgets: list[Widget]
    direction: Literal["horizontal", "vertical"]
