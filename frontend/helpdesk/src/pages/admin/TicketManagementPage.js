import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../providers/RootProvider";
import { Ticket } from "./Ticket";

import "./TicketManagementPage.scss";
import "../../BaseStyles.scss";

export const TicketManagementPage = observer(() => {
  const rootStore = useContext(RootStoreContext);
  const { ticketsStore } = rootStore;
  const { tickets, isLoading } = ticketsStore;

  useEffect(() => {
    const initialize = async () => {
      await ticketsStore.initializeTicketManagement();
    };
    initialize();
  }, [ticketsStore]);

  function renderTickets() {
    
    if (tickets.length == 0) {
      return (
        <div className="TicketManagementPage">
          <h2>There are no tickets at this time.</h2>
        </div>
      );
    }
    return tickets.map((ticket) => (
      <Ticket key={ticket.id} ticketInfo={ticket} />
    ));
  }

  return (
    <div className="PageContainer">
      <div className="Main">
        <h1 className="HeaderText">Admin Ticket Pannel</h1>
        <div className="TicketManagementPage">
          {renderTickets()}
        </div>
      </div>
    </div>
  );
});

export default TicketManagementPage;
