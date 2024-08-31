from typing import Literal

from ezd.core import DistributionTarget

class SlackChannel(DistributionTarget):
    type: Literal["slack-user"] = "slack-user"
    channel: str
    filename: str
    comment: str

class SlackUser(DistributionTarget):
    type: Literal["slack-channel"] = "slack-channel"
    user: str
    filename: str
    comment: str