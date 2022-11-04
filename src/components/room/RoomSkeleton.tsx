import { Box, Skeleton, SkeletonText } from '@chakra-ui/react';

function RoomSkeleton() {
  return (
    <Box>
      <Skeleton height={280} rounded='2xl' mb={6}></Skeleton>
      <SkeletonText noOfLines={2} spacing={3} mb={6} />
      <SkeletonText noOfLines={1} />
    </Box>
  );
}

export default RoomSkeleton;
