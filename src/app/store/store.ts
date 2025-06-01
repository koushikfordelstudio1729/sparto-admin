import { configureStore } from "@reduxjs/toolkit";
import { dashBoardComponentReducer } from "@/pages/DashBoard/presentation/components/DashBoardComponent/DashBoardComponent.slice";
import { dashBoardPageReducer } from "@/pages/DashBoard/presentation/page.slice";
import { LoginPageReducer } from "@/pages/Login/presentation/page.slice";
import { OrdersComponentReducer } from "@/pages/DashBoard/presentation/components/Orders/OrdersComponent.slice";
import { usersComponentReducer } from "@/pages/DashBoard/presentation/components/Users/UsersComponent.slice";

export const store = configureStore({
  reducer: {
    dashBoardPageSlice: dashBoardPageReducer,
    dashBoardComponentSlice: dashBoardComponentReducer,
    LoginPageReducerSlice: LoginPageReducer,
    OrdersComponentslice: OrdersComponentReducer,
    usersComponentSlice: usersComponentReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: import.meta.env.MODE !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
