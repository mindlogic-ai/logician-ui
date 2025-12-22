import { Box, Flex, VStack } from '@chakra-ui/react';

import { useTranslate } from '@/hooks/useTranslate';

import { Button } from '../Button';
import { Card } from '../Card';
import { Container } from '../Container';
import { FaRegCopy, HiRefresh, MdError } from '../Icon';
import { useToast } from '../Toast/useToast';
import { H1, H4, Subtext, Subtitle, Text } from '../Typography';
import type { ErrorFallbackProps } from './ErrorFallback.types';

export function ErrorFallback({
  error,
  errorId,
  timestamp,
  componentName,
  userId,
  onErrorReset,
}: ErrorFallbackProps) {
  const translate = useTranslate();
  const showToast = useToast();

  const errorInfo = {
    errorId:
      errorId ??
      `ERR-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`.toUpperCase(),
    timestamp: timestamp ?? new Date().toISOString(),
    message: error?.message || translate('error_boundary_default_message'),
    component: componentName || translate('unknown'),
    url: typeof window !== 'undefined' ? window.location.href : 'N/A',
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
    userId: userId ?? translate('anonymous'),
  };

  const copyErrorInfo = (): void => {
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
    <Flex minH="100vh" align="center" justify="center" p={8}>
      <Container disableResponsive maxW="container.sm">
        <Card
          p={12}
          textAlign="center"
          w="full"
          bgColor="white"
          boxShadow="2xl"
        >
          <VStack gap={6} align="center" w="full" mx="auto">
            {/* Error Icon */}
            <Box
              position="relative"
              p={4}
              bg="danger.lighter"
              borderRadius="full"
            >
              <MdError boxSize="xl" color="danger.main" />
            </Box>

            {/* Error Title */}
            <VStack gap={3} align="center" w="full">
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
              <VStack gap={2} align="stretch" mb={4}>
                <Flex justify="space-between">
                  <Text color="primary.main" fontWeight="semibold">
                    {translate('error_id')}:
                  </Text>
                  <Text fontFamily="mono">{errorInfo.errorId}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="primary.main" fontWeight="semibold">
                    {translate('time')}:
                  </Text>
                  <Subtext fontFamily="mono">
                    {new Date().toLocaleString()}
                  </Subtext>
                </Flex>
                <Flex justify="space-between">
                  <Text color="primary.main" fontWeight="semibold">
                    {translate('component')}:
                  </Text>
                  <Text fontFamily="mono">
                    {componentName || translate('unknown')}
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text color="primary.main" fontWeight="semibold">
                    {translate('user_id')}:
                  </Text>
                  <Text fontFamily="mono">
                    {userId ?? translate('anonymous')}
                  </Text>
                </Flex>
                {typeof window !== 'undefined' && (
                  <Flex justify="space-between">
                    <Text color="primary.main" fontWeight="semibold">
                      {translate('page')}:
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
                >
                  <FaRegCopy boxSize="xs" />
                  {translate('copy_error_details')}
                </Button>
              </Flex>
            </Card>

            {/* Action Buttons */}
            <VStack gap={3} w="full" align="center">
              <Button
                onClick={onErrorReset}
                size="lg"
                variant="primary"
                _hover={{
                  transform: 'translateY(-1px)',
                  boxShadow: 'lg',
                }}
                w="full"
                maxW="300px"
              >
                <HiRefresh />
                {translate('try_again')}
              </Button>

              <Button
                onClick={() => window.location.reload()}
                size="sm"
                variant="tertiary"
              >
                <HiRefresh />
                {translate('refresh_page')}
              </Button>
            </VStack>
          </VStack>
        </Card>
      </Container>
    </Flex>
  );
}
