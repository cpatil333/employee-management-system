import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "../features/employee/employeeSlice";
import departmentReducer from "../features/department/departmentSlice";
import designationReducer from "../features/designation/designationSlice";
import locationReducer from "../features/location/locationSlice";
import uiReducer from "../features/uiSlice";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    ui: uiReducer,
    department: departmentReducer,
    designation: designationReducer,
    auth: authReducer,
    location: locationReducer,
    dashboard: dashboardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
