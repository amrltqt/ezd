from typing import Union

from ezd.widgets import (
    Card,
    Container,
    Badge,
    BarChart,
    LineChart,
    Table,
    Title,
    RichText,
)
from ezd.widgets.container import Container

type Root = list[Union[
    Card,
    Container,
    Badge,
    BarChart,
    LineChart,
    Table,
    Title,
    RichText
]]