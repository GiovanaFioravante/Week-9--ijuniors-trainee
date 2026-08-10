export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  createdAt: string;
}

export type CreateClientData = Omit<Client, 'id' | 'createdAt'>;

export type ServiceOrderStatus = 'open' | 'in_progress' | 'done';

export interface ServiceOrder {
  id: number;
  clientId: number;
  device: string;
  issue: string;
  status: ServiceOrderStatus;
  createdAt: string;
}

export type CreateServiceOrderData = Omit<ServiceOrder, 'id' | 'createdAt'>;