import { getCities } from "@/app/services/citiesApi";
import { getCountry } from "@/app/services/countryApi";
import { getStates } from "@/app/services/stateApi";
import { City } from "@/app/types/city.types";
import { Country } from "@/app/types/country.types";
import { State } from "@/app/types/state.types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type LocationState = {
  countryList: Country[];
  stateList: State[];
  cityList: City[];
  loading: boolean;
  error: string | null;
};

const initialState: LocationState = {
  countryList: [],
  stateList: [],
  cityList: [],
  loading: false,
  error: null,
};

const fetchCountries = createAsyncThunk(
  "location/fetchCountries",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getCountry();
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
const fetchStatesByCountryId = createAsyncThunk(
  "location/fetchStatesByCountryId",
  async (countryId: number, { rejectWithValue }) => {
    try {
      const data = await getStates(countryId);
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

const fetchCitiesByStateId = createAsyncThunk(
  "location/fetchCitiesByStateId",
  async (stateId: number, { rejectWithValue }) => {
    try {
      const data = await getCities(stateId);
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

export const LocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers(addBuilder) {
    //for country
    addBuilder.addCase(fetchCountries.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.countryList = action.payload;
    });
    addBuilder.addCase(fetchCountries.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // fetch States
    addBuilder.addCase(fetchStatesByCountryId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchStatesByCountryId.fulfilled, (state, action) => {
      state.loading = false;
      state.stateList = action.payload;
    });
    addBuilder.addCase(fetchStatesByCountryId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    //fetchCitieByStateId
    addBuilder.addCase(fetchCitiesByStateId.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    addBuilder.addCase(fetchCitiesByStateId.fulfilled, (state, action) => {
      state.loading = false;
      state.cityList = action.payload;
    });
    addBuilder.addCase(fetchCitiesByStateId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const {} = LocationSlice.actions;
export { fetchCountries, fetchStatesByCountryId, fetchCitiesByStateId };
export default LocationSlice.reducer;
