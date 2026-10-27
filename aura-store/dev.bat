@echo off
cls
cd /d "%~dp0"
call npm install
if errorlevel 1 goto errorHandling
call npm run dev
if errorlevel 1 goto errorHandling
exit /b 0

:errorHandling
pause
exit /b 1
