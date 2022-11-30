import 'styles/calendar.css';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import { checkBooking, getRoom, getRoomreviews } from 'lib/api';
import { IReview, IRoomDetail } from 'types';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Skeleton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';

function RoomDetail() {
  const { roomPk } = useParams();

  const { data, isLoading } = useQuery<IRoomDetail>(
    ['roomId:', roomPk],
    getRoom
  );

  const { data: reviewsData, isLoading: isReviewsLoading } = useQuery<
    IReview[]
  >(['rooms', roomPk, 'reviews'], getRoomreviews);

  const [dates, setDates] = useState<Date[]>();
  const { data: checkBookingData, isLoading: checkBookingLoading } = useQuery(
    ['check', roomPk, dates],
    checkBooking,
    {
      cacheTime: 0, // 가장 최신의 결과르 받기위해
      enabled: dates !== undefined, // dates 없는 경우 query 실행 방지
    }
  );

  return (
    <Box
      mt={10}
      px={{
        base: 10,
        lg: 40,
      }}
    >
      <Helmet>
        <title>{data ? data.name : 'loading...'}</title>
      </Helmet>
      <Skeleton isLoaded={!isLoading} height={'44px'} width={'50%'}>
        <Heading>{data?.name}</Heading>
      </Skeleton>
      <Grid
        mt={8}
        gap={3}
        rounded={'lg'}
        overflow='hidden'
        height={'60vh'}
        templateRows={'1fr 1fr'}
        templateColumns={'repeat(4, 1fr)'}
      >
        {new Array(5).fill(0).map((_, idx) => (
          <GridItem
            colSpan={idx === 0 ? 2 : 1}
            rowSpan={idx === 0 ? 2 : 1}
            overflow={'hidden'}
            key={idx}
          >
            <Skeleton isLoaded={!isLoading} w='100%' h='100%'>
              {data?.photos && data.photos.length ? (
                <Image
                  src={
                    data?.photos[idx]?.file ??
                    `https://imagedelivery.net/0yNBnB1j4b45loBWzdicYQ/7bf5c5d4-e341-4d31-559a-b6b4d9686f00/public`
                  }
                  w='100%'
                  h='100%'
                  objectFit={'cover'}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack mt={10} w='50%' justifyContent='space-between'>
        <VStack alignItems={'flex-start'}>
          <Skeleton isLoaded={!isLoading}>
            <Heading fontSize={'xl'}>
              House hosted by {data?.owner.username}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isLoading}>
            <HStack justifyContent={'flex-start'} w='full'>
              <Text>
                {data?.toilets} toilet{data?.toilets === 1 ? '' : 's'}
              </Text>
              <Text>•</Text>
              <Text>
                {data?.rooms} room{data?.toilets === 1 ? '' : 's'}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <Avatar
          name={data?.owner.username}
          size={'lg'}
          src={data?.owner.avatar}
        >
          <AvatarBadge boxSize={'50%'} bg='green' />
        </Avatar>
      </HStack>
      <Box my={10}>
        <Skeleton isLoaded={!isReviewsLoading} w='50%'>
          <Heading mb={5} fontSize={'2xl'}>
            <HStack>
              <FaStar />
              <Text>{data?.rating}</Text>
              <Text>•</Text>
              <Text>
                {reviewsData?.length} review
                {reviewsData?.length === 1 ? '' : 's'}
              </Text>
            </HStack>
          </Heading>
        </Skeleton>
        <HStack>
          <Grid
            gap={8}
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: '2fr 1fr',
            }}
          >
            <Skeleton isLoaded={!isReviewsLoading}>
              <Grid
                w='100%'
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
                gap='10'
              >
                {reviewsData?.map((review, idx) => (
                  <VStack alignItems={'flex-start'} key={idx}>
                    <HStack>
                      <Avatar
                        name={review.user.username}
                        src={review.user.avatar}
                        size='md'
                      />
                      <VStack spacing={0} alignItems={'flex-start'}>
                        <Heading fontSize={'md'}>
                          {review.user.username}
                        </Heading>
                        <HStack spacing={1}>
                          <FaStar size={'12px'} />
                          <Text>{review.rating}</Text>
                        </HStack>
                      </VStack>
                    </HStack>
                    <Text>{review.payload}</Text>
                  </VStack>
                ))}
              </Grid>
            </Skeleton>
            <VStack spacing={2}>
              <Calendar
                onChange={setDates}
                locale='en-US'
                minDate={new Date()}
                maxDate={new Date(Date.now() + 60 * 60 * 24 * 60 * 1000)}
                minDetail='month'
                prev2Label={null}
                next2Label={null}
                selectRange
              />
              <Button
                isLoading={dates && checkBookingLoading}
                disabled={!checkBookingData?.ok}
                w='full'
                colorScheme={'red'}
              >
                Make a reservation
              </Button>
            </VStack>
          </Grid>
        </HStack>
      </Box>
    </Box>
  );
}

export default RoomDetail;
