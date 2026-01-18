@echo off
setlocal enabledelayedexpansion

set "AGY_BIN=C:\Users\Shykan\AppData\Local\Programs\Antigravity\Antigravity.exe"
set "FILE=%~1"
set "LINE=%~2"
set "COLUMN=%~3"

if "%FILE%"=="" exit /b 0

set "TARGET=%FILE%"

REM Normalize backslashes to forward slashes for better compatibility with -g parsing
set "TARGET=!TARGET:\=/!"

if not "%LINE%"=="" (
  set "TARGET=!TARGET!:%LINE%"
  if not "%COLUMN%"=="" (
    set "TARGET=!TARGET!:%COLUMN%"
  )
)

"%AGY_BIN%" -g "!TARGET!"
endlocal
