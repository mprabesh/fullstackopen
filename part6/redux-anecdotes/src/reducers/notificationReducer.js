import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "anecdoteNotification",
  initialState: "",
  reducers: {
    addNotification(state, action) {
      return action.payload;
    },
    removeNotificaton(state, action) {
      state = "";
      return state;
    },
  },
});

export const { addNotification, removeNotificaton } = notificationSlice.actions;
export default notificationSlice.reducer;
