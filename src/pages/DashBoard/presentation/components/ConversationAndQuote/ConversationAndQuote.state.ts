import type { ClarificationEntity } from "@/commons/domain/entities/ClarificationEntity";
import type { QuoteEntity } from "@/commons/domain/entities/QuoteEntity";

export interface ConversationAndQuoteState {
  logs: ClarificationEntity[];
  quotes: QuoteEntity[];
  loading: boolean;
  error: string | null;
}
