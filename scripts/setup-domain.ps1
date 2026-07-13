# Buy yungspacey.com (if needed), attach to the Vercel project, set primary.
# Run from repo root (charges ~$11.25/yr when purchasing):
#   powershell -File scripts/setup-domain.ps1
$ErrorActionPreference = "Stop"
$Domain = "yungspacey.com"
$Project = "yungspacey"

Write-Host "Checking $Domain..."
$check = npx vercel domains check $Domain 2>&1 | Out-String
Write-Host $check

if ($check -match "is available") {
  Write-Host "Purchasing $Domain (~`$11.25/yr)..."
  npx vercel domains buy $Domain --yes
} elseif ($check -match "is not available|registered|owned") {
  Write-Host "Domain appears taken or already owned — attempting attach only."
} else {
  Write-Host "Unexpected check result — attempting attach (buy manually if attach fails)."
}

Write-Host "Adding $Domain to project $Project..."
npx vercel domains add $Domain $Project
Write-Host "Adding www.$Domain..."
npx vercel domains add "www.$Domain" $Project

Write-Host @"

Done. In Vercel Dashboard → Project → Settings → Domains:
  1. Set $Domain as Primary
  2. Redirect www.$Domain → $Domain
  3. Redirect yungspacey.vercel.app → https://$Domain

Then redeploy production and continue Search Console / IG bio steps.
"@
