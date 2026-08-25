# Sistema de Tokens de Diseno (USWDS 3.x)
### *Adaptado para el Ecosistema Judicial, Forense y de Cumplimiento (Ulpiano CCO)*

Este sistema de **Design Tokens** esta basado en la arquitectura oficial del **[U.S. Web Design System (USWDS)](https://github.com/uswds/uswds)**, adaptado para interfaces criticas de gobernanza digital, auditoria forense y cumplimiento legal.

---

## Archivos Disponibles

- [`tokens.json`](./tokens.json) -- Especificacion estandar W3C / Style Dictionary para Figma, librerias de componentes y generadores.
- [`tokens.css`](./tokens.css) -- Variables CSS (`:root`) listas para utilizar en aplicaciones web, paneles y dashboards judiciales.
- [`components.css`](./components.css) -- **[NUEVO]** Libreria de clases CSS utilitarias (Bootstrap + USWDS) para Cards, Alerts, Badges, Buttons, Tables, Material Symbols y utilidades de accesibilidad.

---

## Estructura de Tokens (Filosofia USWDS)

### 1. Paleta de Colores por Grados (`Grade System 5 - 90`)
USWDS utiliza una escala matematica de grados que garantiza la accesibilidad visual (**Section 508** y **WCAG 2.1 AAA**):

$$\Delta \text{Grado} \ge 50 \implies \text{Cumple WCAG AA (Contraste } 4.5:1\text{)}$$
$$\Delta \text{Grado} \ge 70 \implies \text{Cumple WCAG AAA (Contraste } 7:1\text{)}$$

*Ejemplo:* Un texto con `--usa-color-blue-80` sobre un fondo `--usa-color-blue-10` tiene una diferencia de grado de $70$ ($80 - 10 = 70$), garantizando contraste nivel AAA.

```
Grados:  [ 05 ] [ 10 ] [ 20 ] [ 30 ] [ 40 ] [ 50 ] [ 60 ] [ 70 ] [ 80 ] [ 90 ]
Tono:    Mas claro ──────────────────────────────────────────────> Mas oscuro
```

**Paletas disponibles:** Blue, Gray Cool, Gold, Red, Green, **Violet** (Forense), **Indigo** (Compliance).

---

### 2. Tokens Semanticos de Tema
Mapean los colores del sistema a roles funcionales en la interfaz:

| Token Semantico | Equivalente USWDS | Uso en el Sistema Judicial |
| :--- | :--- | :--- |
| `--theme-color-primary` | `blue-60` | Botones de accion procesal, barras principales |
| `--theme-color-secondary` | `gold-40` | Alertas de auditoria, llamadas de atencion |
| `--theme-color-accent-cool` | `blue-50` | Enlaces, elementos interactivos de apoyo |
| `--theme-color-success` | `green-40` | Validacion de firma digital, hash verificado |
| `--theme-color-warning` | `gold-30` | Alertas tempranas de retardo procesal (IA) |
| `--theme-color-error` | `red-50` | Ruptura de cadena de custodia, acceso no autorizado |
| `--theme-color-emergency` | `red-60` | Incidente critico de ciberseguridad / Ransomware |
| `--theme-color-forensic` | `violet-50` | **[NUEVO]** Capa de informatica forense y custodia digital |
| `--theme-color-compliance` | `indigo-50` | **[NUEVO]** Capa de cumplimiento (Compliance Officer) |

---

### 3. Iconografia Oficial: Google Material Design (Material Symbols)
- **Cero Emojis:** Todos los recursos graficos, diagramas SVG y paneles usan exclusivamente **Google Material Symbols (Outlined)**.
- **Tipografia de Iconos:**
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0');
  ```
- **Clases de tamano:** `.usa-icon--sm` (18px), `.usa-icon--md` (24px), `.usa-icon--lg` (32px), `.usa-icon--xl` (48px).

---

### 4. Componentes Estilo Bootstrap con Tokens USWDS (Light-Only)
Definidos en [`components.css`](./components.css):

| Clase | Descripcion |
| :--- | :--- |
| `.usa-card` / `.usa-card-header` / `.usa-card-body` | Tarjetas modulares con cabecera coloreada y sombras |
| `.usa-alert` / `.usa-alert--success/warning/error/forensic` | Bloques de alerta con barra lateral semantica |
| `.usa-badge` / `.usa-badge--pill` | Badges y pildoras de estado normativo |
| `.usa-button` / `.usa-button--secondary/outline/sm/lg` | Botones con focus ring accesible |
| `.usa-table` | Tabla con cabecera oscura y filas alternas |
| `.usa-sr-only` | Clase de accesibilidad para screen readers |

### 5. Escala Modular de Espaciado (Grid de 8px)
Incrementos armonicos basados en multiplos de `0.5rem` (8px):

```
--space-05 (4px)  ---> Micro-espaciado entre texto e icono
--space-1  (8px)  ---> Padding interno de badges y botones pequenos
--space-2  (16px) ---> Padding estandar de tarjetas (Cards)
--space-3  (24px) ---> Espaciado entre componentes dentro de una seccion
--space-4  (32px) ---> Margenes de resguardo foliar
--space-6  (48px) ---> Separacion entre macro-fases de flujo procesal
```

---

### 6. Tipografia Estandar
- **Sans-Serif:** `Public Sans`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto` (UI, dashboards, botones).
- **Serif:** `Merriweather`, `Georgia`, `Cambria` (Textos normativos, citas de leyes).
- **Monospace:** `Roboto Mono`, `Consolas`, `Monaco` (Hashes SHA3-512, firmas electronicas, logs).

---

### 7. [NUEVO] Accesibilidad y Motion Tokens
| Token | Valor | Proposito |
| :--- | :--- | :--- |
| `--focus-ring-width` | 3px | Ancho del anillo de foco (Section 508) |
| `--focus-ring-offset` | 2px | Separacion del anillo respecto al borde |
| `--focus-ring-color` | `blue-40` | Color del anillo de foco (fondos claros) |
| `--focus-ring-inverse-color` | `gold-20` | Color del anillo de foco (fondos oscuros) |
| `--transition-duration-fast` | 150ms | Transiciones rapidas (hover) |
| `--transition-duration-normal` | 250ms | Transiciones estandar |
| `--transition-easing` | cubic-bezier | Curva de animacion USWDS |

### 8. [NUEVO] Z-Index Scale
```
--z-index-base (0)       ---> Elementos normales
--z-index-dropdown (100) ---> Menus desplegables
--z-index-sticky (200)   ---> Elementos fijos al scroll (ToC)
--z-index-fixed (300)    ---> Barras de navegacion fijas
--z-index-modal (500)    ---> Modales y dialogos
--z-index-tooltip (700)  ---> Tooltips informativos
```

---

## Ejemplo de Uso en CSS / Web

```css
@import "./design-system/tokens.css";
@import "./design-system/components.css";

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
  color: var(--theme-color-forensic-dark);
  background-color: var(--theme-color-forensic-light);
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

---

## Skills de Agentes Especializados

El proyecto incluye 6 skills ubicados en `.agents/skills/`:

| Skill | Rol | Normativas |
| :--- | :--- | :--- |
| `arquitecto-ia` | Arquitecto de IA Judicial | ISO 42001, EU AI Act, NIST AI RMF |
| `informatico-forense` | Perito Forense Digital | ISO 27037/27042, NIST SP 800-86 |
| `abogado-informatico` | Abogado IT Juridico | CRBV, LMDyFE, Infogobierno, LPCDI |
| `disenador-ux-juridico` | UX/UI Legal y Accesibilidad | WCAG AAA, Section 508, USWDS 3.x |
| `experto-ciberseguridad` | Ciberdefensa Institucional | ISO 27001, NIST CSF 2.0, FISMA |
| `fullstack-nextjs` | Full-Stack Next.js Seguro | OWASP Top 10, TLS 1.3, HSM FIPS |
