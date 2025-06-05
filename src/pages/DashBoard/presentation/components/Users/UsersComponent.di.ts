import { useMemo } from "react";
import { useDispatch, useStore } from "react-redux";
import { UsersComponentViewModel } from "./UsersComponent.viewmodel";
import { UpdateUaserStatusUseCase } from "@/pages/DashBoard/domain/usecases/UpdateUserStatusUseCase";
import { DashBoardRepositoryImpl } from "@/pages/DashBoard/data/repositoryImpl/DashBoardRepositoryImpl";
import { StorageService } from "@/commons/storage/StorageService";
import { DashBoardApiDatasource } from "@/pages/DashBoard/data/datasource/DashBoardApiDatasource";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { AuthService } from "@/commons/network/AuthService";
import { UpdateUaserRoleUseCase } from "@/pages/DashBoard/domain/usecases/UpdateUserRoleUseCase";
import { DeleteUserUseCase } from "@/pages/DashBoard/domain/usecases/DeleteUserUseCase";
import type { RootState } from "@/app/store/store";

export const useUsersComponentViewModelDI = (): UsersComponentViewModel => {
  const dispatch = useDispatch();
  const store = useStore<RootState>();

  return useMemo(() => {
    const authService = new AuthService();
    const axiosClient = new AxiosClient(authService);
    const dataSource = new DashBoardApiDatasource(axiosClient);
    const localStorageService = new StorageService(true);
    const repository = new DashBoardRepositoryImpl(
      dataSource,
      localStorageService
    );
    const updateUserStatusUseCase = new UpdateUaserStatusUseCase(repository);
    const updateUserRoleUseCase = new UpdateUaserRoleUseCase(repository);
    const deleteUserUseCase = new DeleteUserUseCase(repository);

    return new UsersComponentViewModel(
      dispatch,
      () => store.getState(),
      updateUserStatusUseCase,
      updateUserRoleUseCase,
      deleteUserUseCase
    );
  }, [dispatch, store]);
};
