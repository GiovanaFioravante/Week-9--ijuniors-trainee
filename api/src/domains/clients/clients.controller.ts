import { Request, Response, NextFunction } from 'express'
import { ClientsService } from './clients.service'

const clientsService = new ClientsService()

export class ClientsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const clients = await clientsService.getAll()
      return res.status(200).json(clients)
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await clientsService.getById(Number(req.params.id))
      return res.status(200).json(client)
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await clientsService.create(req.body)
      return res.status(201).json(client)
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const client = await clientsService.update(Number(req.params.id), req.body)
      return res.status(200).json(client)
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await clientsService.delete(Number(req.params.id))
      return res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}