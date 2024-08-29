
from typing import Literal

from ezd.core import Widget, Dataset
from ezd.widgets.common.yaxis import YAxis

class LineChart(Widget):
    type: Literal["LineChart"] = "LineChart"
    title: str
    dataset: Dataset
    xaxis: str
    yaxis: list[YAxis]