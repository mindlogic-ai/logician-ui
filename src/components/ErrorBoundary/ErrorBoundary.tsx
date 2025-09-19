import { Component, ErrorInfo, ReactNode } from 'react';

import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';
import { ErrorFallback } from './ErrorFallback';
import { logErrorToSlack } from './errorLogger';

const initialState: ErrorBoundaryState = {
  hasError: false,
  error: null,
  errorId: '',
  timestamp: '',
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorId:
        `ERR-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`.toUpperCase(),
      timestamp: new Date().toISOString(),
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);

    // Add component stack to error object for better debugging
    const errorWithStack = error as Error & { componentStack?: string };
    errorWithStack.componentStack = errorInfo.componentStack || '';

    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    // Log to Slack with component information
    logErrorToSlack(errorWithStack, 'ComponentError', {
      componentName: this.props.componentName || 'Unknown Component',
      componentStack: errorInfo.componentStack,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent:
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      timestamp: this.state.timestamp,
      errorId: this.state.errorId,
      localStorage:
        typeof window !== 'undefined'
          ? {
              userData: JSON.parse(
                window.localStorage.getItem('user-data') || '{}'
              ),
            }
          : undefined,
      sessionStorage:
        typeof window !== 'undefined' ? window.sessionStorage : undefined,
      cookies: typeof document !== 'undefined' ? document.cookie : undefined,
      clarityUserId: this.props.userId,
    });
  }

  resetError = (): void => {
    this.props.onResetError?.();
    this.setState(initialState);
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Enhanced default fallback UI with translations
      return (
        <ErrorFallback
          error={this.state.error}
          errorId={this.state.errorId}
          timestamp={this.state.timestamp}
          componentName={this.props.componentName}
          userId={this.props.userId}
          onResetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}
