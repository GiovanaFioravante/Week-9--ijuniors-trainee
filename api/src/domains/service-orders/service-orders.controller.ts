import { Request, Response, NextFunction } from 'express'
import { ServiceOrdersService } from './service-orders.service'

const serviceOrdersService = new ServiceOrdersService()

export class ServiceOrdersController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await serviceOrdersService.getAll()
      return res.status(200).json(orders)
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await serviceOrdersService.getById(Number(req.params.id))
      return res.status(200).json(order)
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // criadoPorId nunca vem do front — sempre o usuário autenticado
      const criadoPorId = req.user!.id
      const order = await serviceOrdersService.create({ ...req.body, criadoPorId })
      return res.status(201).json(order)
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await serviceOrdersService.update(Number(req.params.id), req.body)
      return res.status(200).json(order)
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await serviceOrdersService.delete(Number(req.params.id))
      return res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}