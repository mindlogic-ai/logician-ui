import { ReactNode, useState } from 'react';
import {
  Box,
  Toaster as ChakraToaster,
  createToaster,
  Flex,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';

import { T } from '../../guidelines/_components/Lang';
import { TokenTable } from '../../guidelines/_components/TokenTable';
import { Button } from '../Button';
import { Toast } from './Toast';
import { toastStyles } from './Toast.styles';
import type { ToastAction, ToastStatus, UseToastOptions } from './Toast.types';
import { Toaster } from './Toaster';
import { useToast } from './useToast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    status: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'error'],
      description:
        '`neutral` (default): a plain result with no status, no icon. `success`: done as asked. `info`: a fact about what just happened; nothing is wrong. `warning`: done, but not quite as expected. `error`: it did not happen.',
    },
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof Toast>;

export const BasicStatuses: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() =>
              showToast({
                description: 'This is an informational message.',
                status: 'info',
              })
            }
          >
            Show Info Toast
          </Button>
          <Button
            onClick={() =>
              showToast({
                description: 'This is a warning message.',
                status: 'warning',
              })
            }
          >
            Show Warning Toast
          </Button>
          <Button
            onClick={() =>
              showToast({
                description: 'Your action was successful.',
                status: 'success',
              })
            }
          >
            Show Success Toast
          </Button>
          <Button
            onClick={() =>
              showToast({
                description: 'There was an error processing your request.',
                status: 'error',
              })
            }
          >
            Show Error Toast
          </Button>
          <Button
            onClick={() =>
              showToast({
                description: 'This is a neutral message with no status.',
                status: 'neutral',
              })
            }
          >
            Show Neutral Toast
          </Button>
        </Flex>
      </>
    );
  },
};

export const WithTitles: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() =>
              showToast({
                title: 'Information',
                description: 'Here is some useful information for you.',
                status: 'info',
              })
            }
          >
            Info with Title
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Warning',
                description: 'Please review this warning message.',
                status: 'warning',
              })
            }
          >
            Warning with Title
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Success',
                description: 'Operation completed successfully.',
                status: 'success',
              })
            }
          >
            Success with Title
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Error',
                description: 'An error occurred while processing.',
                status: 'error',
              })
            }
          >
            Error with Title
          </Button>
        </Flex>
      </>
    );
  },
};

export const DurationControl: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() =>
              showToast({
                title: 'Quick Toast',
                description: 'This toast will disappear in 2 seconds',
                duration: 2000,
                status: 'info',
              })
            }
          >
            2 Seconds
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Normal Toast',
                description: 'This toast will disappear in 5 seconds (default)',
                duration: 5000,
                status: 'success',
              })
            }
          >
            5 Seconds (Default)
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Long Toast',
                description: 'This toast will stay for 10 seconds',
                duration: 10000,
                status: 'warning',
              })
            }
          >
            10 Seconds
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Persistent Toast',
                description: 'This toast will not auto-dismiss',
                duration: Infinity,
                status: 'error',
              })
            }
          >
            Persistent (No Auto-Dismiss)
          </Button>
        </Flex>
      </>
    );
  },
};

export const DismissControl: Story = {
  render: () => {
    const showToast = useToast();
    const [lastToastId, setLastToastId] = useState<string | null>(null);

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() => {
              const id = showToast({
                title: 'Dismissible Toast',
                description: 'Click "Dismiss Last" to close this toast',
                duration: null,
                status: 'info',
              });
              setLastToastId(id);
            }}
          >
            Show Toast
          </Button>
          <Button
            onClick={() => {
              if (lastToastId) {
                showToast.dismiss(lastToastId);
                setLastToastId(null);
              }
            }}
            disabled={!lastToastId}
          >
            Dismiss Last Toast
          </Button>
          <Button
            onClick={() => {
              showToast.dismissAll();
              setLastToastId(null);
            }}
          >
            Dismiss All Toasts
          </Button>
        </Flex>
      </>
    );
  },
};

export const MaxToastLimit: Story = {
  render: () => {
    const showToast = useToast();
    const [count, setCount] = useState(0);

    return (
      <>
        <Toaster />
        <Stack gap={3}>
          <Text fontSize="sm" color="fg.muted">
            Maximum 3 toasts are shown at once. Older toasts are automatically
            dismissed.
          </Text>
          <Flex gap={3} wrap="wrap">
            <Button
              onClick={() => {
                const newCount = count + 1;
                setCount(newCount);
                showToast({
                  title: `Toast #${newCount}`,
                  description: `This is toast number ${newCount}`,
                  status: 'info',
                  duration: null,
                });
              }}
            >
              Add Toast (Count: {count})
            </Button>
            <Button
              onClick={() => {
                showToast.dismissAll();
                setCount(0);
              }}
            >
              Reset
            </Button>
          </Flex>
        </Stack>
      </>
    );
  },
};

export const UpdateToast: Story = {
  render: () => {
    const showToast = useToast();
    const [toastId, setToastId] = useState<string | null>(null);

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() => {
              const id = showToast({
                title: 'Loading...',
                description: 'Processing your request',
                status: 'info',
                duration: null,
              });
              setToastId(id);
            }}
          >
            Create Toast
          </Button>
          <Button
            onClick={() => {
              if (toastId) {
                showToast.update(toastId, {
                  title: 'Success!',
                  description: 'Your request was processed successfully',
                  type: 'success',
                  duration: 5000,
                });
              }
            }}
            disabled={!toastId}
          >
            Update to Success
          </Button>
          <Button
            onClick={() => {
              if (toastId) {
                showToast.update(toastId, {
                  title: 'Error!',
                  description: 'Something went wrong',
                  type: 'error',
                  duration: 5000,
                });
              }
            }}
            disabled={!toastId}
          >
            Update to Error
          </Button>
        </Flex>
      </>
    );
  },
};

export const CustomStyles: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() =>
              showToast({
                title: 'Custom Background',
                description: 'This toast has a category background',
                status: 'info',
                styles: {
                  bg: 'category.purple.surface',
                  color: 'category.purple.fg',
                },
              })
            }
          >
            Custom Background
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Custom Border',
                description: 'This toast has a thick border',
                status: 'success',
                styles: {
                  borderWidth: '4px',
                  borderColor: 'success.solid',
                },
              })
            }
          >
            Custom Border
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Large Toast',
                description: 'This toast is wider and has larger text',
                status: 'warning',
                styles: {
                  maxW: '600px',
                  fontSize: 'lg',
                  p: 6,
                },
              })
            }
          >
            Custom Size
          </Button>
        </Flex>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <>
        <Toaster />
        <Flex gap={3} wrap="wrap">
          <Button
            onClick={() =>
              showToast({
                title: 'Long Description',
                description:
                  'This is a very long description that demonstrates how the toast handles longer content. The toast should properly wrap the text and maintain readability even with extensive information. This helps ensure that important messages are fully visible to users.',
                status: 'info',
              })
            }
          >
            Long Description
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'This is a Very Long Title That Should Wrap Properly',
                description: 'Short description with long title',
                status: 'warning',
              })
            }
          >
            Long Title
          </Button>
          <Button
            onClick={() =>
              showToast({
                title: 'Complex Content',
                description:
                  'Line 1: First piece of information\nLine 2: Second piece of information\nLine 3: Third piece of information',
                status: 'success',
              })
            }
          >
            Multi-line Content
          </Button>
        </Flex>
      </>
    );
  },
};

export const RapidFire: Story = {
  render: () => {
    const showToast = useToast();

    return (
      <>
        <Toaster />
        <Stack gap={3}>
          <Text fontSize="sm" color="fg.muted">
            Test rapid toast creation and the 3-toast limit
          </Text>
          <Button
            onClick={() => {
              for (let i = 1; i <= 5; i++) {
                setTimeout(() => {
                  showToast({
                    title: `Toast ${i}`,
                    description: `Rapid fire toast number ${i}`,
                    status: i % 2 === 0 ? 'success' : 'info',
                  });
                }, i * 200);
              }
            }}
          >
            Show 5 Toasts Rapidly
          </Button>
        </Stack>
      </>
    );
  },
};

/**
 * Toasts with an action.
 *
 * The action is a text action in the toast's own status color, under the
 * description and aligned with it — not a neutral `<Button>` inside
 * `description`. One action per toast; dismiss stays on the ×. A toast with
 * an action stays for 8s unless `duration` is given.
 *
 * See "Guidelines/Actions in feedback surfaces".
 */
const ActionStory = ({
  label,
  options,
}: {
  label: string;
  /** Builds the toast options; `fired` reports a click back to the story */
  options: (fired: (message: string) => () => void) => UseToastOptions;
}) => {
  const showToast = useToast();
  const [log, setLog] = useState<string | null>(null);
  const fired = (message: string) => () => setLog(`onClick: ${message}`);

  return (
    <>
      <Toaster />
      <Stack gap={3} align="center">
        <Button onClick={() => showToast(options(fired))}>{label}</Button>
        {log && (
          <Text fontSize="sm" color="fg.muted">
            {log}
          </Text>
        )}
      </Stack>
    </>
  );
};

export const ActionError: Story = {
  name: 'Action / Error',
  render: () => (
    <ActionStory
      label="Show error toast with action"
      options={(fired) => ({
        status: 'error',
        description:
          '크레딧이 부족해 응답을 생성하지 못했습니다. 이번 달 남은 크레딧: 0',
        action: { label: '크레딧 구매', onClick: fired('크레딧 구매') },
      })}
    />
  ),
};

export const ActionWarning: Story = {
  name: 'Action / Warning',
  render: () => (
    <ActionStory
      label="Show warning toast with action"
      options={(fired) => ({
        status: 'warning',
        title: '모델 지원 종료',
        description: '이 채팅의 모델이 지원 종료되어 기본 모델로 바뀌었습니다.',
        action: { label: '모델 선택', onClick: fired('모델 선택') },
      })}
    />
  ),
};

export const ActionInfo: Story = {
  name: 'Action / Info',
  render: () => (
    <ActionStory
      label="Show info toast with action"
      options={(fired) => ({
        status: 'info',
        description: '내보내기가 끝났습니다. 파일을 다운로드할 수 있습니다.',
        action: { label: '파일 열기', onClick: fired('파일 열기') },
      })}
    />
  ),
};

export const ActionSuccess: Story = {
  name: 'Action / Success',
  render: () => (
    <ActionStory
      label="Show success toast with action"
      options={(fired) => ({
        status: 'success',
        title: '업로드 완료',
        description: '문서 3개를 프로젝트에 추가했습니다.',
        action: { label: '프로젝트 보기', onClick: fired('프로젝트 보기') },
      })}
    />
  ),
};

export const ActionShortMessage: Story = {
  name: 'Action / Short message',
  render: () => (
    <ActionStory
      label="Show short toast with undo"
      options={(fired) => ({
        status: 'success',
        description: '채팅을 삭제했습니다.',
        action: { label: '되돌리기', onClick: fired('되돌리기') },
      })}
    />
  ),
};

// ───────────────────────── Usage-page specimens ─────────────────────────
// Pulled into `Toast.usage.mdx` with <Canvas of={…} />. Hidden from the
// sidebar (`!dev`); `tags` is written on each story because the indexer reads
// CSF statically.
//
// Each specimen renders the real `Toast` through its own toaster, held open
// (`duration: Infinity`) inside a transformed box. The transform makes the
// toaster's `position: fixed` region relative to the box, so the toast sits in
// the docs page instead of at the top of the window, and the specimens do not
// share the app-wide `toaster`.

const ToastPreview = ({
  status = 'neutral',
  title,
  description,
  action,
  height = 150,
}: {
  status?: ToastStatus;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastAction;
  height?: number;
}) => {
  // Created with its toast in the initialiser, not in an effect: a toast
  // dismissed by a StrictMode effect cleanup did not come back.
  const [local] = useState(() => {
    const toaster = createToaster({ placement: 'top' });
    toaster.create({
      type: status === 'neutral' ? 'info' : status,
      title,
      description,
      duration: Infinity,
      meta: { status, action },
    });
    return toaster;
  });
  return (
    <Box
      position="relative"
      transform="translateZ(0)"
      h={`${height}px`}
      w="100%"
      minW={{ md: '420px' }}
      overflow="hidden"
    >
      <ChakraToaster toaster={local} insetInline={{ mdDown: '4' }} gap={3}>
        {(toast) => {
          const s = (toast.meta?.status ?? 'neutral') as ToastStatus;
          return (
            <Toast
              title={toast.title}
              description={toast.description}
              status={s}
              action={toast.meta?.action}
              onClose={() => {}}
              {...toastStyles[s]}
            />
          );
        }}
      </ChakraToaster>
    </Box>
  );
};

const noop = () => {};

export const DoActionProp: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: one action through `action`',
  render: () => (
    <ToastPreview
      status="error"
      description="크레딧이 부족해 응답을 생성하지 못했습니다."
      action={{ label: '크레딧 구매', onClick: noop }}
    />
  ),
};

export const DontButtonInDescription: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a Button inside `description`",
  render: () => (
    <ToastPreview
      status="error"
      height={170}
      description={
        <Stack gap={2} align="flex-start">
          <span>크레딧이 부족해 응답을 생성하지 못했습니다.</span>
          <Button variant="secondary" size="sm">
            크레딧 구매
          </Button>
        </Stack>
      }
    />
  ),
};

export const DoUndoAfterDelete: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: confirm, and offer undo',
  render: () => (
    <ToastPreview
      status="success"
      description="채팅을 삭제했습니다."
      action={{ label: '되돌리기', onClick: noop }}
    />
  ),
};

export const DontToastForFieldError: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: "Usage / Don't: a toast for a field error",
  render: () => (
    <ToastPreview
      status="error"
      description="이메일 형식이 올바르지 않습니다."
    />
  ),
};

export const DoNeutralResult: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Do: neutral for a plain result',
  render: () => <ToastPreview description="링크를 복사했습니다." />,
};

const STATUSES: ToastStatus[] = ['neutral', 'info', 'success', 'warning', 'error'];

/** Tokens each status reads, from `Toast.styles.ts` and the theme. */
export const UsageTokens: Story = {
  tags: ['!dev'],
  parameters: { layout: 'padded' },
  name: 'Usage / Tokens',
  render: () => (
    <TokenTable
      rows={STATUSES.flatMap((status) => [
        {
          token: toastStyles[status].bg as string,
          use: <T en={`${status} · background`} ko={`${status} · 배경`} />,
        },
        {
          token: toastStyles[status].borderColor as string,
          use: <T en={`${status} · border`} ko={`${status} · 테두리`} />,
        },
        {
          token: toastStyles[status].color as string,
          use: (
            <T
              en={`${status} · text, icon, action, ×`}
              ko={`${status} · 글자, 아이콘, 동작, ×`}
            />
          ),
        },
      ])}
    />
  ),
};
