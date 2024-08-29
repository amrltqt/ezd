import requests
from typing import Union

from pydantic import BaseModel

from ezd.core import Widget
from ezd.registration import Root


class EZDClient:
    def __init__(self, base_url):
        self.base_url = base_url

    def screenshot(
            self,
            widgets: list[Widget],
            width: int,
            targets,
            data
        ):

        # Pre-validate the input against the sdk schema
        Root.validate(widgets)


        endpoint = f"{self.base_url}/screenshot"
        response = requests.post(endpoint, json={
            "widgets": widgets,
            "width": width,
            "targets": targets,
            "data": data
        })
        return response.json()

    def status(self):
        endpoint = f"{self.base_url}/status"
        response = requests.get(endpoint)
        return response.json()
