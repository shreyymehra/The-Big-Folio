# Minimal static file server (no Node/Python required) — preview only
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 4321
if ($env:PORT) { $port = [int]$env:PORT }
$listener = New-Object System.Net.Sockets.TcpListener ([System.Net.IPAddress]::Loopback, $port)
$listener.Start()
Write-Host "Serving $root at http://localhost:$port/"

$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".ico"  = "image/x-icon"
  ".woff2"= "font/woff2"
  ".txt"  = "text/plain; charset=utf-8"
}

while ($true) {
  $client = $listener.AcceptTcpClient()
  try {
    $stream = $client.GetStream()
    $reader = New-Object System.IO.StreamReader ($stream)
    $requestLine = $reader.ReadLine()
    while ($true) {
      $line = $reader.ReadLine()
      if ($null -eq $line -or $line -eq "") { break }
    }

    $status = "404 Not Found"
    $bytes = [System.Text.Encoding]::UTF8.GetBytes("not found")
    $ct = "text/plain"

    if ($requestLine -match '^GET\s+([^\s\?]+)') {
      $path = [System.Uri]::UnescapeDataString($Matches[1])
      if ($path -eq "/") { $path = "/index.html" }
      $rel = ($path -replace '/', '\').TrimStart('\')
      $file = Join-Path $root $rel
      $full = [System.IO.Path]::GetFullPath($file)
      if ($full.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase) -and (Test-Path $full -PathType Leaf)) {
        $bytes = [System.IO.File]::ReadAllBytes($full)
        $ext = [System.IO.Path]::GetExtension($full).ToLower()
        if ($mime.ContainsKey($ext)) { $ct = $mime[$ext] } else { $ct = "application/octet-stream" }
        $status = "200 OK"
      }
    }

    $header = "HTTP/1.1 $status`r`nContent-Type: $ct`r`nContent-Length: $($bytes.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
    $hb = [System.Text.Encoding]::ASCII.GetBytes($header)
    $stream.Write($hb, 0, $hb.Length)
    $stream.Write($bytes, 0, $bytes.Length)
    $stream.Flush()
  } catch {
    # ignore per-request errors; keep serving
  } finally {
    $client.Close()
  }
}
