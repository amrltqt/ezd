
import pytest
import os

from ezd import EZDClient

@pytest.mark.skipif(
    os.getenv("EZD_INTEGRATION_SERVER") is None,
    reason="EZD_INTEGRATION_SERVER is not set"
)
def test_status():
    response = EZDClient(os.getenv("EZD_INTEGRATION_SERVER")).status()
    assert response["status"] == "ok"


@pytest.mark.skipif(
    os.getenv("EZD_INTEGRATION_SERVER") is None,
    reason="EZD_INTEGRATION_SERVER is not set"
)
def test_screenshot():
    widgets = [
        {
            "type": "RichText",
            "text": "Hello, World!"
        },
        {
            "type": "Card",
            "label": "Card Label",
            "value": 42
        },
        {
            "type": "Table",
            "dataset": [
                {"name": "Alice", "age": 25},
                {"name": "Bob", "age": 30},
                {"name": "Charlie", "age": 35},
            ],
            "columns": ["name", "age"]
        }
    ]
    response = EZDClient(os.getenv("EZD_INTEGRATION_SERVER")).screenshot(
        widgets=widgets,
        width=800,
        targets=["pdf"],
        data={"title": "Test Report"}
    )
    assert response["status"] == "ok"
    assert response["data"]["pdf"] is not None