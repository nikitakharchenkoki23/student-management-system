import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'students.json');

const adapter = new JSONFile(dbPath);
const db = new Low(adapter, { students: [] });

await db.read();

export default db;
