from typing import Literal, Optional

from ezd.core import Widget, Variable

class Card(Widget):
    """
    Card widget
    """
    type: Literal["card"] = "card"
    label: str
    value: Variable
    align: Optional[Literal["left", "center", "right"]] = "left"
    evolution: Optional[Variable] = None
    reference: Optional[Variable] = None
