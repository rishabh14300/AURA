@echo off
cls
cd /d "%~dp0"
call npm install
if errorlevel 1 goto errorHandling
call npm run build
if errorlevel 1 goto errorHandling
pause
exit /b 0

:errorHandling
pause
exit /b 1
