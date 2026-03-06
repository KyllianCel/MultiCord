import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'
import path from 'path'

// 1. Définition du chemin
const dbPath = path.resolve(process.cwd(), 'prisma', 'dev.db')

// 2. Création du client LibSQL
const libsql = createClient({
    url: `file:${dbPath}`
})

// 3. Création de l'adaptateur
const adapter = new PrismaLibSQL(libsql as any)

// 4. Création du PrismaClient
export const prisma = new PrismaClient({
    adapter: adapter as any
})
