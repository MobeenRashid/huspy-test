import React from 'react';
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

export default function App() {
  return <Router>
    <ChakraProvider theme={theme}>
      <NavBar />
      <Switch>
        <Route path="/" component={MoviesPage} />
      </Switch>
    </ChakraProvider>
  </Router>
}
