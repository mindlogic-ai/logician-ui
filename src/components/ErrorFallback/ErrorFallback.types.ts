export interface ErrorFallbackProps {
  error: Error | null;
  componentName?: string;
  userId?: string;
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
