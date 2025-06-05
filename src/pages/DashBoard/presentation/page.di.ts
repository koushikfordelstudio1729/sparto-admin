import { AuthService } from "@/commons/network/AuthService";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { StorageService } from "@/commons/storage/StorageService";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { DashBoardApiDatasource } from "../data/datasource/DashBoardApiDatasource";
import { DashBoardRepositoryImpl } from "../data/repositoryImpl/DashBoardRepositoryImpl";
import { GetAllUserUseCase } from "../domain/usecases/GetAllUserUseCase";
import { DashBoardPageViewModel } from "./page.viewmodel";

export const useDashBoardPageViewModelDI = (): DashBoardPageViewModel => {
  const dispatch = useDispatch();

  return useMemo(() => {
    const authService = new AuthService();
    const axiosClient = new AxiosClient(authService);
    const dataSource = new DashBoardApiDatasource(axiosClient);

    // const localStorageService = new StorageService(true);
    const repository = new DashBoardRepositoryImpl(
      dataSource
      // localStorageService
    );

    const getAllSamplesUseCase = new GetAllUserUseCase(repository);
    const localBrowserStorage = new StorageService();

    return new DashBoardPageViewModel(
      dispatch,
      getAllSamplesUseCase,
      localBrowserStorage
    );
  }, [dispatch]);
};
