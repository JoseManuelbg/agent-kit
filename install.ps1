<#
.SYNOPSIS
  Instala agent-kit en Claude Code (Windows).

.DESCRIPTION
  Modo por defecto (Link): crea junctions de skills/, agents/ y commands/ del repo
  dentro de ~/.claude/. Editas en el repo y el cambio es inmediato.
  Modo Copy: copia los archivos (robocopy /MIR). Útil si los enlaces dan problemas.
  Las reglas (rules/*.md) se importan en ~/.claude/CLAUDE.md con líneas "@ruta".

.EXAMPLE
  .\install.ps1              # enlaza (junctions)
  .\install.ps1 -Copy        # copia en vez de enlazar
  .\install.ps1 -Uninstall   # quita enlaces/copias e imports
#>
param(
  [switch]$Copy,
  [switch]$Uninstall,
  [ValidateSet('claude')] [string]$Target = 'claude'
)

$ErrorActionPreference = 'Stop'
$Root = $PSScriptRoot
$ClaudeDir = Join-Path $HOME '.claude'
$ClaudeMd = Join-Path $ClaudeDir 'CLAUDE.md'
$Dirs = @('skills', 'agents', 'commands')

function Is-Junction($path) {
  if (-not (Test-Path $path)) { return $false }
  $item = Get-Item $path -Force
  return [bool]($item.Attributes -band [IO.FileAttributes]::ReparsePoint)
}

if (-not (Test-Path $ClaudeDir)) { New-Item -ItemType Directory $ClaudeDir | Out-Null }

# ---------- Uninstall ----------
if ($Uninstall) {
  foreach ($d in $Dirs) {
    $dest = Join-Path $ClaudeDir $d
    if (Is-Junction $dest) {
      cmd /c rmdir "$dest" | Out-Null
      Write-Host "Quitado enlace $dest"
    } elseif (Test-Path (Join-Path $dest '.agent-kit-copy')) {
      Remove-Item -Recurse -Force $dest
      Write-Host "Quitada copia $dest"
    }
  }
  if (Test-Path $ClaudeMd) {
    $lines = Get-Content $ClaudeMd | Where-Object { $_ -notmatch [regex]::Escape($Root) }
    Set-Content -Encoding utf8 $ClaudeMd $lines
    Write-Host "Quitados imports de reglas en $ClaudeMd"
  }
  Write-Host "agent-kit desinstalado."
  exit 0
}

# ---------- Install skills / agents / commands ----------
foreach ($d in $Dirs) {
  $src = Join-Path $Root $d
  $dest = Join-Path $ClaudeDir $d

  if ((Test-Path $dest) -and -not (Is-Junction $dest)) {
    $isOurCopy = Test-Path (Join-Path $dest '.agent-kit-copy')
    $hasContent = @(Get-ChildItem $dest -Force -ErrorAction SilentlyContinue).Count -gt 0
    if ($hasContent -and -not $isOurCopy) {
      $bak = "$dest.bak-$(Get-Date -Format yyyyMMdd-HHmmss)"
      Rename-Item $dest $bak
      Write-Warning "$dest tenía contenido ajeno: movido a $bak. Fusiónalo en el repo a mano."
    } else {
      Remove-Item -Recurse -Force $dest
    }
  }

  if ($Copy) {
    if (Is-Junction $dest) { cmd /c rmdir "$dest" | Out-Null }
    robocopy $src $dest /MIR /NFL /NDL /NJH /NJS | Out-Null
    New-Item -ItemType File (Join-Path $dest '.agent-kit-copy') -Force | Out-Null
    Write-Host "Copiado  $d -> $dest"
  } else {
    if (-not (Is-Junction $dest)) {
      cmd /c mklink /J "$dest" "$src" | Out-Null
    }
    Write-Host "Enlazado $d -> $dest"
  }
}

# ---------- Rules -> ~/.claude/CLAUDE.md ----------
$ruleFiles = Get-ChildItem (Join-Path $Root 'rules') -Filter *.md
$existing = @()
if (Test-Path $ClaudeMd) { $existing = Get-Content $ClaudeMd }
$added = 0
foreach ($r in $ruleFiles) {
  $line = "@$($r.FullName)"
  if ($existing -notcontains $line) {
    Add-Content -Encoding utf8 $ClaudeMd $line
    $added++
  }
}
Write-Host "Reglas: $($ruleFiles.Count) archivo(s), $added import(s) nuevo(s) en $ClaudeMd"

Write-Host ""
Write-Host "Listo. Abre una sesión nueva de Claude Code y prueba /lanzamiento."
