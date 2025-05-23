// import type { AppDispatch } from "@/app/store/store";
// import type { LoginUserUseCase } from "@/pages/Login/domain/usecases/LoginUserUseCase";
// import { setLoading } from "./LoginComponent.slice";

// export class LoginComponentViewModel {
//   private readonly dispatch: AppDispatch;
//   private loginUserUseCase: LoginUserUseCase;

//   constructor(dispatch: AppDispatch, loginUserUseCase: LoginUserUseCase) {
//     this.dispatch = dispatch;
//     this.loginUserUseCase = loginUserUseCase;
//   }

//   async loginUser(phone: string, password: string): Promise<void> {
//     try {
//       this.dispatch(setLoading(true));
//       await this.loginUserUseCase.execute(phone, password);
//     } catch (error) {
//       console.error("Error during login:", error);
//     } finally {
//       this.dispatch(setLoading(false));
//     }
//   }
// }
