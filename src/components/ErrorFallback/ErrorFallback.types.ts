export interface ErrorFallbackProps {
  /** The caught error. Its `message` is shown as is; a translated default when empty. */
  error: Error | null;
  /** ID shown for support; generated (`ERR-…`) when missing. */
  errorId?: string;
  /** ISO time for the copied report only; the card shows the render time. */
  timestamp?: string;
  /** Where it failed, shown and copied; "unknown" (translated) when missing. */
  componentName?: string;
  /** Shown and copied; "anonymous" (translated) when missing. */
  userId?: string;
  /** Called by the "try again" button, e.g. the error boundary's reset. */
  onErrorReset?: () => void;
}

export interface ErrorLogData {
  message: string;
  source: string;
  stack?: string;
  url?: string;
  userAgent?: string;
  timestamp?: string;
  digest?: string;
  componentStack?: string;
  localStorage?: string;
  sessionStorage?: string;
  cookies?: string;
  clarityUserId?: string;
  errorId?: string;
  status?: number;
  method?: string;
  requestData?: string;
  responseData?: string;
  totalCount?: number;
  firstOccurred?: string;
  lastOccurred?: string;
  aiMessageContent?: string;
}
