/**
 * ULPIANO CCO — Astro 7 Sätteri HAST Build-Time Plugin
 * Runs exclusively during `astro build` (0 KB sent to browser):
 *  1. Normalizes `<span style="color:red">` to semantic `.reforma-rojo`
 *  2. Wraps every Markdown `<table>` in an accessible focusable USWDS container
 *  3. Assigns deterministic fragment IDs (`#articulo-10-bis`) to legislative articles for zero-JS deep links
 */

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

interface HastContext {
  setProperty(node: HastNode, name: string, value: unknown): void;
  textContent(node: HastNode): string;
}

export function createUlpianoHastPlugin() {
  return () => {
    const usedIds = new Set<string>();

    const uniqueId = (base: string): string => {
      let id = base;
      let counter = 2;
      while (usedIds.has(id)) {
        id = `${base}-${counter++}`;
      }
      usedIds.add(id);
      return id;
    };

    return {
      name: 'ulpiano-hast',
      raw(node: HastNode): HastNode | undefined {
        if (
          typeof node.value === 'string' &&
          /style=["']color:\s*red;?["']/i.test(node.value)
        ) {
          return {
            ...node,
            value: node.value.replace(
              /style=["']color:\s*red;?["']/gi,
              'class="reforma-rojo"'
            ),
          };
        }
        return undefined;
      },
      element: {
        filter: ['table', 'p'],
        visit(node: HastNode, ctx: HastContext): HastNode | undefined {
          if (node.tagName === 'table') {
            ctx.setProperty(node, 'className', ['usa-table', 'usa-table--striped']);
            return {
              type: 'element',
              tagName: 'div',
              properties: {
                className: ['usa-table-container--scrollable'],
                tabIndex: 0,
              },
              children: [node],
            };
          }

          if (node.tagName === 'p' && !node.properties?.id) {
            const text = ctx.textContent(node).replace(/<[^>]+>/g, '').trim();
            const artMatch = text.match(/^Art[íi]culo\s+(\d+(?:-bis)?)/i);
            if (artMatch) {
              ctx.setProperty(node, 'id', uniqueId(`articulo-${artMatch[1].toLowerCase()}`));
              return undefined;
            }
            const dispMatch = text.match(
              /^Disposici[óo]n\s+(Final|Transitoria|Derogatoria)\s+(\w+)/i
            );
            if (dispMatch) {
              const kind = dispMatch[1].toLowerCase();
              const ord = dispMatch[2]
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '');
              ctx.setProperty(node, 'id', uniqueId(`disposicion-${kind}-${ord}`));
            }
          }
          return undefined;
        },
      },
    };
  };
}
