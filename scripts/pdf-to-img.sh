#!/usr/bin/env bash
set -euo pipefail

PDF_DIR="docs"
OUT_DIR="assets/imgs"
RESOLUTION=150  # DPI

mkdir -p "${OUT_DIR}"

# docs/*.pdf のすべての PDF を変換
for pdf in "${PDF_DIR}"/*.pdf; do
  base=$(basename "${pdf}" .pdf)
  echo "== Convert ${pdf} to images =="
  # 各ページを PNG に変換、ファイル名 base-1.png, base-2.png...
  pdftoppm -png -r "${RESOLUTION}" "${pdf}" "${OUT_DIR}/${base}"
done
