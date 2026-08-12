import { Request, Response, NextFunction } from 'express'
import { DispositivosService } from './dispositivos.service'

const dispositivosService = new DispositivosService()

export class DispositivosController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const dispositivos = await dispositivosService.getAll()
      return res.status(200).json(dispositivos)
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const dispositivo = await dispositivosService.getById(Number(req.params.id))
      return res.status(200).json(dispositivo)
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dispositivo = await dispositivosService.create(req.body)
      return res.status(201).json(dispositivo)
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const dispositivo = await dispositivosService.update(Number(req.params.id), req.body)
      return res.status(200).json(dispositivo)
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await dispositivosService.delete(Number(req.params.id))
      return res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}