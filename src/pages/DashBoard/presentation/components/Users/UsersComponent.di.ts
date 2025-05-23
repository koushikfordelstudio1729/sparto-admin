import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { UsersComponentViewModel } from "./UsersComponent.viewmodel";

export const useUsersComponentViewModelDI = (): UsersComponentViewModel => {
  const dispatch = useDispatch();

  return useMemo(() => {
    return new UsersComponentViewModel(dispatch);
  }, [dispatch]);
};
