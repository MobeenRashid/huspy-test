import React from 'react';
import { Provider } from 'react-redux';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { MoviesPage } from './pages';
import { NavBar } from './organs';
import store from './store';

export default function App() {
  return (<Provider store={store}>
    <Router>
      <ChakraProvider theme={theme}>
        <NavBar />
        <Switch>
          <Route path="/" component={MoviesPage} />
        </Switch>
      </ChakraProvider>
    </Router>
  </Provider>);
}
