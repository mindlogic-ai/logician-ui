import React from 'react';
import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

export interface StudyProps {
  onSubmit?: (name: string, email: string) => void;
  onReset?: () => void;
  onButtonClick?: (buttonName: string) => void;
}

export const Study = ({ onSubmit, onReset, onButtonClick }: StudyProps) => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const toast = useToast();

  const handleSubmit = () => {
    if (!name || !email) {
      toast({
        title: '입력 오류',
        description: '이름과 이메일을 모두 입력해주세요.',
        status: 'error',
        duration: 3000,
      });
      return;
    }

    setIsSubmitted(true);
    onSubmit?.(name, email);

    toast({
      title: '제출 완료',
      description: `${name}님, 환영합니다!`,
      status: 'success',
      duration: 3000,
    });
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCount(0);
    setIsSubmitted(false);
    onReset?.();

    toast({
      title: '초기화',
      description: '모든 값이 초기화되었습니다.',
      status: 'info',
      duration: 2000,
    });
  };

  const handleButtonClick = (buttonName: string) => {
    setCount((prev) => prev + 1);
    onButtonClick?.(buttonName);
  };

  return (
    <Box
      p={6}
      maxW="500px"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
    >
      <VStack spacing={4} align="stretch">
        <Heading size="md" data-testid="study-title">
          Storybook 스터디 예제
        </Heading>

        {isSubmitted && (
          <Badge colorScheme="green" p={2} data-testid="success-badge">
            ✅ 제출 완료!
          </Badge>
        )}

        <Box>
          <Text mb={2} fontWeight="bold">
            이름
          </Text>
          <Input
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="name-input"
          />
        </Box>

        <Box>
          <Text mb={2} fontWeight="bold">
            이메일
          </Text>
          <Input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="email-input"
          />
        </Box>

        <HStack spacing={3}>
          <Button
            colorScheme="blue"
            onClick={() => handleButtonClick('increment')}
            data-testid="increment-btn"
          >
            카운트 증가 ({count})
          </Button>

          <Button
            colorScheme="red"
            variant="outline"
            onClick={() => setCount(Math.max(0, count - 1))}
            data-testid="decrement-btn"
          >
            감소
          </Button>
        </HStack>

        <Text fontSize="lg" fontWeight="bold" data-testid="count-display">
          현재 카운트: {count}
        </Text>

        <HStack spacing={3}>
          <Button
            colorScheme="green"
            onClick={handleSubmit}
            isDisabled={isSubmitted}
            data-testid="submit-btn"
            flex={1}
          >
            제출
          </Button>

          <Button
            colorScheme="gray"
            variant="outline"
            onClick={handleReset}
            data-testid="reset-btn"
            flex={1}
          >
            초기화
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};
