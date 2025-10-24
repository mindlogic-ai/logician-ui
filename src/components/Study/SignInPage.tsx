import React, { useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

interface SignInPageProps {
  onSuccess?: (user: {
    id: string;
    email: string;
    name: string;
    token: string;
  }) => void;
  apiEndpoint?: string;
}

export const SignInPage: React.FC<SignInPageProps> = ({
  onSuccess,
  apiEndpoint = '/api/auth/signin',
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Sign in failed');
      }

      // 성공
      toast({
        title: 'Sign in successful!',
        description: `Welcome back, ${data.user.name}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      onSuccess?.(data.user);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);

      toast({
        title: 'Sign in failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      shadow="md"
    >
      <VStack spacing={6} align="stretch">
        <Heading size="lg" textAlign="center">
          Sign In
        </Heading>

        <Text color="gray.600" textAlign="center">
          Test credentials: test@example.com / password123
        </Text>

        {error && (
          <Alert status="error" data-testid="error-alert">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-testid="email-input"
                isDisabled={isLoading}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                data-testid="password-input"
                isDisabled={isLoading}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              isLoading={isLoading}
              loadingText="Signing in..."
              data-testid="signin-button"
            >
              Sign In
            </Button>
          </VStack>
        </form>

        <Text fontSize="sm" color="gray.500" textAlign="center">
          {isLoading && 'Connecting to server...'}
        </Text>
      </VStack>
    </Box>
  );
};
