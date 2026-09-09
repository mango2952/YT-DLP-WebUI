@echo off
echo Stopping YT-DLP WebUI...
for /f "tokens=2" %%p in ('tasklist /fi "imagename eq python.exe" /fo csv /nh 2^>nul') do (
    taskkill /pid %%~p /f > nul 2>&1
)
echo Done.
timeout /t 2 /nobreak > nul
