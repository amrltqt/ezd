from typing import Literal

from ezd.core import Widget, Variable

class Title(Widget):
    """
    
    """
    type: Literal["Title"] = "Title"
    main: Variable
    secondary: Variable
    align: Literal["horizontal", "vertical"] = "vertical"