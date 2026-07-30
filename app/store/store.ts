import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employee/employeeSlice";
import departmentReducer from "../features/department/departmentSlice";
import designationReducer from "../features/designation/designationSlice";
import uiReducer from "../features/uiSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    ui: uiReducer,
    department: departmentReducer,
    designation: designationReducer,
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
