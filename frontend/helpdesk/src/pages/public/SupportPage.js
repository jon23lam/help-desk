import React, { useState, useContext } from "react";
import { RootStoreContext } from "../../providers/RootProvider";
import { formatErrors } from "../../utils/formatErrors";

import "./SupportPage.scss";
import "../../BaseStyles.scss";

export function SupportPage(props) {
  const rootStore = useContext(RootStoreContext);
  const { ticketsStore } = rootStore;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [errorText, setErrorText] = useState(null);
  const [successText, setSuccessText] = useState(null);

  async function handleSubmit() {
    try {
      const payload = {
        name,
        email,
        description,
      };

      await ticketsStore.postTicket(payload);
      setErrorText(null);
      setSuccessText(
        "Your response has been submitted. We will get back to you as soon as possible!"
      );
      setName("");
      setEmail("");
      setDescription("");
    } catch (err) {
      console.log(err);
      setErrorText(formatErrors(err.response.data));
      setSuccessText(null);
    }
  }

  return (
    <div className="PageContainer">
      <div className="Main">
        <h1 className="HeaderText">Help Desk</h1>
        <div className="SupportForm">
          <div className="SupportForm__item">
            <label htmlFor="ticket_name" className="label">
              Ticket Name:
            </label>
            <input
              type="text"
              id="ticket_name"
              name="ticket_name"
              className="TextField__GreenOutline"
              placeholder="Name of the problem"
              onChange={(event) => setName(event.target.value)}
              value={name}
              required
            />
          </div>
          <div className="SupportForm__item">
            <label htmlFor="email" className="label">
              Email:
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="TextField__GreenOutline"
              placeholder="example@email.com"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              required
            />
          </div>
          <div className="SupportForm__item">
            <label htmlFor="description" className="label">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="TextField__GreenOutline"
              placeholder="Please leave a detailed description of what you need help with."
              onChange={(event) => setDescription(event.target.value)}
              value={description}
              required
            />
          </div>
          <button className="Button__green" onClick={handleSubmit}>
            Submit
          </button>
          {errorText && (
            <div className="errorText">
              <h6
                className="show-red-text"
                dangerouslySetInnerHTML={{ __html: errorText }}
              ></h6>
            </div>
          )}
          {successText && (
            <div className="errorText">
              <h6 className="show-green-text">{successText}</h6>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
