import React, { useContext, useState } from "react";
import classnames from "classnames";
import { observer } from "mobx-react";
import { RootStoreContext } from "../../providers/RootProvider";
import { ResponseModal } from "../../layouts/ResponseModal";

import "./Ticket.scss";

export const Ticket = observer((props) => {
  const rootStore = useContext(RootStoreContext);
  const { ticketsStore } = rootStore;
  const { ticketInfo } = props;
  const { id, name, email, status, description, response } = ticketInfo;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const getTicketClassName = () => {
    return classnames("Ticket", {
      "Ticket--new": status === "new",
      "Ticket--in-progress": status === "in_progress",
      "Ticket--resolved": status === "resolved",
    });
  };

  const updateTicketStatus = async (status) => {
    const payload = {
      status,
    };
    await ticketsStore.updateTicket(id, payload);
  };

  const handleResponse = async (text) => {
    const payload = {
      response: text,
    };

    const response = await ticketsStore.updateTicket(id, payload);

    const { data } = response;

    if (data.response) {
      console.log(`Would normally send email here with body: ${data.response}`);
    }
  };

  return (
    <div className={getTicketClassName()} key={id}>
      <div className="Ticket__details">
        <h4>
          <b>Name:</b> {name}
        </h4>
        <h4>
          <b>Email:</b> {email}
        </h4>
        <h4>
          <b>Status:</b>
          <select
            name="status"
            id="status"
            className="Dropdown__GreenOutline"
            value={status}
            onChange={(e) => updateTicketStatus(e.target.value)}
          >
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </h4>
        <h4 className="Ticket__description">
          <b>Description:</b> {description}
        </h4>
        {response ? (
          <h4>
            <b>Response:</b> {response}
          </h4>
        ) : (
          <h4>
            <b>Response:</b>

            <button onClick={openModal} className="Button__green">
              Add a response
            </button>
            <ResponseModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onSubmit={handleResponse}
            />
          </h4>
        )}
      </div>
    </div>
  );
});

export default Ticket;
