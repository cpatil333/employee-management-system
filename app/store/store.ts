import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employee/employeeSlice";
import departmentReducer from "../features/department/departmentSlice";
import designationReducer from "../features/designation/designationSlice";
import uiReducer from "../features/uiSlice";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    ui: uiReducer,
    department: departmentReducer,
    designation: designationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
