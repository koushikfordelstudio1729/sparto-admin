import type { AppDispatch } from "@/app/store/store";
import { setLoading, setLogs, addLog } from "./ConversationAndQuote.slice";
import type { GetClarificationsUseCase } from "@/pages/DashBoard/domain/usecases/GetClarificationsUseCase";
import type { CreateClarificationUseCase } from "@/pages/DashBoard/domain/usecases/CreateClarificationUseCase";
import type { ClarificationEntity } from "@/commons/domain/entities/ClarificationEntity";

export class ConversationAndQuoteViewModel {
  private dispatch: AppDispatch;
  private getClarificationsUseCase: GetClarificationsUseCase;
  private createClarificationUseCase: CreateClarificationUseCase;

  constructor(
    dispatch: AppDispatch,
    getClarificationsUseCase: GetClarificationsUseCase,
    createClarificationUseCase: CreateClarificationUseCase
  ) {
    this.dispatch = dispatch;
    this.getClarificationsUseCase = getClarificationsUseCase;
    this.createClarificationUseCase = createClarificationUseCase;
  }

  async initialize(requestId: string): Promise<void> {
    await this.loadClarifications(requestId);
  }

  async sendMessage(entity: ClarificationEntity): Promise<void> {
    try {
      this.dispatch(setLoading(true));
      this.dispatch(addLog(entity));
      await this.createClarificationUseCase.execute(entity);
      await this.loadClarifications(entity.requestId);
    } finally {
      this.dispatch(setLoading(false));
    }
  }

  private async loadClarifications(requestId: string): Promise<void> {
    try {
      this.dispatch(setLoading(true));
      const logs = await this.getClarificationsUseCase.execute(requestId);
      this.dispatch(setLogs(logs));
    } finally {
      this.dispatch(setLoading(false));
    }
  }
}
