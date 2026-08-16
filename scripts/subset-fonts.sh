#!/usr/bin/env bash
# Пересборка WOFF2-шрифтов Montserrat из TTF-оригиналов (кириллица + латиница).
# Требования: pip install fonttools brotli
# Результат: app/fonts/Montserrat-*.woff2 (~32 КБ на начертание)
set -euo pipefail
cd "$(dirname "$0")/../app/fonts"

UNICODES="U+0020-007E,U+00A0,U+00A9,U+00AB,U+00BB,U+0400-045F,U+2010-2015,U+2018-2019,U+201C-201E,U+2022,U+2026,U+20AC,U+20BD,U+2116,U+2192,U+00D7,U+00B7"

for w in Regular Medium SemiBold Bold Black; do
  pyftsubset "Montserrat-$w.ttf" \
    --output-file="Montserrat-$w.woff2" \
    --flavor=woff2 \
    --layout-features='*' \
    --unicodes="$UNICODES"
  echo "Montserrat-$w.woff2 готов"
done
