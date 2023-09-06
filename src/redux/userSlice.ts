import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IUserState = {
  loggedInUser: "",
  loggedInToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      state.loggedInUser = action.payload.loggedInUser;
      state.loggedInToken = action.payload.loggedInToken;
    },
    clearUser: (state) => {
      state.loggedInUser = "";
      state.loggedInToken = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
