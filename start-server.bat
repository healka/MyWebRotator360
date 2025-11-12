@echo off
echo Starting local web server...
echo.
echo Opening http://localhost:8000 in your browser...
echo Press Ctrl+C to stop the server
echo.

REM Try Python launcher (Windows)
py -m http.server 8000 2>nul
if %errorlevel% equ 0 goto :end

REM Try Python first
python -m http.server 8000 2>nul
if %errorlevel% equ 0 goto :end

REM Try Python 3
python3 -m http.server 8000 2>nul
if %errorlevel% equ 0 goto :end

REM Try Node.js http-server
where http-server >nul 2>&1
if %errorlevel% equ 0 (
    echo Using Node.js http-server...
    http-server -p 8000 -o
    goto :end
)

REM Try PowerShell HTTP server
echo Python not found. Using PowerShell HTTP server...
powershell -Command "$listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:8000/'); $listener.Start(); Write-Host 'Server running at http://localhost:8000/'; Write-Host 'Press Ctrl+C to stop'; while ($listener.IsListening) { $context = $listener.GetContext(); $response = $context.Response; $localPath = $context.Request.Url.LocalPath; if ($localPath -eq '/') { $localPath = '/index.html' }; $filePath = Join-Path $PWD ($localPath.TrimStart('/')); if (Test-Path $filePath) { $content = [System.IO.File]::ReadAllBytes($filePath); $response.ContentLength64 = $content.Length; $response.OutputStream.Write($content, 0, $content.Length) } else { $response.StatusCode = 404 }; $response.Close() }"

:end
pause

