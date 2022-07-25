import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    usersGetDate(state, action) {
      console.log(action);
      return {
        ...state,
        users: action.payload,
      };
    },
    deteteUser(state, action) {
      console.log(action.payload.id);
      return {
        ...state,
        users: state.users.filter((cv) => cv.id !== action.id),
      };
    },
  },
});

export const { usersGetDate, deteteUser } = UserSlice.actions;

export default UserSlice.reducer;
