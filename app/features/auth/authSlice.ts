import {
  getUserLogin,
  forgotPassword,
  resetPassword,
} from "@/app/services/authApi";
import { LoginType } from "@/app/types/authTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type ForgotPasswordResponse = {
  message: string;
  token: string;
};

type ResetPassordPayLoad = {
  token: string;
  password: string;
};
type LoginState = {
  user: LoginType[] | null;
  loading: boolean;
  error: string | null;
  password: string;
  message: string;
  token: string;
};
const initialState: LoginState = {
  user: [],
  loading: false,
  error: null,
  password: "",
  message: "",
  token: "",
};

const fetchLoginAsyc = createAsyncThunk(
  "login/fetchLoginAsyc",
  async (loginData: LoginType, { rejectWithValue }) => {
    try {
      const data = getUserLogin(loginData);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

const forgotPasswordAsync = createAsyncThunk(
  "login/forgotPasswordAsync",
  async (email: string, { rejectWithValue }) => {
    try {
      const data = await forgotPassword(email);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

const resetPasswordAsync = createAsyncThunk(
  "login/resetPasswordAsync",
  async ({ token, password }: ResetPassordPayLoad, { rejectWithValue }) => {
    try {
      const data = await resetPassword(token, password);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message ?? error.message);
      }
      return rejectWithValue("Something went wrong");
    }
  },
);

export const loginSlice = createSlice({
  name: "loign",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
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
      state.user = action.payload;
    });
    addBuilder.addCase(fetchLoginAsyc.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //forget password
    addBuilder.addCase(forgotPasswordAsync.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(forgotPasswordAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.token = action.payload.token;
    });
    addBuilder.addCase(forgotPasswordAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //resetPasswordAsync
    addBuilder.addCase(resetPasswordAsync.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(resetPasswordAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.password = action.payload.password;
      state.token = action.payload.token;
    });
    addBuilder.addCase(resetPasswordAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = loginSlice.actions;
export { fetchLoginAsyc, forgotPasswordAsync, resetPasswordAsync };
export default loginSlice.reducer;
