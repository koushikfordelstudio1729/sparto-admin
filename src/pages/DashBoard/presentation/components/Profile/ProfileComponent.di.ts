import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { ProfileComponentViewModel } from "./ProfileComponent.viewmodel";

export const useProfileComponentViewModelDI = (): ProfileComponentViewModel => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return new ProfileComponentViewModel(dispatch);
  }, [dispatch]);
};
