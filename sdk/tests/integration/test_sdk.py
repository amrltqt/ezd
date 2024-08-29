
import pytest
import os

from ezd import EZDClient

@pytest.mark.skipif(
    os.getenv("EZD_INTEGRATION_SERVER") is None,
    reason="EZD_INTEGRATION_SERVER is not set"
)
def test_my_function():
    response = EZDClient(os.getenv("EZD_INTEGRATION_SERVER")).status()
    print(response)

    assert response["status"] == "ok"