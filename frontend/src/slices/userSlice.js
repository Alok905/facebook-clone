import Cookies from "js-cookie";

const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  reducers: {
    LOGIN(state, action) {
      return action.payload;
    },
  },
});
const userReducer = userSlice.reducer;
export default userReducer;
export const { LOGIN } = userSlice.actions;
