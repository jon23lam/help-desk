import * as axiosRequests from "./axiosRequests";
import { endpoint } from "../utils/endpoint";

const TICKETS_ENDPOINT = endpoint(`api/tickets/`);

const UPDATE_TICKET_ENDPOINT = (ticketId) =>
  endpoint(`api/tickets/${ticketId}/`);

export async function postTicket(payload) {
  const response = await axiosRequests.axiosPostNoAuth(TICKETS_ENDPOINT, payload, {
    "Content-Type": "multipart/form-data",
  });

  return response;
}

export async function getTickets() {
  const response = await axiosRequests.axiosGet(TICKETS_ENDPOINT);

  return response;
}

export async function updateTicket(ticketId, payload) {
  try {
    const response = await axiosRequests.axiosPatch(
      UPDATE_TICKET_ENDPOINT(ticketId),
      payload,
      { "Content-Type": "multipart/form-data" }
    );

    return response;
  } catch (err) {
    return err.response;
  }
}
