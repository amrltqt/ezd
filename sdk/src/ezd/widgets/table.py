from typing import Literal

from ezd.core import Widget, Dataset


class Table(Widget):
    type: Literal["table"] = "table"
    dataset: Dataset
    columns: list[str] | None = None
    title: str | None = None
    show_header: bool = True