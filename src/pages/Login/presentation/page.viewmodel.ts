import type { AppDispatch } from "@/app/store/store";
import type { LoginUserUseCase } from "../domain/usecases/LoginUserUseCase";
import { setLoading } from "./page.slice";

export class LoginPageViewModel {
  private readonly dispatch: AppDispatch;

  private readonly loginUserUseCase: LoginUserUseCase;

  constructor(dispatch: AppDispatch, loginUserUseCase: LoginUserUseCase) {
    this.dispatch = dispatch;
    this.loginUserUseCase = loginUserUseCase;
  }

  async initialize(): Promise<void> {}

  async loginUser(phone: string, password: string): Promise<void> {
    try {
      this.dispatch(setLoading(true));
      await this.loginUserUseCase.execute(phone, password);
    } finally {
      this.dispatch(setLoading(false));
    }
  }
}
