import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Spinner, Text, VStack } from '@chakra-ui/react';

interface Post {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

export const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/posts');
      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box p={8} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Loading posts...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8} textAlign="center">
        <Text color="red.500" data-testid="error-message">
          {error}
        </Text>
        <Button mt={4} onClick={fetchPosts}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading mb={6}>Posts</Heading>
      <VStack spacing={4} align="stretch">
        {posts.map((post) => (
          <Box
            key={post.id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            data-testid={`post-${post.id}`}
          >
            <Heading size="md">{post.title}</Heading>
            <Text color="gray.600" fontSize="sm" mt={1}>
              By {post.authorName}
            </Text>
            <Text mt={2}>{post.content}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
