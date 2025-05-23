import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { SettingsComponentViewModel } from "./SettingsComponent.viewmodel";

export const useSettingsComponentViewModelDI =
  (): SettingsComponentViewModel => {
    const dispatch = useDispatch();

    return useMemo(() => {
      return new SettingsComponentViewModel(dispatch);
    }, [dispatch]);
  };
