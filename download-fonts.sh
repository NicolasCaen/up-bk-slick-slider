#!/bin/bash

# URLs des fichiers de police Slick
declare -A fonts=(
  ["slick.eot"]="https://raw.githubusercontent.com/kenwheeler/slick/master/slick/fonts/slick.eot"
  ["slick.woff"]="https://raw.githubusercontent.com/kenwheeler/slick/master/slick/fonts/slick.woff"
  ["slick.ttf"]="https://raw.githubusercontent.com/kenwheeler/slick/master/slick/fonts/slick.ttf"
  ["slick.svg"]="https://raw.githubusercontent.com/kenwheeler/slick/master/slick/fonts/slick.svg"
)

# Dossier de destination
FONT_DIR="assets/slick/fonts"

# Téléchargement des polices
for font in "${!fonts[@]}"; do
  curl -o "$FONT_DIR/$font" "${fonts[$font]}"
done
