'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Flex, VStack } from '@chakra-ui/react';

import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Container } from '@/components/Container';
import { Icon, IconTypes } from '@/components/Icon';
import { useToast } from '@/components/Toast/useToast';
import { H1, H4, Subtext, Subtitle, Text } from '@/components/Typography';
import { useTranslate } from '@/hooks/useTranslate';
import ErrorTranslations from '@/public/translations/Error.translations.json';
import useUserStore from '@/store/user';
import { logErrorToSlack } from '@/utils/errorLogger';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  componentName?: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: (Error & { componentStack?: string }) | null;
  errorId: string;
  timestamp: string;
}

// Functional component wrapper to use hooks
const ErrorBoundaryContent = ({
  error,
  errorId,
  timestamp,
  componentName,
  onResetError,
}: {
  error: Error | null;
  errorId: string;
  timestamp: string;
  componentName?: string;
  onResetError: () => void;
}) => {
  const translate = useTranslate(ErrorTranslations);
  const showToast = useToast();

  const copyErrorInfo = (): void => {
    const errorInfo = {
      errorId,
      timestamp,
      message: error?.message || translate('error_boundary_default_message'),
      component: componentName || translate('unknown'),
      url: typeof window !== 'undefined' ? window.location.href : 'N/A',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
      userId: useUserStore.getState().id?.toString() ?? translate('anonymous'),
    };

    const errorText = `Error Report:
ID: ${errorInfo.errorId}
Time: ${errorInfo.timestamp}
Component: ${errorInfo.component}
Message: ${errorInfo.message}
URL: ${errorInfo.url}
User ID: ${errorInfo.userId}
User Agent: ${errorInfo.userAgent}`;

    navigator.clipboard
      ?.writeText(errorText)
      .then(() => {
        console.log('Error info copied to clipboard');
        showToast({
          status: 'success',
          description: translate('error_details_copied'),
        });
      })
      .catch(() => {
        // Fallback for browsers that don't support clipboard API
        showToast({
          status: 'error',
          description: 'Failed to copy to clipboard',
        });
      });
  };

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(135deg, gray.50 0%, gray.100 100%)"
      align="center"
      justify="center"
      p={8}
    >
      <Container disableResponsive maxW="container.sm">
        <Card
          p={12}
          textAlign="center"
          w="full"
          bgColor="white"
          boxShadow="2xl"
        >
          <VStack spacing={6} align="center" w="full" mx="auto">
            {/* Error Icon */}
            <Box
              position="relative"
              p={4}
              bg="danger.lighter"
              borderRadius="full"
            >
              <Icon icon={IconTypes.MdError} boxSize="xl" color="danger.main" />
            </Box>

            {/* Error Title */}
            <VStack spacing={3} align="center" w="full">
              <H1 color="gray.1200" fontSize="3xl" fontWeight="bold">
                {translate('error_boundary_title')}
              </H1>
              <Subtitle color="gray.1000" fontSize="lg" maxW="md">
                {translate('error_boundary_subtitle')}
              </Subtitle>
            </VStack>

            {/* Error Message */}
            <Card
              bg="danger.lighter"
              border="1px solid"
              borderColor="danger.light"
              p={4}
              w="full"
            >
              <Text
                color="danger.dark"
                fontFamily="mono"
                wordBreak="break-word"
              >
                {error?.message || translate('error_boundary_default_message')}
              </Text>
            </Card>

            {/* Support Information */}
            <Card bg="primary.light" borderColor="primary.light" p={6} w="full">
              <H4 color="primary.dark" mb={4} textAlign="center">
                {translate('support_information')}
              </H4>
              <VStack spacing={2} align="stretch" mb={4}>
                <Flex justify="space-between">
                  <Text color="primary.main" fontWeight="semibold">
                    {translate('error_id')}
                  </Text>
                  <Text fontFamily="mono">{errorId}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="primary.main" fontWeight="semibold">
                    {translate('time')}
                  </Text>
                  <Subtext fontFamily="mono">
                    {new Date(timestamp).toLocaleString()}
                  </Subtext>
                </Flex>
                <Flex justify="space-between">
                  <Text color="primary.main" fontWeight="semibold">
                    {translate('component')}
                  </Text>
                  <Text fontFamily="mono">
                    {componentName || translate('unknown')}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="primary.main" fontWeight="semibold">
                    {translate('user_id')}
                  </Text>
                  <Text fontFamily="mono">
                    {useUserStore.getState().id?.toString() ||
                      translate('anonymous')}
                  </Text>
                </Flex>
                {typeof window !== 'undefined' && (
                  <Flex justify="space-between">
                    <Text color="primary.main" fontWeight="semibold">
                      {translate('page')}
                    </Text>
                    <Subtext fontFamily="mono">
                      {window.location.pathname}
                    </Subtext>
                  </Flex>
                )}
              </VStack>

              <Flex justify="space-between" align="flex-end" gap={4}>
                {/* Help Text */}
                <Text textAlign="left">{translate('support_help_text')}</Text>

                {/* Copy Button */}
                <Button
                  onClick={copyErrorInfo}
                  size="sm"
                  minW="fit-content"
                  variant="tertiary"
                  leftIcon={<Icon icon={IconTypes.FaRegCopy} boxSize="xs" />}
                >
                  {translate('copy_error_details')}
                </Button>
              </Flex>
            </Card>

            {/* Action Buttons */}
            <VStack spacing={3} w="full" align="center">
              <Button
                onClick={onResetError}
                size="lg"
                variant="primary"
                leftIcon={<Icon icon={IconTypes.HiRefresh} />}
                _hover={{
                  transform: 'translateY(-1px)',
                  boxShadow: 'lg',
                }}
                w="full"
                maxW="300px"
              >
                {translate('try_again')}
              </Button>

              <Button
                onClick={() => window.location.reload()}
                size="sm"
                variant="tertiary"
                leftIcon={<Icon icon={IconTypes.HiRefresh} />}
              >
                {translate('refresh_page')}
              </Button>
            </VStack>
          </VStack>
        </Card>
      </Container>
    </Flex>
  );
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: '',
      timestamp: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const timestamp = new Date().toISOString();
    const errorId =
      `ERR-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`.toUpperCase();

    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorId,
      timestamp,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Add component stack to error object for better debugging
    const errorWithStack = error as Error & { componentStack?: string };
    errorWithStack.componentStack = errorInfo.componentStack || '';

    // Log the error to console
    console.error('Error caught by ErrorBoundary:', error, errorInfo);

    // Log to Slack with component information
    logErrorToSlack(errorWithStack, 'ComponentError', {
      componentName: this.props.componentName || 'Unknown Component',
      componentStack: errorInfo.componentStack || '',
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent:
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      timestamp: this.state.timestamp,
      errorId: this.state.errorId,
      localStorage:
        typeof window !== 'undefined'
          ? {
              userData: JSON.parse(
                window.localStorage.getItem('user-data') || '{}',
              ),
            }
          : undefined,
      sessionStorage:
        typeof window !== 'undefined' ? window.sessionStorage : undefined,
      cookies: typeof document !== 'undefined' ? document.cookie : undefined,
      clarityUserId: useUserStore.getState().id?.toString() ?? '',
    });
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: null, errorId: '', timestamp: '' });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Enhanced default fallback UI with translations
      return (
        <ErrorBoundaryContent
          error={this.state.error}
          errorId={this.state.errorId}
          timestamp={this.state.timestamp}
          componentName={this.props.componentName}
          onResetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}
