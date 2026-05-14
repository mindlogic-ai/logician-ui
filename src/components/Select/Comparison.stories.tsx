import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
import { FormControl } from '../FormControl';
import { FormLabel } from '../FormLabel';
import { IoAddOutline, IoIosMail, IoSearch } from '../Icon';
import { Input } from '../Input';
import { PasswordInput } from '../PasswordInput';
import { Textarea } from '../Textarea';

import { Select } from '.';
import { SelectSize } from './Select.types';

/**
 * Temporary visual comparison between Input, Select and Textarea.
 * Used to verify the three controls share the same default look
 * (border, hover, focus, font, padding, disabled/invalid states)
 * and stay aligned across the supported Chakra `size` variants
 * (`sm` / `md` / `lg` / `xl`).
 *
 * Safe to delete once the unified style is no longer being iterated on.
 */
type CommonArgs = { size: SelectSize };

const meta = {
  title: 'Components/Select/Comparison',
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'] satisfies SelectSize[],
      description:
        'Mirrors Chakra `Input`/`Textarea` recipe sizes. Use to verify Input, Select and Textarea stay aligned at every size.',
    },
  },
  args: {
    size: 'md' as SelectSize,
  },
} satisfies Meta<CommonArgs>;

export default meta;

type Story = StoryObj<CommonArgs>;

const sortOptions = [
  { label: '최신순', value: 'recent' },
  { label: '오래된순', value: 'oldest' },
  { label: '이름순', value: 'name' },
];

const categoryOptions = [
  { label: '전체', value: 'all' },
  { label: '비즈니스', value: 'business' },
  { label: '교육', value: 'education' },
  { label: '엔터테인먼트', value: 'entertainment' },
];

const roleOptions = [
  { label: '관리자', value: 'admin' },
  { label: '편집자', value: 'editor' },
  { label: '뷰어', value: 'viewer' },
];

const countryOptions = [
  { label: '대한민국', value: 'KR' },
  { label: '미국', value: 'US' },
  { label: '일본', value: 'JP' },
  { label: '독일', value: 'DE' },
];

/**
 * Component-level diff: every Input / Select / Textarea state side-by-side.
 * The `size` control changes Input + Select + Textarea together so you
 * can verify height, padding and font alignment at each Chakra size
 * variant.
 */
export const SideBySide: Story = {
  render: ({ size }) => {
    const [text, setText] = useState('');
    const [note, setNote] = useState('');

    return (
      <Stack gap={6} width="400px">
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Input — placeholder
          </Text>
          <Input
            size={size}
            placeholder="Placeholder text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Select — placeholder
          </Text>
          <Select
            size={size}
            options={categoryOptions}
            placeholder="Placeholder text"
          />
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Textarea — placeholder
          </Text>
          <Textarea
            size={size}
            placeholder="Placeholder text"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
        </Box>

        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Input — with value
          </Text>
          <Input size={size} defaultValue="Some value" />
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Select — with value
          </Text>
          <Select
            size={size}
            options={categoryOptions}
            defaultValue={categoryOptions[0]}
          />
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Textarea — with value
          </Text>
          <Textarea size={size} defaultValue="Some value" />
        </Box>

        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Input — invalid
          </Text>
          <Input size={size} placeholder="Invalid input" invalid />
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Select — invalid
          </Text>
          <Select
            size={size}
            options={categoryOptions}
            placeholder="Invalid select"
            invalid
          />
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Textarea — invalid
          </Text>
          <Textarea size={size} placeholder="Invalid textarea" invalid />
        </Box>

        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Input — disabled
          </Text>
          <Input size={size} disabled defaultValue="Disabled" />
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Select — disabled
          </Text>
          <Select
            size={size}
            options={categoryOptions}
            defaultValue={categoryOptions[0]}
            isDisabled
          />
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Textarea — disabled
          </Text>
          <Textarea size={size} disabled defaultValue="Disabled" />
        </Box>

        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Input — readOnly
          </Text>
          <Input size={size} readOnly defaultValue="Read only" />
        </Box>
        <Box>
          <Text mb={1} fontSize="sm" fontWeight="medium">
            Textarea — readOnly
          </Text>
          <Textarea size={size} readOnly defaultValue="Read only" />
        </Box>
      </Stack>
    );
  },
};

/**
 * All four supported sizes stacked together so the height progression
 * (sm 36 → md 40 → lg 44 → xl 48) is visible at a glance. Font stays
 * 14-16px responsive (`subtitleAndP`) at every size by design — only
 * height and horizontal padding scale.
 */
export const SizeProgression: Story = {
  argTypes: {
    size: { control: false },
  },
  render: () => {
    const rows: { size: SelectSize; geometryLabel: string }[] = [
      { size: 'xs', geometryLabel: 'h 32 · padX 8px · font ~12px' },
      { size: 'sm', geometryLabel: 'h 36 · padX 0.625em · font ~14px' },
      { size: 'md', geometryLabel: 'h 40 · padX 0.75em · font ~16px' },
      { size: 'lg', geometryLabel: 'h 44 · padX 0.75em · font ~18px' },
      { size: 'xl', geometryLabel: 'h 48 · padX 0.75em · font ~20px' },
    ];

    return (
      <Stack gap={8} width="520px">
        {rows.map(({ size, geometryLabel }) => (
          <Box key={size}>
            <Text mb={2} fontSize="sm" fontWeight="semibold" color="gray.700">
              size = {size}{' '}
              <Text as="span" fontWeight="normal" color="gray.500">
                — {geometryLabel}
              </Text>
            </Text>
            <Stack gap={2}>
              <Input size={size} placeholder="Input placeholder" />
              <Select
                size={size}
                options={categoryOptions}
                placeholder="Select placeholder"
              />
              <Textarea
                size={size}
                placeholder="Textarea placeholder"
                rows={2}
              />
            </Stack>
          </Box>
        ))}
      </Stack>
    );
  },
};

/**
 * factchat 챗봇 목록 페이지의 상단 toolbar 패턴.
 * 검색 Input + 카테고리 Select + 정렬 Select + 새 챗봇 Button 이 가로로
 * 한 줄에 배치되는 케이스 — 높이와 border 두께가 어긋나면 가장 눈에
 * 잘 띄는 레이아웃입니다.
 */
export const ChatbotListToolbar: Story = {
  render: ({ size }) => {
    const [query, setQuery] = useState('');

    return (
      <Box width="100%" maxW="1200px">
        <HStack gap={3}>
          <Box flex={1}>
            <Input
              size={size}
              leftIcon={<IoSearch color="gray.500" />}
              placeholder="챗봇 검색..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </Box>
          <Box w="160px">
            <Select
              size={size}
              options={categoryOptions}
              defaultValue={categoryOptions[0]}
            />
          </Box>
          <Box w="160px">
            <Select
              size={size}
              options={sortOptions}
              defaultValue={sortOptions[0]}
            />
          </Box>
          <Button colorPalette="primary" variant="solid">
            <IoAddOutline />새 챗봇
          </Button>
        </HStack>
      </Box>
    );
  },
};

/**
 * 회원가입 폼 — Input, Select, Textarea 가 라벨과 함께 세로로 쌓이는
 * 케이스. 라벨/필드 정렬, 좌측 padding, 폰트 두께가 모두 일관되어야
 * 합니다.
 */
export const SignUpForm: Story = {
  render: ({ size }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');

    return (
      <Box width="400px">
        <Text fontSize="xl" fontWeight="bold" mb={6}>
          회원가입
        </Text>
        <Stack gap={4}>
          <FormControl>
            <FormLabel>이메일</FormLabel>
            <Input
              size={size}
              leftIcon={<IoIosMail color="gray.500" />}
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>이름</FormLabel>
            <Input
              size={size}
              placeholder="홍길동"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>비밀번호</FormLabel>
            <PasswordInput size={size} placeholder="8자 이상 입력해주세요" />
          </FormControl>
          <FormControl>
            <FormLabel>역할</FormLabel>
            <Select
              size={size}
              options={roleOptions}
              placeholder="역할을 선택하세요"
            />
          </FormControl>
          <FormControl>
            <FormLabel>국가</FormLabel>
            <Select
              size={size}
              options={countryOptions}
              placeholder="국가를 선택하세요"
            />
          </FormControl>
          <FormControl>
            <FormLabel>자기소개</FormLabel>
            <Textarea
              size={size}
              placeholder="간단한 자기소개를 입력해주세요"
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </FormControl>
          <Button colorPalette="primary" variant="solid" mt={2}>
            가입하기
          </Button>
        </Stack>
      </Box>
    );
  },
};

/**
 * factchat audit-logs 페이지 풍의 필터바.
 * Select 3개가 가로로 늘어서 있고, 그 옆에 검색 Input 이 함께 있는
 * 패턴 — 모든 컨트롤이 같은 baseline / 높이로 떨어져야 합니다.
 */
export const AdminFilterBar: Story = {
  render: ({ size }) => {
    const statusOptions = [
      { label: '전체 상태', value: 'all' },
      { label: '성공', value: 'success' },
      { label: '실패', value: 'failed' },
    ];
    const actorOptions = [
      { label: '전체 사용자', value: 'all' },
      { label: '관리자', value: 'admin' },
      { label: '일반 사용자', value: 'user' },
    ];
    const periodOptions = [
      { label: '최근 7일', value: '7d' },
      { label: '최근 30일', value: '30d' },
      { label: '최근 90일', value: '90d' },
    ];

    return (
      <Box width="100%" maxW="1100px">
        <Flex gap={3} flexWrap="wrap" align="center">
          <Box w="180px">
            <Select
              size={size}
              options={periodOptions}
              defaultValue={periodOptions[0]}
            />
          </Box>
          <Box w="180px">
            <Select
              size={size}
              options={statusOptions}
              defaultValue={statusOptions[0]}
            />
          </Box>
          <Box w="180px">
            <Select
              size={size}
              options={actorOptions}
              defaultValue={actorOptions[0]}
            />
          </Box>
          <Box flex={1} minW="240px">
            <Input
              size={size}
              leftIcon={<IoSearch color="gray.500" />}
              placeholder="로그 메시지 검색"
            />
          </Box>
          <Button colorPalette="neutral" variant="outline">
            내보내기
          </Button>
        </Flex>
      </Box>
    );
  },
};

/**
 * 한 row 안에 Input 과 Select 가 인라인으로 섞이는 케이스 — 예를 들어
 * 파라미터 편집 폼에서 "필드명" + "타입" + "기본값" 처럼 늘어서는
 * 케이스. baseline 정렬 검증용.
 */
export const InlineFieldRow: Story = {
  render: ({ size }) => {
    const typeOptions = [
      { label: 'String', value: 'string' },
      { label: 'Number', value: 'number' },
      { label: 'Boolean', value: 'boolean' },
    ];

    return (
      <Box width="100%" maxW="900px">
        <Text fontSize="sm" fontWeight="medium" mb={2}>
          파라미터 추가
        </Text>
        <HStack gap={3} align="flex-start">
          <Box flex={2}>
            <Input size={size} placeholder="필드명" />
          </Box>
          <Box flex={1}>
            <Select
              size={size}
              options={typeOptions}
              defaultValue={typeOptions[0]}
            />
          </Box>
          <Box flex={2}>
            <Input size={size} placeholder="기본값" />
          </Box>
          <Button colorPalette="primary" variant="solid">
            추가
          </Button>
        </HStack>
      </Box>
    );
  },
};
