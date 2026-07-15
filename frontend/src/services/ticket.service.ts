import type {
  CreateTicketPayload,
  Ticket,
  TicketFilters,
  TicketStatusTransitions,
  UpdateTicketPayload,
} from "../types/ticket.types";
import { apiClient } from "./api/client";

const TICKETS_BASE_PATH = "/tickets";

export const ticketApi = {
  getAll: async (filters?: TicketFilters): Promise<Ticket[]> => {
    const response = await apiClient.get<Ticket[]>(TICKETS_BASE_PATH, {
      params: filters,
    });

    return response.data;
  },

  getById: async (id: string): Promise<Ticket> => {
    const response = await apiClient.get<Ticket>(`${TICKETS_BASE_PATH}/${id}`);
    return response.data;
  },

  getStatusTransitions: async (
    id: string,
  ): Promise<TicketStatusTransitions> => {
    const response = await apiClient.get<TicketStatusTransitions>(
      `${TICKETS_BASE_PATH}/${id}/status-transitions`,
    );

    return response.data;
  },

  create: async (payload: CreateTicketPayload): Promise<Ticket> => {
    const response = await apiClient.post<Ticket>(TICKETS_BASE_PATH, payload);
    return response.data;
  },

  update: async (
    id: string,
    payload: UpdateTicketPayload,
  ): Promise<Ticket> => {
    const response = await apiClient.put<Ticket>(
      `${TICKETS_BASE_PATH}/${id}`,
      payload,
    );

    return response.data;
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`${TICKETS_BASE_PATH}/${id}`);
  },
};

export default ticketApi;
