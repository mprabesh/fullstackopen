import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      console.log(action.payload);
      return state.concat(action.payload);
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    ""
  );

  return (
    <NotificationContext.Provider value={[notification, dispatchNotification]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notification = useContext(NotificationContext);
  return notification[0];
};

export const useDispatchNotification = () => {
  const notifiaction = useContext(NotificationContext);
  return notifiaction[1];
};
