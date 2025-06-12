import { useMemo } from "react";
import { useDispatch, useStore } from "react-redux";

import { OrdersComponentViewModel } from "./OrdersComponent.viewmodel";

import { AuthService } from "@/commons/network/AuthService";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { DashBoardApiDatasource } from "@/pages/DashBoard/data/datasource/DashBoardApiDatasource";
import { DashBoardRepositoryImpl } from "@/pages/DashBoard/data/repositoryImpl/DashBoardRepositoryImpl";

import { GetAllOrdersUseCase } from "@/pages/DashBoard/domain/usecases/GetAllOrdersUseCase";
import { UpdateOrderStatusUseCase } from "@/pages/DashBoard/domain/usecases/UpdateOrderStatusUseCase";

import type { RootState } from "@/app/store/store";

export const useOrdersComponentViewModelDI = (): OrdersComponentViewModel => {
  const dispatch = useDispatch();
  const store = useStore<RootState>(); // ← gives us getState()

  return useMemo(() => {
    /* ─────── Infrastructure ─────── */
    const authService = new AuthService();
    const axiosClient = new AxiosClient(authService);
    const dataSource = new DashBoardApiDatasource(axiosClient);

    /* ─────── Repository ─────── */
    const repository = new DashBoardRepositoryImpl(dataSource);

    /* ─────── Use-cases ─────── */
    const getAllOrdersUseCase = new GetAllOrdersUseCase(repository);
    const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(repository);

    /* ─────── ViewModel ─────── */
    return new OrdersComponentViewModel(
      dispatch,
      () => store.getState(), // getState provider
      getAllOrdersUseCase,
      updateOrderStatusUseCase
    );
  }, [dispatch, store]);
};
