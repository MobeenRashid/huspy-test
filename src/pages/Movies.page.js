import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Flex,
    SimpleGrid,
    Text,
    Link,
    Button,
    Spinner,
    Tooltip,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'
import actions from '../actions/movies';
import { MovieCard, MovieCardSkeleton } from '../molecules';


const selectMovies = state => state.movies.results;
const selectBookmarks = state => state.movies.bookMarks;
const selectPage = state => state.movies.page;
const selectIsLoading = state => state.movies.isLoading;
const selectIsLoadingNextPage = state => state.movies.isLoadingNextPage;

export default function MoviesPage() {
    const dispatch = useDispatch();
    const containerEl = useRef(null);
    const lastScrollTop = useRef(null);
    const movies = useSelector(selectMovies);
    const myMovies = useSelector(selectBookmarks);
    const page = useSelector(selectPage);
    const isLoading = useSelector(selectIsLoading);
    const isLoadingNextPage = useSelector(selectIsLoadingNextPage);


    const fetchMovies = useCallback((page = 1) => {
        if (containerEl && containerEl.current) lastScrollTop.current = containerEl.current.scrollTop;
        dispatch(actions.fetchMovies(page));
    }, [dispatch])

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);

    useEffect(() => {
        if (!containerEl.current || !lastScrollTop.current) return;
        containerEl.current.scrollTop = lastScrollTop.current;
        containerEl.current.scroll({
            top: lastScrollTop.current + 100,
            behavior: 'smooth',
        });
    }, [movies])

    const EmptyList = () => {
        return (<Flex minH="calc(100vh - 192px)" justifyContent="center" alignItems="center">
            <Text color="gray.400" fontSize="sm">
                Empty list
            </Text>
        </Flex>);
    }

    const FailedToLoad = () => {
        return (<Flex minH="calc(100vh - 192px)" justifyContent="center" alignItems="center">
            <Text color="gray.400" fontSize="sm">
                Failed to load data
                <Link color="blue.300" ml="5px" onClick={(e) => { e.preventDefault(); fetchMovies(); }}>Retry</Link>
            </Text>
        </Flex>);
    }

    const MoviesGrid = ({ items, }) => {
        if (!items) return <FailedToLoad />;
        if (items.length === 0) return <EmptyList />;

        if (items.length < 6)
            return (<SimpleGrid minChildWidth="220px" templateColumns="repeat(6, 1fr)" gap={6} p={10}>
                {items.map((movie) => (<MovieCard key={movie.id} movie={movie} />))}
            </SimpleGrid>);

        return (<SimpleGrid minChildWidth="220px" gap={6} p={10}>
            {items.map((movie) => (<MovieCard key={movie.id} movie={movie} />))}
        </SimpleGrid>);
    }

    const SkeltonGrid = () => {
        return (<SimpleGrid minChildWidth="220px" gap={6} p={10}>
            {Array(10).fill("").map((_, index) => (<MovieCardSkeleton key={index} />))}
        </SimpleGrid>);
    }

    return (<Box height="calc(100vh - 64px)" p={5} fontSize="xl">
        <Tabs>
            <TabList>
                <Tab>All movies</Tab>
                <Tab>My movies</Tab>
            </TabList>
            <TabPanels>
                <TabPanel ref={containerEl} height="calc(100vh - 127px)" overflowY="auto">
                    {isLoading
                        ? <SkeltonGrid />
                        : <>
                            <MoviesGrid items={movies} />
                            {(movies && movies.length) && <Box display="flex" height="100px" alignItems="center" justifyContent="center">
                                {isLoadingNextPage
                                    ? <Spinner
                                        thickness="4px"
                                        speed="0.65s"
                                        emptyColor="gray.200"
                                        color="gray.400"
                                        size="xl" />
                                    : <Tooltip label="Show more results" placement="top" openDelay="500">
                                        <Button
                                            variant="unstyled"
                                            color="gray.400"
                                            height="auto"
                                            _hover={{
                                                color: "gray.500",
                                            }}
                                            onClick={fetchMovies.bind(this, page + 1)}>
                                            <ChevronDownIcon height="48px" width="48px" />
                                        </Button>
                                    </Tooltip>
                                }
                            </Box>}
                        </>}
                </TabPanel>
                <TabPanel>
                    <MoviesGrid items={myMovies} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    </Box>);
}