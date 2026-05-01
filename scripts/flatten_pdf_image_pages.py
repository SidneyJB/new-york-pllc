#!/usr/bin/env python3
"""
Flatten a PDF by rasterizing each page to an image, then rebuilding a new PDF.

Uses only the Python standard library plus system tools (no pip packages):
  - Ghostscript: PDF → PNG per page
  - macOS `sips`: each PNG → one-page PDF (avoids gs reading PNG as broken PS input)
  - Ghostscript: merge one-page PDFs

Usage:
  python3 flatten_pdf_image_pages.py input.pdf [output.pdf]
  # Default output: input_flat.pdf next to input
"""

from __future__ import annotations

import argparse
import glob
import os
import shutil
import subprocess
import sys
import tempfile


def find_gs() -> str:
    for candidate in (
        shutil.which("gs"),
        "/opt/homebrew/bin/gs",
        "/usr/local/bin/gs",
    ):
        if candidate and os.path.isfile(candidate):
            return candidate
    sys.exit("error: Ghostscript `gs` not found. Install with: brew install ghostscript")


def run(cmd: list[str]) -> None:
    r = subprocess.run(
        cmd,
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace",
    )
    if r.returncode != 0:
        sys.stderr.write(r.stderr or r.stdout or "")
        sys.exit(r.returncode)


def main() -> None:
    ap = argparse.ArgumentParser(description="Rasterize PDF pages to images, save as new PDF.")
    ap.add_argument("input_pdf", help="Source PDF path")
    ap.add_argument(
        "output_pdf",
        nargs="?",
        help="Destination PDF (default: <input>_flat.pdf)",
    )
    ap.add_argument(
        "-r",
        "--dpi",
        type=int,
        default=300,
        help="Rasterization DPI (default: 300)",
    )
    args = ap.parse_args()

    src = os.path.abspath(args.input_pdf)
    if not os.path.isfile(src):
        sys.exit(f"error: not a file: {src}")

    if args.output_pdf:
        dst = os.path.abspath(args.output_pdf)
    else:
        base, ext = os.path.splitext(src)
        dst = f"{base}_flat{ext or '.pdf'}"

    gs = find_gs()

    with tempfile.TemporaryDirectory(prefix="pdf_flat_") as tmp:
        pat = os.path.join(tmp, "page-%03d.png")
        # 1) Rasterize each page to PNG
        run(
            [
                gs,
                "-dSAFER",
                "-dBATCH",
                "-dNOPAUSE",
                "-dNOPROMPT",
                "-sDEVICE=png16m",
                f"-r{args.dpi}",
                f"-sOutputFile={pat}",
                src,
            ]
        )

        pngs = sorted(glob.glob(os.path.join(tmp, "page-*.png")))
        if not pngs:
            sys.exit("error: no pages produced (empty PDF?)")

        singles: list[str] = []
        for i, png in enumerate(pngs, start=1):
            one = os.path.join(tmp, f"single-{i:03d}.pdf")
            run(["sips", "-s", "format", "pdf", png, "--out", one])
            singles.append(one)

        # 2) Merge single-page PDFs
        run(
            [
                gs,
                "-dSAFER",
                "-dBATCH",
                "-dNOPAUSE",
                "-dNOPROMPT",
                "-sDEVICE=pdfwrite",
                "-dCompatibilityLevel=1.4",
                f"-sOutputFile={dst}",
                *singles,
            ]
        )

    print(dst)


if __name__ == "__main__":
    main()
