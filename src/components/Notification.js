import "../styles/Notification.css";

const Notification = ({ showNotification }) => {
  return (
    <div className={`notification-container${showNotification ? " show" : ""}`}>
      <p>You have already enter this letter</p>
    </div>
  );
};

export default Notification;
