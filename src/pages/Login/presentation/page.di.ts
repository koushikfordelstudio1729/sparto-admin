import { AuthService } from "@/commons/network/AuthService";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { StorageService } from "@/commons/storage/StorageService";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { LoginApiDatasource } from "../data/datasource/LoginApiDatasource";
import { LoginRepositoryImpl } from "../data/repositoryImpl/LoginRepositoryImpl";
import { LoginUserUseCase } from "../domain/usecases/LoginUserUseCase";
import { LoginPageViewModel } from "./page.viewmodel";

export const useLoginPageViewModel = (): LoginPageViewModel => {
  const dispatch = useDispatch();

  return useMemo(() => {
    const authService = new AuthService();

    const axiosClient = new AxiosClient(authService);

    const dataSource = new LoginApiDatasource(axiosClient);
    const localStorageService = new StorageService(true);
    const repository = new LoginRepositoryImpl(dataSource, localStorageService);

    const loginUserUseCase = new LoginUserUseCase(repository);

    return new LoginPageViewModel(dispatch, loginUserUseCase);
  }, [dispatch]);
};
