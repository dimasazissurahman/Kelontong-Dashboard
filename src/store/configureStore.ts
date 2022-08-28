import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

export function configureAppStore() {
  return configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
  });
}
