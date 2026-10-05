#!/usr/bin/env bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "Stopping YT-DLP WebUI..."

# Find PIDs running app.py
PIDS=$(pgrep -f "python.*app\.py" 2>/dev/null || true)
if [ -z "$PIDS" ]; then
    PIDS=$(ps aux 2>/dev/null | grep "[p]ython.*app\.py" | awk '{print $2}')
fi

FOUND=0
for PID in $PIDS; do
    if [ "$PID" != "$$" ]; then
        FOUND=1
        echo "Stopping process $PID..."
        kill "$PID" 2>/dev/null || true
    fi
done

if [ "$FOUND" -eq 1 ]; then
    sleep 1
    # Check if process is still alive and force kill if needed
    for PID in $PIDS; do
        if [ "$PID" != "$$" ] && kill -0 "$PID" 2>/dev/null; then
            echo "Force killing process $PID..."
            kill -9 "$PID" 2>/dev/null || true
        fi
    done
    echo "Done."
else
    echo "No running YT-DLP WebUI process found."
    echo "Done."
fi
