#!/bin/bash
# Собирает приложение в один файл index.html
cd "$(dirname "$0")"
{
  cat src/shell.html
  for f in a0 a1 a2 b1 b2 c1 a0x a1x a2x b1x b2x more grammar grammar_c1 texts_a texts_a2 texts_b1 texts_b2 texts_c1 verbs; do echo "<script>"; cat src/data/$f.js; echo "</script>"; done
  for f in pos app; do echo "<script>"; cat src/$f.js; echo "</script>"; done
} > index.html
