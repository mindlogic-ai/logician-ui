import type { ErrorLogData } from './ErrorFallback.types';

/**
 * Logs an error to Slack via webhook
 * @param error The error object
 * @param source Where the error occurred (e.g., "GlobalError", "RouteError", "ComponentError")
 * @param additionalInfo Additional information to include in the log
 */
export const logErrorToSlack = async (
  error: Error & { digest?: string; componentStack?: string },
  source: string,
  additionalInfo: Record<string, any> = {}
): Promise<void> => {
  const webhookUrl = '/api/log-error-slack';
  try {
    // Gather error data
    const errorData: ErrorLogData = {
      message: error.message || 'UNKNOWN ERROR',
      source,
      stack: error.stack,
      componentStack: error.componentStack,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      userAgent:
        typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
      timestamp: new Date().toISOString(),
      clarityUserId: additionalInfo?.clarityUserId,
      ...additionalInfo,
    };

    console.log('Sending error data to Slack:', errorData);

    // Format the Slack message with attachments array structure
    const slackPayload = {
      attachments: [
        {
          color: '#FF0000',
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: `🚨 Error in ${source}`,
                emoji: true,
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Error:* ${errorData.message}`,
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*🆔 Error ID:* \`${errorData.errorId || 'N/A'}\``,
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Clarity User ID:* ${errorData.clarityUserId || 'N/A'}`,
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*URL:* [${errorData.method ?? ''}] ${errorData.url || 'N/A'}`,
              },
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Time:* ${errorData.timestamp}`,
              },
            },
            errorData.stack && {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Stack Trace:*\n\`\`\`${errorData.stack.substring(0, 2900)}\`\`\``,
              },
            },
            errorData.totalCount && {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Total Count:*\n${errorData.totalCount}`,
              },
            },
            errorData.firstOccurred && {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*First Occurred:*\n${errorData.firstOccurred}`,
              },
            },
            errorData.lastOccurred && {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Last Occurred:*\n${errorData.lastOccurred}`,
              },
            },
            errorData.requestData &&
              (() => {
                const requestDataStr =
                  typeof errorData.requestData === 'string'
                    ? errorData.requestData
                    : JSON.stringify(errorData.requestData, null, 2);

                return {
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: `*Request Data:*\n\`\`\`${requestDataStr.substring(0, 2900)}\`\`\``,
                  },
                };
              })(),
            errorData.responseData &&
              (() => {
                const responseDataStr =
                  typeof errorData.responseData === 'string'
                    ? errorData.responseData
                    : JSON.stringify(errorData.responseData, null, 2);

                return {
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: `*Response Data:*\n\`\`\`${responseDataStr.substring(0, 2900)}\`\`\``,
                  },
                };
              })(),
            errorData.componentStack && {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Component Stack:*\n\`\`\`${errorData.componentStack.substring(0, 2900)}\`\`\``,
              },
            },
            errorData.localStorage &&
              (() => {
                const localStorageStr =
                  typeof errorData.localStorage === 'string'
                    ? errorData.localStorage
                    : JSON.stringify(errorData.localStorage);

                return {
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: `*Local Storage:*\n\`\`\`${localStorageStr.substring(0, 2900)}\`\`\``,
                  },
                };
              })(),
            errorData.sessionStorage &&
              (() => {
                const sessionStorageStr =
                  typeof errorData.sessionStorage === 'string'
                    ? errorData.sessionStorage
                    : JSON.stringify(errorData.sessionStorage);

                return {
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: `*Session Storage:*\n\`\`\`${sessionStorageStr.substring(0, 2900)}\`\`\``,
                  },
                };
              })(),
            errorData.aiMessageContent &&
              (() => {
                const stringified = JSON.stringify(errorData.aiMessageContent);
                const aiMessageContentStr =
                  stringified !== undefined
                    ? stringified
                    : errorData.aiMessageContent;

                return {
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: `*AI Message Content:*\n\`\`\`${aiMessageContentStr.substring(0, 2900)}\`\`\``,
                  },
                };
              })(),
            errorData.cookies &&
              (() => {
                const cookiesStr =
                  typeof errorData.cookies === 'string'
                    ? errorData.cookies
                    : JSON.stringify(errorData.cookies);

                return {
                  type: 'section',
                  text: {
                    type: 'mrkdwn',
                    text: `*Cookies:*\n\`\`\`${cookiesStr.substring(0, 2900)}\`\`\``,
                  },
                };
              })(),
          ].filter(Boolean),
        },
      ],
    };

    // Send to webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(slackPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error sending to Slack: ${response.status}`, errorText);
    }
  } catch (loggingError) {
    // Silently fail to avoid causing more errors
    console.error('Failed to log error to Slack:', loggingError);
  }
};
