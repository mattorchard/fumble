import { h } from "preact";
import { useToasts } from "../helpers/toast";
import "./ToastContainer.css";

const ToastMessage = ({ toast, onRequestDelete }) => {
  const handleAnimationEnd = event => {
    if (event.animationName === "toast-slide-in-out") {
      onRequestDelete();
    }
  };
  return (
    <div className="toast-message" onanimationend={handleAnimationEnd}>
      <button
        onClick={onRequestDelete}
        type="button"
        className="toast-message__dismiss"
      >
        &times;
      </button>
      <div className="toast-message__body">
        {toast.text ? toast.text : toast.render()}
      </div>
      <div className="toast-message__progress">
        <div className="toast-message__progress-filled" />
      </div>
    </div>
  );
};

const ToastContainer = () => {
  const [toasts, actions] = useToasts();

  return (
    <div className="toast-container">
      {Object.entries(toasts).map(([toastId, toast]) => (
        <ToastMessage
          key={toastId}
          toast={toast}
          onRequestDelete={() => actions.deleteToast(toastId)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
