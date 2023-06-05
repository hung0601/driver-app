import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./modules/user";
import tripReducer from "./modules/trip";
export default configureStore({
  reducer: { counter: userReducer, trip: tripReducer },
});
