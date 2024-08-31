from typing import Literal

from ezd.core import Widget, Variable

class Title(Widget):
    type: Literal["title"] = "title"
    main: Variable
    secondary: Variable
    align: Literal["horizontal", "vertical"] = "vertical"