import React, { useState } from "react";
import Modal from "react-modal";

import "../BaseStyles.scss";
import "./ResponseModal.scss";

Modal.setAppElement("#root");

export const ResponseModal = (props) => {
  const { isOpen, onClose, onSubmit } = props;
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onSubmit(text);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="ResponseModal">
        <h1 className="HeaderText">Put your response to the ticket here:</h1>
        <textarea
          className="TextField__GreenOutline"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="ResponseModal__buttons">
          <button onClick={onClose} className="Button__greenOutline">
            Cancel
          </button>
          <button onClick={handleSubmit} className="Button__green">
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ResponseModal;
