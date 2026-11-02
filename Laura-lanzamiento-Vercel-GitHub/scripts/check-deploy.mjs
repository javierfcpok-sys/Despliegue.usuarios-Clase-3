import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

// Validate the existing static output; do not regenerate or replace the app.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(await readFile(resolve(root, 'vercel.json'), 'utf8'));
assert.equal(config.framework, null, 'El proyecto usa Other, no un framework.');
assert.equal(config.outputDirectory, 'dist');
const output = resolve(root, config.outputDirectory);
const checked = new Set();

async function verify(file) {
  assert(!relative(output, file).startsWith('..'), 'Recurso fuera de dist.');
  if (checked.has(file)) return;
  checked.add(file);
  assert((await stat(file)).size > 0, `Recurso vacío: ${file}`);
  const text = await readFile(file, 'utf8');
  if (file.endsWith('.js')) {
    assert.equal(spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' }).status, 0);
    for (const match of text.matchAll(/\bfrom\s+['"](\.\.?\/[^'"]+)['"]/g)) {
      await verify(resolve(dirname(file), match[1]));
    }
  }
  if (file.endsWith('.html')) {
    for (const match of text.matchAll(/(?:src|href)="([^"#][^"]*)"/g)) {
      assert(!/^(?:https?:)?\/\//.test(match[1]), 'El demo no debe depender de recursos remotos.');
      await verify(resolve(dirname(file), match[1]));
    }
  }
}

await verify(resolve(output, 'index.html'));
console.log(`Despliegue estático verificado: ${checked.size} archivos en dist; sin compilación ni dependencias externas.`);
