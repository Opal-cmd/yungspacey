# After yungspacey.com is live: verify Search Console + ping sitemap.
#   powershell -File scripts/submit-indexing.ps1
$ErrorActionPreference = "Stop"
$Site = "https://yungspacey.com"
$Sitemap = "$Site/sitemap.xml"
$Robots = "$Site/robots.txt"

Write-Host "Checking canonical site is up..."
try {
  $home = Invoke-WebRequest -Uri $Site -UseBasicParsing -MaximumRedirection 5
  Write-Host "GET $Site → $($home.StatusCode)"
} catch {
  Write-Host "FAIL: $Site is not reachable. Buy/attach the domain and redeploy first."
  Write-Host $_
  exit 1
}

Write-Host "Checking sitemap..."
$sm = Invoke-WebRequest -Uri $Sitemap -UseBasicParsing
Write-Host "GET $Sitemap → $($sm.StatusCode)"
if ($sm.Content -notmatch "yungspacey\.com") {
  Write-Host "WARN: sitemap may still reference the old host. Redeploy after SITE_URL change."
}

Write-Host "Checking robots..."
$rb = Invoke-WebRequest -Uri $Robots -UseBasicParsing
Write-Host "GET $Robots → $($rb.StatusCode)"

Write-Host @"

Open Google Search Console and finish indexing:
  1. https://search.google.com/search-console
  2. Add property: URL prefix → $Site
  3. Verify (DNS for domain property, or HTML tag → set GOOGLE_SITE_VERIFICATION in Vercel env)
  4. Sitemaps → submit $Sitemap
  5. URL Inspection → $Site/ → Request indexing

Bing (optional): https://www.bing.com/webmasters
"@

Start-Process "https://search.google.com/search-console?resource_id=sc-domain%3Ayungspacey.com"
Start-Process "https://search.google.com/search-console/welcome"
