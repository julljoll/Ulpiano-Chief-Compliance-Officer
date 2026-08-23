# 🎨 Sistema de Tokens de Diseño (USWDS 3.x)
### *Adaptado para el Ecosistema Judicial, Forense y de Cumplimiento (Ulpiano CCO)*

Este sistema de **Design Tokens** está basado en la arquitectura oficial del **[U.S. Web Design System (USWDS)](https://github.com/uswds/uswds)**, adaptado para interfaces críticas de gobernanza digital, auditoría forense y cumplimiento legal.

---

## 📁 Archivos Disponibles

- [`tokens.json`](./tokens.json) — Especificación estándar W3C / Style Dictionary para Figma, librerías de componentes y generadores.
- [`tokens.css`](./tokens.css) — Variables CSS (`:root`) listas para utilizar en aplicaciones web, paneles y dashboards judiciales.

---

## 🏛️ Estructura de Tokens (Filosofía USWDS)

### 1. 🌈 Paleta de Colores por Grados (`Grade System 5 - 90`)
USWDS utiliza una escala matemática de grados que garantiza la accesibilidad visual (**Section 508** y **WCAG 2.1 AAA**):

$$\Delta \text{Grado} \ge 50 \implies \text{Cumple WCAG AA (Contraste } 4.5:1\text{)}$$
$$\Delta \text{Grado} \ge 70 \implies \text{Cumple WCAG AAA (Contraste } 7:1\text{)}$$

*Ejemplo:* Un texto con `--usa-color-blue-80` sobre un fondo `--usa-color-blue-10` tiene una diferencia de grado de $70$ ($80 - 10 = 70$), garantizando contraste nivel AAA.

```
Grados:  [ 05 ] [ 10 ] [ 20 ] [ 30 ] [ 40 ] [ 50 ] [ 60 ] [ 70 ] [ 80 ] [ 90 ]
Tono:    Más claro ─────────────────────────────────────────────► Más oscuro
```

---

### 2. 🎭 Tokens Semánticos de Tema
Mapean los colores del sistema a roles funcionales en la interfaz:

| Token Semántico | Equivalente USWDS | Uso en el Sistema Judicial |
| :--- | :--- | :--- |
| `--theme-color-primary` | `blue-60` | Botones de acción procesal, barras principales |
| `--theme-color-secondary` | `gold-40` | Alertas de auditoría, llamadas de atención |
| `--theme-color-accent-cool` | `blue-50` | Enlaces, elementos interactivos de apoyo |
| `--theme-color-success` | `green-40` | Validación de firma digital, hash verificado |
| `--theme-color-warning` | `gold-30` | Alertas tempranas de retardo procesal (IA) |
| `--theme-color-error` | `red-50` | Ruptura de cadena de custodia, acceso no autorizado |
| `--theme-color-emergency` | `red-60` | Incidente crítico de ciberseguridad / Ransomware |

---

### 3. 📐 Escala Modular de Espaciado (Grid de 8px)
Incrementos armónicos basados en múltiplos de `0.5rem` (8px):

| Token | Rem | Píxeles | Uso recomendado |
| :--- | :--- | :--- | :--- |
| `--space-05` | `0.25rem` | 4px | Microespaciado, bordes internos de chips |
| `--space-1` | `0.5rem` | 8px | Padding compacto en tablas de expedientes |
| `--space-2` | `1.0rem` | 16px | Padding estándar de botones y campos |
| `--space-3` | `1.5rem` | 24px | Márgenes entre secciones de formularios |
| `--space-4` | `2.0rem` | 32px | Espaciado entre tarjetas de auditoría |
| `--space-6` | `3.0rem` | 48px | Separación de módulos principales |

---

### 4. 🔤 Tipografía y Jerarquía
- **Sans-serif (UI & Datos):** `Public Sans Web`, Segoe UI, Roboto.
- **Serif (Textos Jurídicos & Resoluciones):** `Merriweather Web`, Georgia.
- **Monospace (Hashes, Código, Logs Forenses):** `Roboto Mono`, Consolas.

---

## 💻 Ejemplo de Uso en CSS / Web

```css
@import "./design-system/tokens.css";

.tarjeta-expediente {
  background-color: var(--theme-color-base-lightest);
  border: 1px solid var(--theme-color-base-light);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  box-shadow: var(--shadow-2);
}

.hash-forense {
  font-family: var(--font-mono);
  font-size: var(--size-font-xs);
  color: var(--theme-color-primary-dark);
  background-color: var(--theme-color-accent-cool-light);
  padding: var(--space-05) var(--space-1);
  border-radius: var(--radius-sm);
}

.alerta-integridad {
  background-color: var(--theme-color-warning-light);
  border-left: 4px solid var(--theme-color-warning-dark);
  color: var(--theme-color-ink);
  padding: var(--space-2);
}
```
