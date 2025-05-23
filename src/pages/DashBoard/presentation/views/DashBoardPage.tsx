import React, { useEffect } from "react";
import DashBoardComponent from "../components/DashBoardComponent/DashBoardComponent";
import { useDashBoardPageViewModelDI } from "../page.di";

const DashBoardPage: React.FC = () => {
  const viewModel = useDashBoardPageViewModelDI();

  useEffect(() => {
    viewModel.initialize();
  }, [viewModel]);

  return <DashBoardComponent />;
};

export default DashBoardPage;
