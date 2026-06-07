#!/usr/bin/env bash
set -euo pipefail

SIZE="${1:-small}"
DATABASE_NAME="${2:-web-experiment-db}"
LOCALE="${3:-ko}"

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SOURCE_REPO_DIR="/tmp/sql-tutorial"
VENV_DIR="$SOURCE_REPO_DIR/.venv"

DB_USER="$(grep '^DB_USER=' "$ROOT_DIR/apps/api/.env" | cut -d '=' -f2-)"
DB_PASSWORD="$(grep '^DB_PASSWORD=' "$ROOT_DIR/apps/api/.env" | cut -d '=' -f2-)"
DB_PORT="$(grep '^DB_PORT=' "$ROOT_DIR/apps/api/.env" | cut -d '=' -f2-)"
DB_HOST="$(grep '^DB_HOST=' "$ROOT_DIR/apps/api/.env" | cut -d '=' -f2-)"

if [[ -z "${DB_USER:-}" || -z "${DB_PASSWORD:-}" || -z "${DB_PORT:-}" || -z "${DB_HOST:-}" ]]; then
  echo "apps/api/.env 에서 DB 접속 정보를 읽지 못했습니다." >&2
  exit 1
fi

if [[ ! -d "$SOURCE_REPO_DIR/.git" ]]; then
  git clone --depth 1 https://github.com/civilian7/sql-tutorial.git "$SOURCE_REPO_DIR"
else
  git -C "$SOURCE_REPO_DIR" fetch --depth 1 origin main
  git -C "$SOURCE_REPO_DIR" reset --hard origin/main
fi

if [[ ! -x "$VENV_DIR/bin/python" ]]; then
  python3 -m venv "$VENV_DIR"
  "$VENV_DIR/bin/pip" install -r "$SOURCE_REPO_DIR/requirements.txt" psycopg2-binary
fi

docker exec web-experiment-db-1 psql -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS \"$DATABASE_NAME\" WITH (FORCE);" >/dev/null

cd "$SOURCE_REPO_DIR"
"$VENV_DIR/bin/python" -m src.cli.generate \
  --size "$SIZE" \
  --locale "$LOCALE" \
  --target postgresql \
  --apply \
  --host "$DB_HOST" \
  --port "$DB_PORT" \
  --user "$DB_USER" \
  --password "$DB_PASSWORD" \
  --database "$DATABASE_NAME"
