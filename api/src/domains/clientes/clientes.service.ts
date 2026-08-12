import { prisma } from '../../config/prismaClient'

interface ClienteInput {
  nome: string
  email: string
  telefone?: string
}

export class ClientesService {
  async getAll() {
    return prisma.cliente.findMany()
  }

  async getById(id: number) {
    return prisma.cliente.findUnique({ where: { id } })
  }

  async create(data: ClienteInput) {
    return prisma.cliente.create({ data })
  }

  async update(id: number, data: Partial<ClienteInput>) {
    return prisma.cliente.update({ where: { id }, data })
  }

  async delete(id: number) {
    return prisma.cliente.delete({ where: { id } })
  }
}
