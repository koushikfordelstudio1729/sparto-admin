import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { PaymentsComponentViewModel } from "./PaymentsComponent.viewmodel";
import { AuthService } from "@/commons/network/AuthService";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { DashBoardApiDatasource } from "@/pages/DashBoard/data/datasource/DashBoardApiDatasource";
// import { StorageService } from "@/commons/storage/StorageService";
import { DashBoardRepositoryImpl } from "@/pages/DashBoard/data/repositoryImpl/DashBoardRepositoryImpl";
import { GetAllPaymentsUseCase } from "@/pages/DashBoard/domain/usecases/GetAllPaymentsUseCase";
import { UpdatePaymentStatusUseCase } from "@/pages/DashBoard/domain/usecases/UpdatePaymentStatusUseCase";

export const usePaymentsComponentViewModelDI =
  (): PaymentsComponentViewModel => {
    const dispatch = useDispatch();
    // const store = useStore<RootState>();
    return useMemo(() => {
      const authService = new AuthService();
      const axiosClient = new AxiosClient(authService);
      const dataSource = new DashBoardApiDatasource(axiosClient);
      // const localStorageService = new StorageService(true);
      const repository = new DashBoardRepositoryImpl(
        dataSource
        // localStorageService
      );
      const getAllPaymentsUseCase = new GetAllPaymentsUseCase(repository);
      const updatePaymentStatusUseCase = new UpdatePaymentStatusUseCase(
        repository
      );
      // return new PaymentsComponentViewModel(dispatch);
      return new PaymentsComponentViewModel(
        dispatch,
        getAllPaymentsUseCase,
        updatePaymentStatusUseCase
      );
    }, [dispatch]);
  };
