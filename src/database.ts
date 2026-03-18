import 'dotenv/config'; 
import { PrismaClient } from './generated/client/index.js';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';
import path from 'path';

// On force le chemin vers le dossier prisma, peu importe le .env
// Garantit que le bot et Prisma utilisent le meme fichier.
const dbPath = path.resolve(process.cwd(), 'prisma', 'dev.db');

const libsql = createClient({ url: `file:${dbPath}` });
const adapter = new PrismaLibSQL(libsql as any);

const prisma = new PrismaClient({ adapter } as any);

export default prisma;