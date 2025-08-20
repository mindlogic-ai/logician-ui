import { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

import { useGlobalLoadingStore } from '../store';

interface RequestItem {
  id: string;
  area: string;
  status: 'pending' | 'completed';
}

export const LoadingFunnelDebugger = () => {
  const { loadingTasks, isAreaLoading } = useGlobalLoadingStore();
  const [requestQueue, setRequestQueue] = useState<RequestItem[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const currentRequests: RequestItem[] = [];

    Object.entries(loadingTasks).forEach(([area, tasks]) => {
      tasks.forEach(taskId => {
        currentRequests.push({ id: taskId, area, status: 'pending' });
      });
    });

    setRequestQueue(prevQueue => {
      const newRequests = currentRequests.filter(
        req =>
          !prevQueue.find(item => item.id === req.id && item.area === req.area),
      );
      return [...prevQueue, ...newRequests];
    });

    setRequestQueue(prevQueue => {
      prevQueue.forEach(item => {
        const stillExists = loadingTasks[item.area]?.has(item.id);
        if (!stillExists && item.status !== 'completed') {
          item.status = 'completed';
          setTimeout(() => {
            setRequestQueue(currentQueue =>
              currentQueue.filter(q => q.id !== item.id),
            );
          }, 10000);
        }
      });
      return [...prevQueue];
    });
  }, [loadingTasks]);

  if (process.env.NEXT_PUBLIC_TASK_DEBUGGER !== 'Y') return null;

  return (
    <Box>
      {/* 🔘 토글 버튼 */}
      <Button
        onClick={() => setIsOpen(prev => !prev)}
        position="fixed"
        bottom="20px"
        right="20px"
        w="50px"
        h="50px"
        borderRadius="full"
        bg={isOpen ? 'primary.main' : 'danger.main'}
        color="white"
        zIndex="10000"
        _hover={{ bg: isOpen ? 'blue.600' : 'red.500' }}
      >
        {isOpen ? '🐞' : '✖'}
      </Button>

      {/* 🛠️ 디버거 창 */}
      {isOpen && (
        <Box
          position="fixed"
          bottom="80px"
          right="20px"
          w="350px"
          maxH="500px"
          overflowY="auto"
          bg="gray.1200"
          color="white"
          p="15px"
          borderRadius="8px"
          zIndex="10000"
          boxShadow="md"
          fontSize="14px"
        >
          <Text fontWeight="bold" mb="10px">
            🛠️ Funnel Debugger
          </Text>

          {requestQueue?.length === 0 ? (
            <Text>📭 No active requests</Text>
          ) : (
            <VStack align="stretch" spacing={2}>
              {requestQueue?.map(req => (
                <Flex
                  key={`${req.area}-${req.id}`}
                  justify="space-between"
                  p="5px 0"
                  borderBottom="1px solid"
                  borderColor="gray.600"
                  opacity={req.status === 'completed' ? 0.5 : 1}
                  transition="opacity 0.3s ease-in-out"
                >
                  <Text>
                    <strong>{req.area}</strong> - {req.id}
                  </Text>
                  <Text
                    color={
                      req.status === 'pending' ? 'orange.300' : 'green.300'
                    }
                    fontWeight="bold"
                  >
                    {req.status === 'pending' ? '⏳ 진행 중' : '✅ 완료'}
                  </Text>
                </Flex>
              ))}
            </VStack>
          )}

          {/* 영역별 로딩 상태 */}
          <VStack align="start" mt="10px" spacing={1}>
            {Object.keys(loadingTasks).map(area => (
              <Text
                key={area}
                color={isAreaLoading(area) ? 'orange.300' : 'green.300'}
              >
                {isAreaLoading(area)
                  ? `🔄 ${area} 영역 로딩 중...`
                  : `✅ ${area} 영역 완료`}
              </Text>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};
