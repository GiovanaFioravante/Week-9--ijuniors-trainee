import { Request, Response, NextFunction } from 'express'
import { OrdensServicoService } from './ordens-servico.service'

const ordensServicoService = new OrdensServicoService()

export class OrdensServicoController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const ordens = await ordensServicoService.getAll()
      return res.status(200).json(ordens)
    } catch (err) {
      next(err)
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const ordem = await ordensServicoService.getById(Number(req.params.id))
      return res.status(200).json(ordem)
    } catch (err) {
      next(err)
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // req.user vem do authMiddleware — quem criou a ordem é sempre o usuário logado
      const criadoPorId = req.user!.id
      const ordem = await ordensServicoService.create({ ...req.body, criadoPorId })
      return res.status(201).json(ordem)
    } catch (err) {
      next(err)
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const ordem = await ordensServicoService.update(Number(req.params.id), req.body)
      return res.status(200).json(ordem)
    } catch (err) {
      next(err)
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await ordensServicoService.delete(Number(req.params.id))
      return res.status(204).send()
    } catch (err) {
      next(err)
    }
  }
}