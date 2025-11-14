import { configureStore } from "@reduxjs/toolkit";
import peopleReducer from "./features/people/peopleSlice";
import loginReducer from "./features/login/login";

const store = configureStore({
  reducer: {
    people: peopleReducer,
    login: loginReducer,
  },
});

export { store };
