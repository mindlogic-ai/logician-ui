import { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  /**
   * The children to be rendered inside the ErrorBoundary
   */
  children: ReactNode;

  /**
   * Optional custom fallback UI to display when an error is caught
   */
  fallback?: ReactNode;
}
