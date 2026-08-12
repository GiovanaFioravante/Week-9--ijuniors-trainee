import 'dotenv/config'
import { PrismaClient } from '../../generated/prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

// Singleton: evita abrir várias pools de conexão quando o tsx watch reinicia o server
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined
}

function createPrismaClient() {
  const adapter = new PrismaMariaDb(process.env.DATABASE_URL)
  return new PrismaClient({ adapter })
}

export const prisma = globalThis.__prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma
}
