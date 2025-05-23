import React, { useEffect } from "react";
import LoginComponent from "../components/LoginComponent/LoginComponent";
import { useLoginPageViewModel } from "../page.di";

const LoginPage: React.FC = () => {
  const viewModel = useLoginPageViewModel();

  useEffect(() => {
    viewModel.initialize();
  }, [viewModel]);

  return (
    <>
      <LoginComponent />
    </>
  );
};

export default LoginPage;
