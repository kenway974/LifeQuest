#!/usr/bin/env node
/**
 * Cross-platform wrapper around `supabase gen types typescript`.
 * - Reads SUPABASE_PROJECT_ID from .env.local (or process.env as fallback)
 * - Uses `npx -y supabase@latest` so the CLI doesn't need to be globally installed
 * - Writes the result to src/types/database.ts
 *
 * Run with: npm run db:types
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const envFile = resolve(root, '.env.local');
const outFile = resolve(root, 'src/types/database.ts');

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const text = readFileSync(path, 'utf8');
  const env = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const fileEnv = loadEnvFile(envFile);
const projectId = fileEnv.SUPABASE_PROJECT_ID ?? process.env.SUPABASE_PROJECT_ID;
const accessToken = fileEnv.SUPABASE_ACCESS_TOKEN ?? process.env.SUPABASE_ACCESS_TOKEN;

if (!projectId) {
  console.error('❌ SUPABASE_PROJECT_ID introuvable dans .env.local ni dans process.env.');
  console.error('   Ajoute la ligne dans .env.local : SUPABASE_PROJECT_ID=ton-project-ref');
  process.exit(1);
}

if (!accessToken) {
  console.error('❌ SUPABASE_ACCESS_TOKEN introuvable.');
  console.error('   1. Va sur https://supabase.com/dashboard/account/tokens');
  console.error('   2. Génère un token personnel (Personal Access Token)');
  console.error('   3. Ajoute-le dans .env.local : SUPABASE_ACCESS_TOKEN=sbp_...');
  process.exit(1);
}

console.log(`📡 Génération des types Supabase pour le projet "${projectId}" …`);
console.log('   (téléchargement éventuel du CLI via npx, peut prendre 10-30s la première fois)');

const isWindows = process.platform === 'win32';
// Strip any quote chars from the project id (it should be a slug, never contain them).
const safeProjectId = projectId.replace(/["'\s]/g, '');
const spawnEnv = { ...process.env, SUPABASE_ACCESS_TOKEN: accessToken };

let result;
if (isWindows) {
  // Single command string + shell:true avoids the [DEP0190] warning Node 20+ raises
  // when passing args alongside shell:true.
  const cmd = `npx -y supabase@latest gen types typescript --project-id ${safeProjectId}`;
  result = spawnSync(cmd, { encoding: 'utf8', shell: true, env: spawnEnv });
} else {
  result = spawnSync(
    'npx',
    ['-y', 'supabase@latest', 'gen', 'types', 'typescript', '--project-id', safeProjectId],
    { encoding: 'utf8', env: spawnEnv },
  );
}

if (result.error) {
  console.error('❌ Impossible de lancer npx :', result.error.message);
  process.exit(1);
}

if (result.status !== 0) {
  console.error('❌ Le CLI Supabase a échoué :');
  if (result.stderr) console.error(result.stderr);
  if (result.stdout) console.error(result.stdout);
  process.exit(result.status ?? 1);
}

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, result.stdout, 'utf8');
console.log(`✓ Types écrits dans ${outFile}`);
