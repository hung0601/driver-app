import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "trip",
  initialState: {
    start: null,
    end: null,
    route: null,
    driver: null,
    type: 1,
  },
  reducers: {
    initTrip: (state, action) => {
      const { start, end, route } = action.payload;
      state.start = start;
      state.end = end;
      state.route = route;
    },
    setDriver: (state, action) => {
      state.driver = action.payload;
    },
    setDriverType: (state, action) => {
      state.type = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initTrip, setDriver, setDriverType } = userSlice.actions;
export const selectTrip = (state) => state.trip;
export default userSlice.reducer;
