@echo off
setlocal enabledelayedexpansion
title Pack YT-DLP WebUI Portable Release
cd /d "%~dp0"

echo ========================================================
echo   Packaging YT-DLP WebUI Portable Edition (.zip)
echo ========================================================
echo.

set "ZIP_NAME=YT-DLP-WebUI-Portable-Windows-x64.zip"
set "STAGE_DIR=dist_portable_staging\YT-DLP-WebUI"

if exist "dist_portable_staging" rd /s /q "dist_portable_staging"
if exist "%ZIP_NAME%" del /f /q "%ZIP_NAME%"

echo [1/4] Creating staging folder...
mkdir "%STAGE_DIR%"
mkdir "%STAGE_DIR%\bin"
mkdir "%STAGE_DIR%\downloads"
mkdir "%STAGE_DIR%\logs"

echo [2/4] Copying essential application files...
copy "app.py" "%STAGE_DIR%\" > nul
copy "start.bat" "%STAGE_DIR%\" > nul
copy "stop.bat" "%STAGE_DIR%\" > nul
copy "config.example.json" "%STAGE_DIR%\config.json" > nul
copy "README.md" "%STAGE_DIR%\" > nul
copy "LICENSE" "%STAGE_DIR%\" > nul
copy "requirements.txt" "%STAGE_DIR%\" > nul

echo [3/4] Copying static assets and templates...
xcopy "static" "%STAGE_DIR%\static" /E /I /Q /Y > nul
xcopy "templates" "%STAGE_DIR%\templates" /E /I /Q /Y > nul

if exist "python\python.exe" (
    echo Copying embedded Python environment...
    xcopy "python" "%STAGE_DIR%\python" /E /I /Q /Y > nul
) else (
    echo [WARNING] Embedded python directory not found.
)

if exist "bin\yt-dlp.exe" (
    echo Copying yt-dlp.exe...
    copy "bin\yt-dlp.exe" "%STAGE_DIR%\bin\" > nul
)
if exist "bin\ffmpeg.exe" (
    echo Copying ffmpeg.exe...
    copy "bin\ffmpeg.exe" "%STAGE_DIR%\bin\" > nul
)
if exist "bin\ffprobe.exe" (
    echo Copying ffprobe.exe...
    copy "bin\ffprobe.exe" "%STAGE_DIR%\bin\" > nul
)

echo [4/4] Compressing into %ZIP_NAME%...
powershell -NoProfile -Command "Compress-Archive -Path 'dist_portable_staging\*' -DestinationPath '%ZIP_NAME%' -Force"

rd /s /q "dist_portable_staging"

if exist "%ZIP_NAME%" (
    echo.
    echo ========================================================
    echo   SUCCESS! Package generated: %ZIP_NAME%
    echo   You can upload this .zip file directly to GitHub Releases!
    echo ========================================================
) else (
    echo [ERROR] Failed to generate zip file.
)

echo.
pause
