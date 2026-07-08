"""CSV/JSON export utilities for Google Ads report rows."""

from __future__ import annotations

import csv
import json
from enum import Enum
from pathlib import Path
from typing import Any


def field_value(obj: Any) -> Any:
    if obj is None:
        return ""
    if isinstance(obj, Enum):
        return obj.name
    if hasattr(obj, "name") and type(obj).__name__.endswith("Enum"):
        return obj.name
    if isinstance(obj, (list, tuple)):
        return "; ".join(str(item) for item in obj)
    if isinstance(obj, (str, int, float, bool)):
        return obj
    return str(obj)


def row_to_dict(row: Any, fields: list[str]) -> dict[str, Any]:
    out: dict[str, Any] = {}
    for field in fields:
        value = row
        for part in field.split("."):
            value = getattr(value, part)
        out[field] = field_value(value)
    return out


def write_csv(path: Path, fieldnames: list[str], rows: list[dict[str, Any]]) -> None:
    with open(path, "w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def write_json(path: Path, rows: list[dict[str, Any]]) -> None:
    with open(path, "w", encoding="utf-8") as handle:
        json.dump(rows, handle, indent=2)
        handle.write("\n")
