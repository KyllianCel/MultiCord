import 'dotenv/config'; 
import { PrismaClient } from './generated/client/index.js';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const url = process.env.DATABASE_URL || 'file:./dev.db';

const libsql = createClient({ url });
const adapter = new PrismaLibSQL(libsql as any);

// Initialisation standard (stable en v6)
const prisma = new PrismaClient({ adapter } as any);

export default prisma;