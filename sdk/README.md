# ezd-sdk

Python wrapper around EZD OS API.
Provides base objects to help IDE /

## Usage

```python
from ezd import EZDClient

client = EZDClient("http://localhost:8611")

widgets = [...]
targets = [...]
size = 500  # px
data = [...]

client.render(widgets, targets, size)
```
