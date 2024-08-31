import requests

from ezd.core import Widget, DistributionTarget


class EZDClient:
    def __init__(self, base_url):
        self.base_url = base_url

    def render(
            self,
            widgets: list[Widget],
            width: int,
            targets: list[DistributionTarget],
            data
        ):

        endpoint = f"{self.base_url}/render"
        response = requests.post(endpoint, json={
            "widgets": widgets,
            "size": width,
            "targets": targets,
            "data": data
        })
        return response.json()

    def status(self):
        endpoint = f"{self.base_url}/status"
        response = requests.get(endpoint)
        return response.json()
