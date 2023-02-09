const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "user",
  initialState: null,
  LOGIN(state, action) {
    return action.payload;
  },
});
const userReducer = userSlice.reducer;
export default userReducer;
export const { LOGIN } = userSlice.actions;
