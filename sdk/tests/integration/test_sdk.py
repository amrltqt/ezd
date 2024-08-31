
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
def test_render():
    widgets = [
        {
            "type": "title",
            "main": "Hello, World!"
        },
        {
            "type": "card",
            "label": "Card Label",
            "value": 42
        },
        {
            "type": "table",
            "dataset": {
                "type": "ref",
                "key": "table_values"
            },
            "show_header": True,
            "columns": ["name", "age"]
        }
    ]

    data = {
        "title": "Test Report",
        "table_values": [
            {"name": "Alice", "age": 25},
            {"name": "Bob", "age": 30}
        ]
    }


    targets = [
        {
            "type": "slack-channel",
            "id": "C05D8RSUKSQ",
            "comment": "Report of the day",
            "filename": "report.png"
        }
    ]
    
    response = EZDClient(os.getenv("EZD_INTEGRATION_SERVER")).render(
        widgets=widgets,
        width=800,
        targets=targets,
        data=data
    )
    
    assert "id" in response.keys()