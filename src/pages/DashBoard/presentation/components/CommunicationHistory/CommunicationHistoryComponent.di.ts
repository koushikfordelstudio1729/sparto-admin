import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { CommunicationHistoryComponentViewModel } from "./CommunicationHistoryComponent.viewmodel";

export const useCommunicationHistoryComponentViewModelDI =
  (): CommunicationHistoryComponentViewModel => {
    const dispatch = useDispatch();

    return useMemo(() => {
      return new CommunicationHistoryComponentViewModel(dispatch);
    }, [dispatch]);
  };
