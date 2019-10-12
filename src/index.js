import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import Planets from './components/Planets';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'igrnore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
};

const client = new ApolloClient({
  uri: 'https://swapi.graph.cool/',
  cache: new InMemoryCache()
});

client.defaultOptions = defaultOptions;

const Appy = () => (
  <ApolloProvider client={client}>
    <div>
      <h2>Starwars Data 🚀</h2>
    </div>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(<Appy />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
