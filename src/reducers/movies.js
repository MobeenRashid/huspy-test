import { actionTypes } from '../actions/movies';


const initialState = {
    results: null,
    bookMarks: [],
    page: 1,
    isLoading: true,
    isLoadingNextPage: false,
}
export default function operations(state = initialState, action) {
    switch (action.type) {
        case actionTypes.SET_MOVIE_RESULTS: {
            return {
                ...state,
                results: action.movies,
            }
        }
        case actionTypes.PUSH_MOVIE_RESULTS: {
            const results = [...state.results, ...action.movies];
            return {
                ...state,
                page: state.page + 1,
                results,
            }
        }
        case actionTypes.SET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.value,
            }
        }
        case actionTypes.SET_IS_LOADING_NEXT_PAGE: {
            return {
                ...state,
                isLoadingNextPage: action.value,
            }
        }
        case actionTypes.ADD_MOVIE_BOOK_MARK: {
            if (!action.movie) return state;

            const results = [...state.results];
            const bookMarks = [...state.bookMarks];
            bookMarks.push(action.movie);

            const index = results.findIndex(movie => movie.id === action.movie.id);
            results[index].favorite = true;

            return {
                ...state,
                results,
                bookMarks,
            }
        }
        case actionTypes.REMOVE_MOVIE_BOOK_MARK: {
            if (!action.movie) return state;

            const results = [...state.results];
            const index = results.findIndex(movie => movie.id === action.movie.id);
            results[index].favorite = false;

            const bookMarks = state.bookMarks.filter((movie) => movie.id !== action.movie.id);

            return {
                ...state,
                results,
                bookMarks,
            }
        }
        default:
            return state;
    }
}