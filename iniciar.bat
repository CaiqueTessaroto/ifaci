@echo off
color 0A
cls
echo.
echo ================================================================================
echo                    DASHBOARD IoT - STARTUP MANAGER
echo ================================================================================
echo.
echo Escolha uma opcao:
echo.
echo 1 - Iniciar API (Node.js)
echo 2 - Iniciar Frontend (Next.js)
echo 3 - Iniciar AMBOS (em janelas diferentes)
echo 4 - Abrir Dashboard no navegador
echo 5 - Sair
echo.
set /p choice="Digite sua escolha (1-5): "

if "%choice%"=="1" (
    echo.
    echo Iniciando API...
    cd api
    node server.js
    pause
) else if "%choice%"=="2" (
    echo.
    echo Iniciando Frontend...
    cd frontend\my-app
    npm run dev
    pause
) else if "%choice%"=="3" (
    echo.
    echo Iniciando API e Frontend...
    start cmd /k "cd api && node server.js"
    timeout /t 3
    start cmd /k "cd frontend\my-app && npm run dev"
    echo.
    echo Ambos os servicos foram iniciados em janelas separadas!
    echo API: http://localhost:8080
    echo Frontend: http://localhost:3000
    pause
) else if "%choice%"=="4" (
    echo.
    echo Abrindo Dashboard no navegador...
    start http://localhost:3000/dashboard
    pause
) else (
    echo.
    echo Encerrando...
    exit /b 0
)
