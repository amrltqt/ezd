
from typing import Literal

from ezd.core import Widget, Dataset
from ezd.widgets.common.yaxis import YAxis

class BarChart(Widget):
    type: Literal["BarChart"] = "BarChart"
    title: str
    dataset: Dataset
    xaxis: str
    yaxis: list[YAxis]