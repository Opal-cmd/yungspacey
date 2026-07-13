# Opens the surfaces where off-site links must point at https://yungspacey.com
#   powershell -File scripts/update-offsite-links.ps1
$Canonical = "https://yungspacey.com"
$IgEdit = "https://www.instagram.com/accounts/edit/"
$IgProfile = "https://instagram.com/yxngspacey"

Write-Host @"
Update these to $Canonical :

  • Instagram bio (@yxngspacey) — website field
  • Linktree / BeatStars / SoundBetter / email signature
  • Display name where allowed: yungspacey · Yung Spacey

Opening Instagram edit + profile...
"@

Start-Process $IgEdit
Start-Process $IgProfile
Start-Process $Canonical
