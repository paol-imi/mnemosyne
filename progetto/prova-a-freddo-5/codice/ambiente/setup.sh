#!/usr/bin/env bash
# Prepara un clone pulito: le dipendenze (ajv, yaml) dal package-lock.json e l'identità git del bot.
set -euo pipefail
cd "$(dirname "$0")/.."
npm ci --no-audit --no-fund
git config user.name "memo"
git config user.email "memo@local"
