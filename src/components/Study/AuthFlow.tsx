import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';

import { PostListPage } from './PostListPage';
import { SignInPage } from './SignInPage';

/**
 * 로그인 플로우 통합 컴포넌트
 *
 * 로그인 성공 → 게시글 목록으로 자동 이동
 */
export const AuthFlow: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    email: string;
    name: string;
    token: string;
  } | null>(null);

  const handleSignInSuccess = (user: {
    id: string;
    email: string;
    name: string;
    token: string;
  }) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <SignInPage onSuccess={handleSignInSuccess} />;
  }

  return (
    <Box>
      <Box
        p={4}
        bg="blue.50"
        borderBottom="1px"
        borderColor="blue.200"
        data-testid="user-info"
      >
        Welcome, {currentUser?.name}! (Token: {currentUser?.token.substring(0, 20)}...)
      </Box>
      <PostListPage />
    </Box>
  );
};
