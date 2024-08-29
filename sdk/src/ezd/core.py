from pydantic import BaseModel
from typing import Union, Literal


class Reference(BaseModel):
    """
    Reference to an entry in the data store
    
    ```python
    ref = Reference(key="a_dataset")
    ```
    
    """
    type: Literal["ref"] = "ref"
    key: str

type Row = dict[str, Union[str, int, float]];
type Dataset = Union[list[Row]] | Reference;    

class Widget(BaseModel):
    """
    Base class for all widgets
    """
    type: str

type Variable = Union[str, int, float, Reference]