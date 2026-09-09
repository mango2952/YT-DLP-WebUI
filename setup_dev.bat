@echo off
setlocal enabledelayedexpansion
title YT-DLP WebUI - Developer / Source Setup
cd /d "%~dp0"

echo ========================================================
echo   YT-DLP WebUI - Source Environment Setup
echo ========================================================
echo.

where python >nul 2>&1
if %errorlevel% neq 0 (
    if not exist "python\python.exe" (
        echo [ERROR] Python not found on system PATH.
        echo Please install Python 3.10+ or use the pre-built portable package.
        pause
        exit /b 1
    )
    set "PY_CMD=python\python.exe"
) else (
    set "PY_CMD=python"
)

echo [1/3] Installing Python dependencies...
%PY_CMD% -m pip install -r requirements.txt --quiet
if %errorlevel% neq 0 (
    echo [WARNING] pip install encountered an issue. Retrying...
    %PY_CMD% -m pip install flask waitress
)

if not exist "bin" mkdir "bin"
if not exist "downloads" mkdir "downloads"
if not exist "logs" mkdir "logs"
if not exist "config.json" copy "config.example.json" "config.json" > nul

echo [2/3] Checking yt-dlp...
if not exist "bin\yt-dlp.exe" (
    echo Downloading latest yt-dlp.exe from GitHub...
    powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe' -OutFile 'bin\yt-dlp.exe'"
)

echo [3/3] Checking ffmpeg...
if not exist "bin\ffmpeg.exe" (
    echo Downloading portable ffmpeg essentials...
    powershell -NoProfile -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip' -OutFile 'bin\ffmpeg.zip'; Expand-Archive -Path 'bin\ffmpeg.zip' -DestinationPath 'bin\tmp_ffmpeg' -Force; Get-ChildItem -Path 'bin\tmp_ffmpeg' -Recurse -Filter '*.exe' | ForEach-Object { Move-Item -Path $_.FullName -Destination 'bin\' -Force }; Remove-Item -Path 'bin\tmp_ffmpeg' -Recurse -Force; Remove-Item -Path 'bin\ffmpeg.zip' -Force"
)

echo.
echo ========================================================
echo   Setup completed successfully!
echo   Double-click start.bat to launch YT-DLP WebUI.
echo ========================================================
echo.
pause
