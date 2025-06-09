import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { QuoteEntity } from "@/commons/domain/entities/QuoteEntity";
import type { ClarificationEntity } from "@/commons/domain/entities/ClarificationEntity";
import type { ConversationAndQuoteState } from "./ConversationAndQuote.state";

const initialState: ConversationAndQuoteState = {
  logs: [],
  quotes: [],
  loading: false,
  error: null,
};

const conversationQuoteSlice = createSlice({
  name: "conversationQuote",
  initialState,
  reducers: {
    /** Start or stop the loading spinner */
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },

    /** Replace the entire conversation log */
    setLogs(state, action: PayloadAction<ClarificationEntity[]>) {
      state.logs = action.payload;
      state.error = null;
    },

    /** Replace the list of quotes */
    setQuotes(state, action: PayloadAction<QuoteEntity[]>) {
      state.quotes = action.payload;
      state.error = null;
    },

    /** Record an error message */
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    addLog(state, action: PayloadAction<ClarificationEntity>) {
      state.logs.push(action.payload);
    },
    /** Reset everything (e.g. on unmount or logout) */
    reset(state) {
      state.logs = [];
      state.quotes = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setLoading, setLogs, setQuotes, setError, reset, addLog } =
  conversationQuoteSlice.actions;

export const conversationQuoteSliceReducer = conversationQuoteSlice.reducer;
