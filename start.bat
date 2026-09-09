@echo off
cd /d "%~dp0"

if not exist "python\python.exe" (
    echo [ERROR] python\python.exe not found. Please check the files.
    pause
    exit /b 1
)

if not exist "bin\yt-dlp.exe" (
    echo [ERROR] bin\yt-dlp.exe not found. Please check the files.
    pause
    exit /b 1
)

if not exist "downloads" mkdir downloads

python\python.exe app.py
pause
