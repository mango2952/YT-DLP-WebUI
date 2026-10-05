#!/usr/bin/env bash
set -e

# Change directory to the script's directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check for python3
if ! command -v python3 >/dev/null 2>&1; then
    echo "[ERROR] python3 is required but not installed or not in PATH." >&2
    echo "Please install Python 3.9 or higher." >&2
    exit 1
fi

# Require Python >= 3.9
if ! python3 -c 'import sys; sys.exit(0 if sys.version_info >= (3, 9) else 1)' 2>/dev/null; then
    PY_VER=$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}")' 2>/dev/null || echo "unknown")
    echo "[ERROR] Python 3.9 or higher is required. Found Python $PY_VER." >&2
    exit 1
fi

# Create virtual environment on first run and install dependencies
if [ ! -d ".venv" ] || [ ! -f ".venv/bin/python" ]; then
    echo "Creating virtual environment in .venv..."
    rm -rf .venv
    python3 -m venv .venv || {
        echo "[ERROR] Failed to create virtual environment (.venv)." >&2
        echo "Please ensure python3-venv is installed on your system." >&2
        exit 1
    }
    echo "Installing dependencies from requirements.txt..."
    .venv/bin/pip install --upgrade pip --quiet || true
    if [ -f "requirements.txt" ]; then
        .venv/bin/pip install -r requirements.txt || {
            echo "[ERROR] Failed to install dependencies from requirements.txt." >&2
            exit 1
        }
    else
        .venv/bin/pip install flask waitress || {
            echo "[ERROR] Failed to install dependencies." >&2
            exit 1
        }
    fi
fi

# Ensure necessary directories exist
mkdir -p downloads logs

# Print startup information
echo "Starting YT-DLP WebUI..."
echo "Web UI will be available at http://127.0.0.1:8080"

# Launch app.py using exec
. .venv/bin/activate
exec python app.py
