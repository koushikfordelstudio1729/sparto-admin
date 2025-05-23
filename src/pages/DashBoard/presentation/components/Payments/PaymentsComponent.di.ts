import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { PaymentsComponentViewModel } from "./PaymentsComponent.viewmodel";

export const usePaymentsComponentViewModelDI =
  (): PaymentsComponentViewModel => {
    const dispatch = useDispatch();

    return useMemo(() => {
      return new PaymentsComponentViewModel(dispatch);
    }, [dispatch]);
  };
