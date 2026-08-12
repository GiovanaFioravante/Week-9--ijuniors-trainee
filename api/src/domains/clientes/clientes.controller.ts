import { Request, Response, NextFunction } from 'express'
import { ClientesService } from './clientes.service'

const clientesService = new ClientesService()

export class ClientesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const clientes = await clientesService.getAll()
      return res.status(200).json(clientes)
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const cliente = await clientesService.getById(Number(req.params.id))
      return res.status(200).json(cliente)
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const cliente = await clientesService.create(req.body)
      return res.status(201).json(cliente)
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const cliente = await clientesService.update(Number(req.params.id), req.body)
      return res.status(200).json(cliente)
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await clientesService.delete(Number(req.params.id))
      return res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}
