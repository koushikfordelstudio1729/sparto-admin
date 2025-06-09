import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { AuthService } from "@/commons/network/AuthService";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { DashBoardApiDatasource } from "@/pages/DashBoard/data/datasource/DashBoardApiDatasource";
import { DashBoardRepositoryImpl } from "@/pages/DashBoard/data/repositoryImpl/DashBoardRepositoryImpl";
import { GetRequestedOrdersUseCase } from "@/pages/DashBoard/domain/usecases/GetRequestedOrdersUseCase";

import { RequestOrdersComponentViewModel } from "./ReuestOrderComponent.viewmodel";
import type { AppDispatch } from "@/app/store/store";

export const useRequestOrdersComponentViewModelDI =
  (): RequestOrdersComponentViewModel => {
    const dispatch = useDispatch<AppDispatch>();

    return useMemo(() => {
      const authService = new AuthService();
      const axiosClient = new AxiosClient(authService);
      const dataSource = new DashBoardApiDatasource(axiosClient);
      const repository = new DashBoardRepositoryImpl(dataSource);
      const getRequestedOrdersUseCase = new GetRequestedOrdersUseCase(
        repository
      );

      return new RequestOrdersComponentViewModel(
        dispatch,
        getRequestedOrdersUseCase
      );
    }, [dispatch]);
  };
