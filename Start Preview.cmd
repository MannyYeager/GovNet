@echo off
setlocal
cd /d "%~dp0"
echo NITA Workspace - local preview
echo Open http://127.0.0.1:8000 after the server starts.
echo Keep this window open. Press Ctrl+C to stop.
echo.
py -3 -c "import http.server" >nul 2>&1
if not errorlevel 1 goto py
python -c "import http.server" >nul 2>&1
if not errorlevel 1 goto python
node --version >nul 2>&1
if not errorlevel 1 goto node
if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" goto bundled
echo Python or Node.js is required. Install either runtime, then run this file again.
pause
exit /b 1
:py
py -3 -m http.server 8000 --bind 127.0.0.1
goto stopped
:python
python -m http.server 8000 --bind 127.0.0.1
goto stopped
:node
node server.cjs
goto stopped
:bundled
"%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe" -m http.server 8000 --bind 127.0.0.1
:stopped
echo.
echo The server has stopped. Any error is shown above.
pause
