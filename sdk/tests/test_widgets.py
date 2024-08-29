from ezd.widgets import (
    Card,
    Badge,
    BarChart,
    LineChart,
    Table,
    Title,
    RichText,
    Container,
    YAxis
)

from ezd.core import Reference

import datetime


def test_create_widgets():
    execution_date = datetime.datetime(2024, 1, 1).strftime("%Y-%m-%d")
    
    widgets = [
        Title(main="Main Title", secondary=execution_date),
        Card(value=1, label="Card 1"),
        Container(
            direction="horizontal",
            widgets=[
                Card(value=2, label="Card 2"),
                Card(value=3, label="Card 3"),
            ]
        ),
        Badge(value=4, label="Badge 1"),
        Table(
            title="Bar Chart",
            values=Reference(key="bar_chart_values"), 
            xaxis="x",
            yaxis=[
                YAxis(name="y", color="#0000FF"),
            ],
        ),
        LineChart(
            title="Line Chart",
            dataset=Reference(key="line_chart_values"), 
            xaxis="x",
            yaxis=[
                YAxis(name="y", color="#0000FF"),
            ],
        ),
        BarChart(
            title="Bar Chart",
            dataset=Reference(key="bar_chart_values"), 
            xaxis="x",
            yaxis=[
                YAxis(name="y", color="#0000FF"),
            ],
        ),
        RichText(
            text="#Rich Text\nThis is a rich text widget",
        )
    ]

    assert len(widgets) == 8
    (
        title,
        card1,
        container,
        badge,
        table,
        line_chart,
        bar_chart,
        rich_text
    ) = widgets

    assert title.main == "Main Title"
    assert title.secondary == execution_date

    assert card1.value == 1
    assert card1.label == "Card 1"

    assert container.direction == "horizontal"
    assert len(container.widgets) == 2
    
    widget_in_container = container.widgets[0]

    assert widget_in_container.value == 2
    assert widget_in_container.label == "Card 2"
