import React, { useState, useEffect, useCallback } from 'react'
import {
    Box,
    Flex,
    Grid,
    Text,
    Link,
    Button,
    Spinner,
    Tooltip,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'

import axios from 'axios';

import { MovieCard, MovieCardSkeleton } from '../molecules';

export default function MoviesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState();


    const fetchMovies = useCallback(() => {
        setIsLoading(true);
        axios.get('https://api.themoviedb.org/3/movie/popular?api_key=f7648722afa74e8e067bc7b5c937d0de&language=en-US&page=1')
            .then(resp => resp.data)
            .then(data => {
                setMovies(data.results);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [])

    useEffect(() => {
        fetchMovies();
    }, [fetchMovies]);


    const EmptyList = () => {
        return (<Flex minH="calc(100vh - 192px)" justifyContent="center" alignItems="center">
            <Text color="gray.400" fontSize="sm">
                No movies.
            </Text>
        </Flex>);
    }

    const FailedToLoad = () => {
        return (<Flex minH="calc(100vh - 192px)" justifyContent="center" alignItems="center">
            <Text color="gray.400" fontSize="sm">
                Failed to load movies.
                <Link color="blue.300" ml="5px" onClick={(e) => { e.preventDefault(); fetchMovies(); }}>Retry.</Link>
            </Text>
        </Flex>);
    }

    const Movies = () => {
        if (!movies) return <FailedToLoad />;
        if (movies.length === 0) return <EmptyList />;

        return (<Grid templateColumns="repeat(5, 1fr)" gap={6} p={10}>
            {movies.map((movie, index) => (<MovieCard key={index} movie={movie} />))}
        </Grid>);
    }

    if (isLoading) {
        console.log('returning skelton...')
        return (<Grid templateColumns="repeat(5, 1fr)" gap={6} p={10}>
            {Array(10).fill("").map((_, index) => (<MovieCardSkeleton key={index} />))}
        </Grid>);
    }
    return (<Box p={5} fontSize="xl">
        <Movies />
        <Box display="flex" mb="50px" height="100px" alignItems="center" justifyContent="center">
            <Tooltip label="Show more results" placement="top" openDelay="1000">
                <Button
                    fontSize="xxx-large"
                    variant="unstyled"
                    color="gray.400"
                    _hover={{
                        color: "gray.500",
                    }}>
                    <ChevronDownIcon />
                    {/* <Text>Show more results</Text> */}
                </Button>
            </Tooltip>
            {/* <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="gray.400"
                size="xl" /> */}
        </Box>
    </Box>);
}