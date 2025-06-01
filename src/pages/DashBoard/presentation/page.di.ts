import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { AuthService } from "@/commons/network/AuthService";
import { DashBoardPageViewModel } from "./page.viewmodel";
import { DashBoardApiDatasource } from "../data/datasource/DashBoardApiDatasource";
import { GetAllUserUseCase } from "../domain/usecases/GetAllUserUseCase";
import { DashBoardRepositoryImpl } from "../data/repositoryImpl/DashBoardRepositoryImpl";
import { StorageService } from "@/commons/storage/StorageService";
import { UpdateUaserUseCase } from "../domain/usecases/UpdateUserUseCase";

export const useDashBoardPageViewModelDI = (): DashBoardPageViewModel => {
  const dispatch = useDispatch();

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
    const updateUserUseCase = new UpdateUaserUseCase(repository);
    const localBrowserStorage = new StorageService();

    return new DashBoardPageViewModel(
      dispatch,
      getAllSamplesUseCase,
      updateUserUseCase,
      localBrowserStorage
    );
  }, [dispatch]);
};
