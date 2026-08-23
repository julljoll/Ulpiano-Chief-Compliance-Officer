# Regla: Design System Local — Modo Light Exclusivo

## Alcance
Esta regla aplica a **todos los archivos** generados o modificados en este proyecto:
`c:\VS CODE\Ulpiano-Chief-Compliance-Officer`

Incluye sin excepción: archivos CSS, HTML, JavaScript, SVG, componentes, plantillas, dashboards, y cualquier otro recurso visual.

---

## ❌ Prohibiciones absolutas

1. **NO usar modo dark** — Está prohibido implementar, agregar o referenciar:
   - `prefers-color-scheme: dark` en cualquier archivo CSS o `<style>`
   - Bloques `@media (prefers-color-scheme: dark) { ... }`
   - Clases, atributos o variables CSS con nombre `dark`, `dark-mode`, `night`, `theme-dark` o equivalentes
   - `data-theme="dark"`, `class="dark"` o cualquier selector de tema oscuro
   - Fondos negros (`#000`, `#111`, `#1a1a1a`) o grises muy oscuros usados como fondo de página principal

2. **NO inventar colores fuera del design system** — Está prohibido usar:
   - Colores hexadecimales, RGB o HSL que no estén definidos en `design-system/tokens.css`
   - Clases de utilidad de frameworks externos no autorizados (Tailwind, Bootstrap, Material)
   - Variables CSS con nombre genérico (`--color-primary`, `--bg`, `--text`) que no sean del sistema local

3. **NO crear SVGs con colores hardcoded fuera de la paleta** — Todo SVG debe usar exclusivamente los valores de color del sistema.

---

## ✅ Obligaciones: Design System Local

### Fuente de verdad
El design system canónico de este proyecto está en:
- **CSS:** `design-system/tokens.css`
- **JSON:** `design-system/tokens.json`
- **Documentación:** `design-system/README.md`

Basado en **USWDS 3.x (U.S. Web Design System)**, cumple **Section 508 / WCAG 2.1 AAA**.

---

### Paleta de color permitida (modo light solamente)

| Familia      | Tokens disponibles                                                    |
|--------------|-----------------------------------------------------------------------|
| Azul         | `--usa-color-blue-5` a `--usa-color-blue-90`                         |
| Gris frío    | `--usa-color-gray-cool-1` a `--usa-color-gray-cool-90`               |
| Dorado/Ámbar | `--usa-color-gold-5` a `--usa-color-gold-70`                         |
| Rojo         | `--usa-color-red-5` a `--usa-color-red-70`                           |
| Verde        | `--usa-color-green-5` a `--usa-color-green-70`                       |
| Blanco puro  | `#ffffff` solo como `--theme-color-base-lightest` / `--theme-color-ink-inverse` |

### Tokens semánticos obligatorios

| Rol                       | Token a usar                       | Valor resuelto  |
|---------------------------|------------------------------------|-----------------|
| Fondo de página           | `--theme-color-base-lightest`      | `#ffffff`        |
| Fondo de sección suave    | `--theme-color-base-lighter`       | `gray-cool-5`    |
| Fondo de componente       | `--theme-color-base-light`         | `gray-cool-10`   |
| Texto principal           | `--theme-color-ink`                | `gray-cool-90`   |
| Texto sobre fondo oscuro  | `--theme-color-ink-inverse`        | `#ffffff`        |
| Color primario            | `--theme-color-primary`            | `blue-60`        |
| Color primario oscuro     | `--theme-color-primary-dark`       | `blue-70`        |
| Color secundario / alerta | `--theme-color-secondary`          | `gold-40`        |
| Éxito / Verificado        | `--theme-color-success`            | `green-40`       |
| Advertencia               | `--theme-color-warning`            | `gold-30`        |
| Error / Vulnerabilidad    | `--theme-color-error`              | `red-50`         |
| Emergencia / Incidente    | `--theme-color-emergency`          | `red-60`         |

### Tipografía obligatoria

| Tipo de texto              | Token de fuente  |
|----------------------------|------------------|
| UI, datos, botones         | `--font-sans`    |
| Textos jurídicos, artículos| `--font-serif`   |
| Hashes, logs, código       | `--font-mono`    |

### Espaciado y radios obligatorios

- Espaciado: `--space-05`, `--space-1`, `--space-15`, `--space-2`, `--space-25`, `--space-3`, `--space-4`, `--space-5`, `--space-6`, `--space-8`, `--space-10`
- Radios: `--radius-none`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-pill`
- Sombras: `--shadow-1` a `--shadow-5`

---

## 📐 Reglas específicas para archivos SVG e Iconografía

Todo SVG generado o modificado en este proyecto DEBE:

1. **Uso exclusivo de Google Material Design Icons:**
   - ❌ **ESTRICTAMENTE PROHIBIDO el uso de emojis** (como ⚖️, 🛡️, 🎲, 🔐, 🤖, 💡, ⭐, etc.) en SVGs o componentes visuales.
   - ✅ **OBLIGATORIO usar iconos vectoriales de Google Material Design** (Material Symbols / Material Icons), ya sea mediante trazados vectoriales `<path>` oficiales de Material Design o mediante `<text class="material-symbols-outlined">`.
2. Usar únicamente colores de la paleta USWDS (valores hexadecimales resueltos aceptados si corresponden a un token).
3. Incluir en el SVG comentarios de trazabilidad al design system.
4. Usar fondo blanco (`fill="#ffffff"` o `fill="none"`) — nunca fondos oscuros como fondo principal.
5. No incluir bloques `<style>` con `prefers-color-scheme: dark`.
6. Verificar contraste WCAG AA (≥ 4.5:1) entre todos los elementos superpuestos.

### Colores hexadecimales resueltos permitidos en SVG

```
Azules:  #eff6fb  #d9e8f6  #aacdec  #73b3e7  #28a0e0  #0076d6  #1a5b8c  #004987  #162e51  #0b1b3d
Grises:  #fbfcfd  #f5f6f8  #e7e9ed  #cfd4dc  #a9b4c4  #8190a4  #5c6b7e  #45505f  #323a45  #21272d  #13171b
Dorados: #fef6e7  #fde4b6  #fac76f  #f3a534  #df7e00  #c05600  #8c3b00  #5d2700
Rojos:   #f9eded  #f3d1d1  #e79c9c  #d96565  #cd3a3a  #b50909  #8b0a03  #5c1111
Verdes:  #eaf4ec  #cde5d2  #98cca3  #53b069  #2e8540  #1b622b  #154721  #0d2b14
Blanco:  #ffffff
```

---

## 📄 Importación correcta del design system

```html
<!-- En cualquier archivo HTML del proyecto -->
<link rel="stylesheet" href="design-system/tokens.css">
```

```css
/* En cualquier archivo CSS del proyecto */
@import "./design-system/tokens.css";

/* ✅ USO CORRECTO */
.mi-componente {
  background-color: var(--theme-color-base-lighter);
  color: var(--theme-color-ink);
  border: 1px solid var(--theme-color-base-light);
  border-radius: var(--radius-md);
  padding: var(--space-2);
  box-shadow: var(--shadow-2);
}

/* ❌ USO INCORRECTO — PROHIBIDO */
.mi-componente {
  background-color: #1a1a1a;   /* color oscuro no del sistema */
  color: white;                 /* sin token */
  padding: 12px;                /* sin token de espaciado */
}
```

---

## 🔎 Lista de verificación antes de entregar cualquier archivo visual

- [ ] No existe `prefers-color-scheme: dark` en ninguna parte del archivo
- [ ] Todos los fondos son claros: blancos, grises claros (`gray-cool-1` a `gray-cool-20`) o azules muy claros (`blue-5`, `blue-10`)
- [ ] Todos los colores de texto cumplen contraste ≥ 4.5:1 sobre su fondo (WCAG AA)
- [ ] No se usan valores de color fuera de la paleta del design system
- [ ] El archivo importa o referencia correctamente `design-system/tokens.css`
- [ ] Los SVGs tienen comentarios de trazabilidad a tokens del sistema
