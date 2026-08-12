import { prisma } from '../../config/prismaClient'

interface DispositivoInput {
  tipo: string
  marca: string
  modelo: string
  clienteId: number
}

export class DispositivosService {
  async getAll() {
    return prisma.dispositivo.findMany()
  }

  async getById(id: number) {
    return prisma.dispositivo.findUnique({ where: { id } })
  }

  async create(data: DispositivoInput) {
    return prisma.dispositivo.create({ data })
  }

  async update(id: number, data: Partial<DispositivoInput>) {
    return prisma.dispositivo.update({ where: { id }, data })
  }

  async delete(id: number) {
    return prisma.dispositivo.delete({ where: { id } })
  }
}