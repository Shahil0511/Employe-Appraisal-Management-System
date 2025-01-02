import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import appraisalReducer from "../features/appraisalSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    appraisal: appraisalReducer,
  },
});

export default store;
