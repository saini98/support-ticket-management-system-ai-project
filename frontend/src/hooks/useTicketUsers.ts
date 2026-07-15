import { useEffect, useState } from "react";

import { ticketApi } from "../services/ticket.service";
import type { UserSummary } from "../types/ticket.types";
import { mergeUsers, SEED_USERS } from "../utils/user.utils";

export const useTicketUsers = () => {
  const [users, setUsers] = useState<UserSummary[]>(SEED_USERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const tickets = await ticketApi.getAll();
        const ticketUsers: UserSummary[] = [];

        tickets.forEach((ticket) => {
          ticketUsers.push(ticket.creator);

          if (ticket.assignee) {
            ticketUsers.push(ticket.assignee);
          }
        });

        setUsers(mergeUsers(SEED_USERS, ticketUsers));
      } catch {
        setUsers(SEED_USERS);
      } finally {
        setLoading(false);
      }
    };

    void loadUsers();
  }, []);

  return { users, loading };
};
