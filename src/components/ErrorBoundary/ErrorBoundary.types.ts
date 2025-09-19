import { ErrorInfo, type ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
  userId?: string;
  onError?: (error: Error, info: ErrorInfo) => void;
  onResetError?: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error: (Error & { componentStack?: string }) | null;
  errorId: string;
  timestamp: string;
  userId?: string;
}

export interface ErrorFallbackProps {
  error: Error | null;
  errorId: string;
  timestamp: string;
  componentName?: string;
  userId?: string;
  onResetError?: () => void;
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
