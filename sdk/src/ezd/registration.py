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

from ezd.widgets.common import SlackChannel, SlackUser

type AllWidgets = Union[
    Card,
    Container,
    Badge,
    BarChart,
    LineChart,
    Table,
    Title,
    RichText
]

type AllWidgetList = list[AllWidgets]

type AllTarget = Union[
    SlackChannel,
    SlackUser,
]

type AllTargetList = list[AllTarget]
