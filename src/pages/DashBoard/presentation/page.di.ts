import { AuthService } from "@/commons/network/AuthService";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { StorageService } from "@/commons/storage/StorageService";
import { useMemo } from "react";
import { useDispatch, useStore } from "react-redux";
import { DashBoardApiDatasource } from "../data/datasource/DashBoardApiDatasource";
import { DashBoardRepositoryImpl } from "../data/repositoryImpl/DashBoardRepositoryImpl";
import { GetAllUserUseCase } from "../domain/usecases/GetAllUserUseCase";
import { DashBoardPageViewModel } from "./page.viewmodel";
import { UpdateUaserRoleUseCase } from "../domain/usecases/UpdateUserRoleUseCase";
import { UpdateUaserStatusUseCase } from "../domain/usecases/UpdateUserStatusUseCase";
import { UpdateUaserUseCase } from "../domain/usecases/UpdateUserUseCase";
import { DeleteUserUseCase } from "../domain/usecases/DeleteUserUseCase";
import type { RootState } from "@/app/store/store";

export const useDashBoardPageViewModelDI = (): DashBoardPageViewModel => {
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

    const getAllSamplesUseCase = new GetAllUserUseCase(repository);
    const localBrowserStorage = new StorageService();

    const deleteUserUseCase = new DeleteUserUseCase(repository);
    const updateUserUseCase = new UpdateUaserUseCase(repository);
    const updateUserStatusUseCase = new UpdateUaserStatusUseCase(repository);
    const updateUserRoleUseCase = new UpdateUaserRoleUseCase(repository);

    return new DashBoardPageViewModel(
      dispatch,
      store.getState,
      getAllSamplesUseCase,
      localBrowserStorage,
      updateUserUseCase,
      updateUserStatusUseCase,
      updateUserRoleUseCase,
      deleteUserUseCase
    );
  }, [dispatch, store.getState]);
};
