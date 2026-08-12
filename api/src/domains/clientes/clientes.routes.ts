import { Router } from 'express'
import { ClientesController } from './clientes.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

const clientesRoutes = Router()
const clientesController = new ClientesController()

// Tudo aqui exige cookie válido — replique esse padrão para dispositivos e ordens-servico
clientesRoutes.use(authMiddleware)

clientesRoutes.get('/', clientesController.getAll.bind(clientesController))
clientesRoutes.get('/:id', clientesController.getById.bind(clientesController))
clientesRoutes.post('/', clientesController.create.bind(clientesController))
clientesRoutes.put('/:id', clientesController.update.bind(clientesController))
clientesRoutes.delete('/:id', clientesController.delete.bind(clientesController))

export { clientesRoutes }
