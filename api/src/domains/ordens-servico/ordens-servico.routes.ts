import { Router } from 'express'
import { OrdensServicoController } from './ordens-servico.controller'
import { authMiddleware } from '../../middlewares/authMiddleware'

const ordensServicoRoutes = Router()
const ordensServicoController = new OrdensServicoController()

ordensServicoRoutes.use(authMiddleware)

ordensServicoRoutes.get('/', ordensServicoController.getAll.bind(ordensServicoController))
ordensServicoRoutes.get('/:id', ordensServicoController.getById.bind(ordensServicoController))
ordensServicoRoutes.post('/', ordensServicoController.create.bind(ordensServicoController))
ordensServicoRoutes.put('/:id', ordensServicoController.update.bind(ordensServicoController))
ordensServicoRoutes.delete('/:id', ordensServicoController.delete.bind(ordensServicoController))

export { ordensServicoRoutes }