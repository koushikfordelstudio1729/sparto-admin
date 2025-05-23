import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { OrdersComponentViewModel } from "./OrdersComponent.viewmodel";

export const useOrdersComponentViewModelDI = (): OrdersComponentViewModel => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return new OrdersComponentViewModel(dispatch);
  }, [dispatch]);
};
