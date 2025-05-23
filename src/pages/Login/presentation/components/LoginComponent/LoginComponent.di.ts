// import { useMemo } from "react";
// import { useDispatch } from "react-redux";
// import { LoginComponentViewModel } from "./LoginComponent.viewmodel";
// import { LoginUserUseCase } from "@/pages/Login/domain/usecases/LoginUserUseCase";
// import { AuthService } from "@/commons/network/AuthService";
// import { AxiosClient } from "@/commons/network/AxiosClient";
// import { LoginApiDatasource } from "@/pages/Login/data/datasource/LoginApiDatasource";
// import { LoginRepositoryImpl } from "@/pages/Login/data/repositoryImpl/LoginRepositoryImpl";

// export const useLoginComponentViewModelDI = (): LoginComponentViewModel => {
//   const dispatch = useDispatch();
//   return useMemo(() => {
//     const authService = new AuthService();
//     const axiosClient = new AxiosClient(authService);
//     const loginApiDatasource = new LoginApiDatasource(axiosClient);
//     const repository = new LoginRepositoryImpl(loginApiDatasource);
//     const loginUserUseCase = new LoginUserUseCase(repository);
//     return new LoginComponentViewModel(dispatch, loginUserUseCase);
//   }, [dispatch]);
// };
