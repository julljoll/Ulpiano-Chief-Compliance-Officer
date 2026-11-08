import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function readLegacyPage(fileName) {
  const source = readFileSync(resolve(process.cwd(), fileName), 'utf8');
  const head = source.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1];
  const body = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1];

  if (!head || !body) {
    throw new Error(`The legacy page "${fileName}" has no complete head/body document.`);
  }

  return {
    head: head
      .replace(/<link\b[^>]*(?:viewer\.css|design-system\/[^"]+)[^>]*>\s*/gi, '')
      .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>\s*/gi, '')
      .replace(/<meta\b[^>]*property=["']og:url["'][^>]*>\s*/gi, '')
      .replace(/<meta\b[^>]*(?:charset|name=["']viewport["'])[^>]*>\s*/gi, '')
      .replace(/<title>[\s\S]*?<\/title>\s*/gi, ''),
    body: body.replace(/<script\b[^>]*src=["'][^"']*viewer\.js["'][^>]*><\/script>\s*/gi, '')
  };
}
