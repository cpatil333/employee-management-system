import { getUserLogin } from "@/app/services/loginApi";
import { LoginType } from "@/app/types/logintypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type LoginState = {
  loginList: LoginType[] | null;
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
};
const initialState: LoginState = {
  loginList: [],
  email: "",
  password: "",
  loading: false,
  error: null,
};

const fetchLoginAsyc = createAsyncThunk(
  "login/fetchLoginAsyc",
  async (loginData: LoginType, { rejectWithValue }) => {
    try {
      const data = getUserLogin(loginData);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error);
      } else {
        return rejectWithValue("Something went wrong!");
      }
    }
  },
);

export const loginSlice = createSlice({
  name: "loign",
  initialState,
  reducers: {
    logout: (state) => {
      state.loginList = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers(addBuilder) {
    addBuilder.addCase(fetchLoginAsyc.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchLoginAsyc.fulfilled, (state, action) => {
      state.loading = false;
      state.loginList = action.payload;
    });
    addBuilder.addCase(fetchLoginAsyc.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = loginSlice.actions;
export { fetchLoginAsyc };
export default loginSlice.reducer;
