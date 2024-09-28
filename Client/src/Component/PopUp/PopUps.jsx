import PropTypes from "prop-types";
import {Alert} from "flowbite-react";

const Popup = ({message, type, onClose}) => {
  return (
    <Alert
      color={type}
      onDismiss={onClose}
      className="fixed bottom-4 right-4 z-50 bg-blue-900 text-white font-sans"
    >
      <span>{message}</span>
    </Alert>
  );
};

Popup.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "failure", "info", "warning"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
