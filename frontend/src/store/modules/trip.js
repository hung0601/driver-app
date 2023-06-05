import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "trip",
  initialState: {
    start: null,
    end: null,
    route: null,
  },
  reducers: {
    initTrip: (state, action) => {
      console.log("ok");
      const { start, end, route } = action.payload;
      state.start = start;
      state.end = end;
      state.route = route;
    },
  },
});

// Action creators are generated for each case reducer function
export const { initTrip } = userSlice.actions;
export const selectTrip = (state) => state.trip;
export default userSlice.reducer;
