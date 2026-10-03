# Usage: .\deploy.ps1           — builds and deploys both
#        .\deploy.ps1 -Service api    — builds and deploys api only
#        .\deploy.ps1 -Service client — builds and deploys client only
param(
    [ValidateSet("api", "client", "both")]
    [string]$Service = "both"
)

$ErrorActionPreference = "Stop"

$Registry  = "ghcr.io/mriekki"
$SshTarget = "datingapp-server"
$RemoteDir = "/opt/datingapp"

function Build-And-Push($svc) {
    Write-Host "`n==> Building $svc..." -ForegroundColor Cyan
    docker compose build $svc
    if ($LASTEXITCODE -ne 0) { throw "Build failed for $svc" }

    Write-Host "==> Pushing $svc..." -ForegroundColor Cyan
    docker tag "datingapp-$svc`:latest" "$Registry/datingapp-$svc`:latest"
    docker push "$Registry/datingapp-$svc`:latest"
    if ($LASTEXITCODE -ne 0) { throw "Push failed for $svc" }
}

$services = if ($Service -eq "both") { @("api", "client") } else { @($Service) }

foreach ($svc in $services) {
    Build-And-Push $svc
}

Write-Host "`n==> Deploying on Ubuntu..." -ForegroundColor Cyan
$pullList = $services -join " "
ssh $SshTarget "cd $RemoteDir && docker compose pull $pullList && docker compose up -d --force-recreate $pullList"
if ($LASTEXITCODE -ne 0) { throw "Remote deploy failed" }

Write-Host "`n==> Done. Running containers:" -ForegroundColor Green
ssh $SshTarget "cd $RemoteDir && docker compose ps"
