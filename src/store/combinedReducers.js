import { combineReducers } from 'redux';
import movies from '../reducers/movies';

const reducers = combineReducers({
    movies,
});

export default reducers;