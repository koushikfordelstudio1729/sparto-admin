// src/pages/DashBoard/presentation/components/ConversationAndQuote/ConversationAndQuote.di.ts

import { useMemo } from "react";
import { useDispatch } from "react-redux";

import { AuthService } from "@/commons/network/AuthService";
import { AxiosClient } from "@/commons/network/AxiosClient";
import { DashBoardApiDatasource } from "@/pages/DashBoard/data/datasource/DashBoardApiDatasource";
import { DashBoardRepositoryImpl } from "@/pages/DashBoard/data/repositoryImpl/DashBoardRepositoryImpl";
import { ConversationAndQuoteViewModel } from "./ConversationAndQuote.viewmodel";
import type { AppDispatch } from "@/app/store/store";
import { GetClarificationsUseCase } from "@/pages/DashBoard/domain/usecases/GetClarificationsUseCase";
import { CreateClarificationUseCase } from "@/pages/DashBoard/domain/usecases/CreateClarificationUseCase";

export const useConversationAndQuoteDI = (): ConversationAndQuoteViewModel => {
  const dispatch = useDispatch<AppDispatch>();

  return useMemo(() => {
    const authService = new AuthService();
    const axiosClient = new AxiosClient(authService);
    const dataSource = new DashBoardApiDatasource(axiosClient);
    const repository = new DashBoardRepositoryImpl(dataSource);

    const getClarificationsUC = new GetClarificationsUseCase(repository);
    const createClarificationUC = new CreateClarificationUseCase(repository);

    return new ConversationAndQuoteViewModel(
      dispatch,
      getClarificationsUC,
      createClarificationUC
    );
  }, [dispatch]);
};
