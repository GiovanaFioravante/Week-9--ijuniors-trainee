import { prisma } from '../../config/prismaClient'
import { ServiceOrderStatus } from '../../../generated/prisma/client'

interface ServiceOrderInput {
  device: string
  issue: string
  status?: ServiceOrderStatus
  clientId: number
  criadoPorId: number
}

export class ServiceOrdersService {
  async getAll() {
    return prisma.serviceOrder.findMany()
  }

  async getById(id: number) {
    return prisma.serviceOrder.findUnique({ where: { id } })
  }

  async create(data: ServiceOrderInput) {
    return prisma.serviceOrder.create({ data })
  }

  async update(id: number, data: Partial<ServiceOrderInput>) {
    return prisma.serviceOrder.update({ where: { id }, data })
  }

  async delete(id: number) {
    return prisma.serviceOrder.delete({ where: { id } })
  }
}