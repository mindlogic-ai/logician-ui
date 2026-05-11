import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react';
import { Meta } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button';
import { FormControl } from '../FormControl';
import { FormLabel } from '../FormLabel';
import { IoAddOutline, IoIosMail, IoSearch } from '../Icon';
import { Input } from '../Input';
import { PasswordInput } from '../PasswordInput';

import { Select } from '.';

/**
 * Temporary visual comparison between Input and Select.
 * Used to verify the two controls share the same default look
 * (border, hover, focus, font, padding, disabled/invalid states)
 * and look coherent inside real form layouts.
 *
 * Safe to delete once the unified style is no longer being iterated on.
 */
const meta = {
  title: 'Components/Select/Comparison',
} satisfies Meta;

export default meta;

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
 * Component-level diff: every Input/Select state side-by-side.
 */
export const SideBySide = () => {
  const [text, setText] = useState('');

  return (
    <Stack gap={6} width="400px">
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Input — placeholder
        </Text>
        <Input
          placeholder="Placeholder text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Select — placeholder
        </Text>
        <Select options={categoryOptions} placeholder="Placeholder text" />
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Input — with value
        </Text>
        <Input defaultValue="Some value" />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Select — with value
        </Text>
        <Select options={categoryOptions} defaultValue={categoryOptions[0]} />
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Input — invalid
        </Text>
        <Input placeholder="Invalid input" invalid />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Select — invalid
        </Text>
        <Select options={categoryOptions} placeholder="Invalid select" invalid />
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Input — disabled
        </Text>
        <Input disabled defaultValue="Disabled" />
      </Box>
      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Select — disabled
        </Text>
        <Select
          options={categoryOptions}
          defaultValue={categoryOptions[0]}
          isDisabled
        />
      </Box>

      <Box>
        <Text mb={1} fontSize="sm" fontWeight="medium">
          Input — readOnly
        </Text>
        <Input readOnly defaultValue="Read only" />
      </Box>
    </Stack>
  );
};

/**
 * factchat 챗봇 목록 페이지의 상단 toolbar 패턴.
 * 검색 Input + 카테고리 Select + 정렬 Select + 새 챗봇 Button 이 가로로
 * 한 줄에 배치되는 케이스 — 높이와 border 두께가 어긋나면 가장 눈에
 * 잘 띄는 레이아웃입니다.
 */
export const ChatbotListToolbar = () => {
  const [query, setQuery] = useState('');

  return (
    <Box width="100%" maxW="1200px">
      <HStack gap={3}>
        <Box flex={1}>
          <Input
            leftIcon={<IoSearch color="gray.500" />}
            placeholder="챗봇 검색..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </Box>
        <Box w="160px">
          <Select options={categoryOptions} defaultValue={categoryOptions[0]} />
        </Box>
        <Box w="160px">
          <Select options={sortOptions} defaultValue={sortOptions[0]} />
        </Box>
        <Button colorPalette="primary" variant="solid">
          <IoAddOutline />새 챗봇
        </Button>
      </HStack>
    </Box>
  );
};

/**
 * 회원가입 폼 — Input 과 Select 가 라벨과 함께 세로로 쌓이는 케이스.
 * 라벨/필드 정렬, 좌측 padding, 폰트 두께가 모두 일관되어야 합니다.
 */
export const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <Box width="400px">
      <Text fontSize="xl" fontWeight="bold" mb={6}>
        회원가입
      </Text>
      <Stack gap={4}>
        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input
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
            placeholder="홍길동"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>비밀번호</FormLabel>
          <PasswordInput placeholder="8자 이상 입력해주세요" />
        </FormControl>
        <FormControl>
          <FormLabel>역할</FormLabel>
          <Select options={roleOptions} placeholder="역할을 선택하세요" />
        </FormControl>
        <FormControl>
          <FormLabel>국가</FormLabel>
          <Select options={countryOptions} placeholder="국가를 선택하세요" />
        </FormControl>
        <Button colorPalette="primary" variant="solid" mt={2}>
          가입하기
        </Button>
      </Stack>
    </Box>
  );
};

/**
 * factchat audit-logs 페이지 풍의 필터바.
 * Select 3개가 가로로 늘어서 있고, 그 옆에 검색 Input 이 함께 있는
 * 패턴 — 모든 컨트롤이 같은 baseline / 높이로 떨어져야 합니다.
 */
export const AdminFilterBar = () => {
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
          <Select options={periodOptions} defaultValue={periodOptions[0]} />
        </Box>
        <Box w="180px">
          <Select options={statusOptions} defaultValue={statusOptions[0]} />
        </Box>
        <Box w="180px">
          <Select options={actorOptions} defaultValue={actorOptions[0]} />
        </Box>
        <Box flex={1} minW="240px">
          <Input
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
};

/**
 * 한 row 안에 Input 과 Select 가 인라인으로 섞이는 케이스 — 예를 들어
 * 파라미터 편집 폼에서 "필드명" + "타입" + "기본값" 처럼 늘어서는
 * 케이스. baseline 정렬 검증용.
 */
export const InlineFieldRow = () => {
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
          <Input placeholder="필드명" />
        </Box>
        <Box flex={1}>
          <Select options={typeOptions} defaultValue={typeOptions[0]} />
        </Box>
        <Box flex={2}>
          <Input placeholder="기본값" />
        </Box>
        <Button colorPalette="primary" variant="solid">
          추가
        </Button>
      </HStack>
    </Box>
  );
};
