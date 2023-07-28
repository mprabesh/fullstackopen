const Notification = ({ notificationMessage }) => {
  return notificationMessage.message ? (
    <div
      className={
        notificationMessage.messageTypeError
          ? "redClassMessage"
          : "greenClassMessage"
      }
    >
      {notificationMessage.message}
    </div>
  ) : null;
};

export default Notification;
