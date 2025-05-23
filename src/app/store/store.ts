import { configureStore } from "@reduxjs/toolkit";
import { dashBoardComponentReducer } from "@/pages/DashBoard/presentation/components/DashBoardComponent/DashBoardComponent.slice";
import { dashBoardPageReducer } from "@/pages/DashBoard/presentation/page.slice";
import { LoginPageReducer } from "@/pages/Login/presentation/page.slice";

export const store = configureStore({
  reducer: {
    dashBoardPage: dashBoardPageReducer,
    dashBoardComponentSlice: dashBoardComponentReducer,
    LoginPageReducer: LoginPageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
