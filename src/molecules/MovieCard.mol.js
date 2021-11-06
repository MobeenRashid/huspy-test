import { useDispatch } from 'react-redux';
import {
    Box,
    Stack,
    Link,
    Text,
    Image,
    Skeleton,
    useToast,
} from '@chakra-ui/react';
import { StarIcon, } from '@chakra-ui/icons';
import actions from '../actions/movies';

export default function MovieCard({ movie, }) {
    const dispatch = useDispatch();
    const toast = useToast();
    if (!movie) return null;

    const handleStarClick = () => {
        if (movie.favorite) {
            dispatch(actions.removeBookMark(movie));
            toast({
                title: 'Removed from list',
                status: "success",
                position: "bottom-right",
                duration: 1000,
            });
        }
        else {
            dispatch(actions.addBookMark(movie));
            toast({
                title: 'Added to list',
                status: "success",
                position: "bottom-right",
                duration: 1000
            });
        }
    }

    return (
        <Box pos="relative" minW="200px" maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer" >
            <StarIcon
                pos="absolute"
                top="10px"
                right="10px"
                color={movie.favorite ? "red.500" : "gray.300"}
                _hover={{
                    color: "red.500"
                }}
                onClick={handleStarClick}
            />
            <Image height="200px" width="100%" objectFit="cover" src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} />
            <Box p="5">
                <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                >
                    {movie.release_date}
                </Box>
                <Box
                    color="black"
                    mt="1"
                    fontWeight="semibold"
                    as="h6"
                    lineHeight="tight"
                    isTruncated
                >
                    <Link href="#">{movie.original_title}</Link>
                </Box>
                <Box
                    fontSize="md"
                    color="gray.700"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    maxH="90px" >
                    {movie.overview}
                </Box>
                {'...'}
                <Box display="flex" fontSize="sm" mt="2" alignItems="center">
                    {Array(5).fill("").map((_, i) => (<StarIcon key={i} color={i < (movie.vote_average / 2) ? "teal.500" : "gray.300"} />))}
                    <Text ml="5px" color="gray.600">{movie.vote_count} reviews</Text>
                </Box>
            </Box>
        </Box>
    )
}

export function MovieCardSkeleton() {
    return (
        <Stack maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer" _hover={{ backgroundColor: '#f7f7f7' }}>
            <Skeleton height="200px" />
            <Stack p="5">
                <Skeleton height="20px" width="50px" />
                <Skeleton height="35px" />
                <Skeleton height="20px" width="75px" />
            </Stack>
        </Stack>
    );
}