# ULPIANO CCO - Build Script (PowerShell 5.1+)
# Convierte los archivos .md a componentes HTML autonomos en components/docs/

$ErrorActionPreference = "Stop"
$workspaceDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $workspaceDir) { $workspaceDir = (Get-Location).Path }

Write-Host "===================================================="
Write-Host " ULPIANO CCO - Compilador de Componentes HTML "
Write-Host "===================================================="

$registryPath = Join-Path $workspaceDir "registry.json"
if (-not (Test-Path $registryPath)) {
    Write-Error "No se encontro registry.json en $workspaceDir"
    exit 1
}

$rawRegistry = [System.IO.File]::ReadAllText($registryPath, [System.Text.Encoding]::UTF8)
$registryJson = ConvertFrom-Json $rawRegistry

$componentsDocsDir = Join-Path $workspaceDir "components\docs"
if (-not (Test-Path $componentsDocsDir)) {
    [System.IO.Directory]::CreateDirectory($componentsDocsDir) | Out-Null
    Write-Host "Directorio creado: components\docs"
}

function Convert-MdToHtml {
    param([string]$md)

    $text = $md -replace "`r`n", "`n"

    $text = [regex]::Replace($text, '<span style="color:\s*red">([\s\S]*?)</span>', '<span class="reforma-rojo">$1</span>')
    $text = [regex]::Replace($text, '<span style="color:red">([\s\S]*?)</span>', '<span class="reforma-rojo">$1</span>')

    $text = [regex]::Replace($text, '(?m)^###### (.*)$', '<h6>$1</h6>')
    $text = [regex]::Replace($text, '(?m)^##### (.*)$', '<h5>$1</h5>')
    $text = [regex]::Replace($text, '(?m)^#### (.*)$', '<h4>$1</h4>')
    $text = [regex]::Replace($text, '(?m)^### (.*)$', '<h3>$1</h3>')
    $text = [regex]::Replace($text, '(?m)^## (.*)$', '<h2>$1</h2>')
    $text = [regex]::Replace($text, '(?m)^# (.*)$', '<h1>$1</h1>')

    $text = [regex]::Replace($text, '\*\*\*(.+?)\*\*\*', '<strong><em>$1</em></strong>')
    $text = [regex]::Replace($text, '\*\*(.+?)\*\*', '<strong>$1</strong>')
    $text = [regex]::Replace($text, '(?<!\*)\*([^\*\n]+?)\*(?!\*)', '<em>$1</em>')

    $text = [regex]::Replace($text, '(?m)^---+$', '<hr class="my-4">')

    $text = [regex]::Replace($text, '(?m)^\s*-\s+(.*)$', '<li>$1</li>')

    $blocks = $text -split "`n\s*`n"
    $resultList = @()

    foreach ($block in $blocks) {
        $b = $block.Trim()
        if ([string]::IsNullOrWhiteSpace($b)) { continue }

        if ($b -match '^<(h[1-6]|ul|ol|hr|div|table|blockquote|article|section|pre|p|figure|img)') {
            $resultList += $b
        } else {
            $b = $b -replace "`n", "<br>`n"
            $resultList += "<p>$b</p>"
        }
    }

    return ($resultList -join "`n`n")
}

foreach ($doc in $registryJson) {
    if (-not $doc.sourceFile) { continue }
    $sourcePath = Join-Path $workspaceDir $doc.sourceFile

    if (-not (Test-Path $sourcePath)) {
        Write-Warning "Archivo fuente no encontrado: $($doc.sourceFile)"
        continue
    }

    $rawMd = [System.IO.File]::ReadAllText($sourcePath, [System.Text.Encoding]::UTF8)
    $htmlBody = Convert-MdToHtml -md $rawMd

    $headerComment = "<!-- COMPONENTE DE DOCUMENTO: $($doc.id) | Generado desde: $($doc.sourceFile) -->"
    $componentHtml = "$headerComment`n<article class=""doc-component"" data-doc-id=""$($doc.id)"">`n$htmlBody`n</article>"

    $outRelative = $doc.file -replace "/", "\"
    $outPath = Join-Path $workspaceDir $outRelative
    
    $outFolder = Split-Path $outPath
    if (-not (Test-Path $outFolder)) {
        [System.IO.Directory]::CreateDirectory($outFolder) | Out-Null
    }

    [System.IO.File]::WriteAllText($outPath, $componentHtml, [System.Text.Encoding]::UTF8)
    Write-Host "Componente generado: $($doc.file) <- $($doc.sourceFile)"
}

Write-Host "Compilacion completada con exito."
