import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { OrdersComponentViewModel } from "./OrdersComponent.viewmodel";
import { AuthService } from "@/commons/network/AuthService";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { DashBoardApiDatasource } from "@/pages/DashBoard/data/datasource/DashBoardApiDatasource";
// import { StorageService } from "@/commons/storage/StorageService";
import { DashBoardRepositoryImpl } from "./../../../data/repositoryImpl/DashBoardRepositoryImpl";
import { GetAllOrdersUseCase } from "@/pages/DashBoard/domain/usecases/GetAllOrdersUseCase";

export const useOrdersComponentViewModelDI = (): OrdersComponentViewModel => {
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

    const loginUserUseCase = new GetAllOrdersUseCase(repository);
    return new OrdersComponentViewModel(dispatch, loginUserUseCase);
  }, [dispatch]);
};
