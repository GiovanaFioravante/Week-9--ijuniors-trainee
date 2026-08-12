import { Router } from 'express'
import { DispositivosController } from './dispositivos.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

const dispositivosRoutes = Router()
const dispositivosController = new DispositivosController()

dispositivosRoutes.use(authMiddleware)

dispositivosRoutes.get('/', dispositivosController.getAll.bind(dispositivosController))
dispositivosRoutes.get('/:id', dispositivosController.getById.bind(dispositivosController))
dispositivosRoutes.post('/', dispositivosController.create.bind(dispositivosController))
dispositivosRoutes.put('/:id', dispositivosController.update.bind(dispositivosController))
dispositivosRoutes.delete('/:id', dispositivosController.delete.bind(dispositivosController))

export { dispositivosRoutes }