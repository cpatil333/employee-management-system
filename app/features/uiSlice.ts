import { createSlice } from "@reduxjs/toolkit";

type UIState = {
  activeMenu: "Dashboard" | "Employees" | "Departments" | "Designations";
};

const initialState: UIState = {
  activeMenu: "Dashboard",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveMenu(state, action) {
      state.activeMenu = action.payload;
    },
  },
});

export const { setActiveMenu } = uiSlice.actions;
export default uiSlice.reducer;
