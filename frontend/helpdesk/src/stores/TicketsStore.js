import { action, makeObservable, observable } from "mobx";
import * as ticketsService from "../requests/tickets";

export class TicketsStore {
  tickets = [];
  isLoading = false;
  nextPage = null;

  constructor() {
    makeObservable(this, {
      tickets: observable,
      isLoading: observable,
      nextPage: observable,
      setIsLoading: action,
      setTickets: action,
      setNextPage: action,
    });
  }

  setIsLoading = (isLoading) => {
    this.isLoading = isLoading;
  };

  setTickets = (tickets) => {
    this.tickets = tickets;
  };

  setNextPage = (nextPage) => {
    this.nextPage = nextPage;
  };

  extendPetList = (petList) => {
    this.petList = [...this.petList, ...petList];
  };

  postTicket = async (payload) => {
    this.setIsLoading(true);
    await ticketsService.postTicket(payload);

    this.setIsLoading(false);
  };

  initializeTicketManagement = async () => {
    this.setIsLoading(true);

    try {
      const response = await ticketsService.getTickets();

      this.setTickets(response.data);
    } catch (err) {
      console.log("failed to get tickets");
    }

    this.setIsLoading(false);
  };

  updateTicket = async (ticketId, payload) => {

    const response = await ticketsService.updateTicket(ticketId, payload);

    this.tickets = this.tickets.map((ticket) =>
      ticket.id === response.data.id ? response.data : ticket
    );

    return response;
  };
}

export default TicketsStore;
