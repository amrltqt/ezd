from typing import Literal, Union

from ezd.core import Widget, Variable

class Badge(Widget):
    type: Literal["Badge"] = "Badge"
    label: Variable
    color: Union[
        Literal["gray"],
        Literal["red"],
        Literal["yellow"],
        Literal["green"],
        Literal["blue"],
        Literal["indigo"],
        Literal["purple"],
        Literal["pink"],
        Variable
    ] = "gray"
