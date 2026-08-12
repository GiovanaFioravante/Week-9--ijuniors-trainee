import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authRoutes } from '../domains/auth/auth.routes'
import { clientesRoutes } from '../domains/clientes/clientes.routes'
import { errorHandler } from '../middlewares/errorHandler'
import { dispositivosRoutes } from '../domains/dispositivos/dispositivos.routes'
import { ordensServicoRoutes } from '../domains/ordens-servico/ordens-servico.routes'

export function createApp() {
  const app = express()

  // origin precisa ser exata (não '*') porque credentials: true
  app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }))
  app.use(cookieParser())
  app.use(express.json())

  app.use('/auth', authRoutes)
  app.use('/clientes', clientesRoutes)
  app.use('/dispositivos', dispositivosRoutes)
  app.use('/ordens-servico', ordensServicoRoutes)
  app.use(errorHandler)

  return app
}
