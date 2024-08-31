from typing import Literal

from ezd.core import Widget

class Container(Widget):
    type: Literal["container"] = "container"
    widgets: list[Widget]
    direction: Literal["horizontal", "vertical"]
