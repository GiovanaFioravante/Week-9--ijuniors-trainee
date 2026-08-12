import { prisma } from '../../config/prismaClient'

interface ClientInput {
  name: string
  phone: string
  email: string
}

export class ClientsService {
  async getAll() {
    return prisma.client.findMany()
  }

  async getById(id: number) {
    return prisma.client.findUnique({ where: { id } })
  }

  async create(data: ClientInput) {
    return prisma.client.create({ data })
  }

  async update(id: number, data: Partial<ClientInput>) {
    return prisma.client.update({ where: { id }, data })
  }

  async delete(id: number) {
    return prisma.client.delete({ where: { id } })
  }
}