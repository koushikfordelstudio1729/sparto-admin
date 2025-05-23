import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { DashBoardComponentViewModel } from "./DashBoardComponent.viewmodel";

export const useSampleComponentViewModelDI =
  (): DashBoardComponentViewModel => {
    const dispatch = useDispatch();

    return useMemo(() => {
      return new DashBoardComponentViewModel(dispatch);
    }, [dispatch]);
  };
