import { prisma } from '../../config/prismaClient'
import { StatusOrdem } from '../../../generated/prisma/client'

interface OrdemServicoInput {
  descricao: string
  status?: StatusOrdem
  valor?: number
  dispositivoId: number
  criadoPorId: number
}

export class OrdensServicoService {
  async getAll() {
    return prisma.ordemServico.findMany()
  }

  async getById(id: number) {
    return prisma.ordemServico.findUnique({ where: { id } })
  }

  async create(data: OrdemServicoInput) {
    return prisma.ordemServico.create({ data })
  }

  async update(id: number, data: Partial<OrdemServicoInput>) {
    return prisma.ordemServico.update({ where: { id }, data })
  }

  async delete(id: number) {
    return prisma.ordemServico.delete({ where: { id } })
  }
}