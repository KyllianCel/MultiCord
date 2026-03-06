import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import path from 'path'

// 1. On construit le chemin absolu de manière robuste
const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
const connectionUrl = `file:${dbPath}`

// 2. Log de contrôle
console.log(`[Database] Tentative de connexion sur : ${connectionUrl}`)

// 3. Création du client LibSQL
const libsql = createClient({
    url: connectionUrl
})

// 4. Création de l'adaptateur
const adapter = new PrismaLibSQL(libsql as any)

// 5. Exportation du client Prisma
export const prisma = new PrismaClient({
    adapter: adapter as any
})
