import { ModalProps } from "../interfaces/ModalProps";
import "../styles/Modal.css";

const Modal = ({ message, onClose }: ModalProps) => {
  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <p>{message}</p>
        <button onClick={onClose} className="closeBtn">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
