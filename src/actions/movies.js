import axios from 'axios';
import config from '../config.json';

export const actionTypes = {
    SET_MOVIE_RESULTS: 'SET_MOVIE_RESULTS',
    PUSH_MOVIE_RESULTS: 'PUSH_MOVIE_RESULTS',
    ADD_MOVIE_BOOK_MARK: 'ADD_MOVIE_BOOK_MARK',
    REMOVE_MOVIE_BOOK_MARK: 'REMOVE_MOVIE_BOOK_MARK',
    SET_IS_LOADING: 'SET_IS_LOADING',
    SET_IS_LOADING_NEXT_PAGE: 'SET_IS_LOADING_NEXT_PAGE',
}

export function setMovies(movies) {
    return {
        type: actionTypes.SET_MOVIE_RESULTS,
        movies,
    }
}

export function pushMovies(movies) {
    return {
        type: actionTypes.PUSH_MOVIE_RESULTS,
        movies,
    }
}

export function addBookMark(movie) {
    return {
        type: actionTypes.ADD_MOVIE_BOOK_MARK,
        movie,
    }
}

export function removeBookMark(movie) {
    return {
        type: actionTypes.REMOVE_MOVIE_BOOK_MARK,
        movie,
    }
}

function setIsLoading(value) {
    return {
        type: actionTypes.SET_IS_LOADING,
        value,
    }
}

function setIsLoadingNextPage(value) {
    return {
        type: actionTypes.SET_IS_LOADING_NEXT_PAGE,
        value,
    }
}

export const fetchMovies = (page = 1) => dispatch => {
    const setLoading = (page > 1) ? setIsLoadingNextPage : setIsLoading;
    dispatch(setLoading(true));
    axios.get(`${config.SERVER_URL}/movie/popular?api_key=${process.env.REACT_APP_HUSPY_API_KEY}&language=en-US&page=${page}`)
        .then(resp => resp.data)
        .then(data => {
            if (page > 1) dispatch(pushMovies(data.results));
            else dispatch(setMovies(data.results));
        })
        .finally(() => {
            dispatch(setLoading(false));
        });
}

const actions = {
    fetchMovies,
    setMovies,
    pushMovies,
    addBookMark,
    removeBookMark,
}

export default actions;