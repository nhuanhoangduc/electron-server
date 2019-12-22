require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import graphqlClient from '@frontend/graphql';

// Pages
import HomePage from './pages/HomePage';


const App = () => {
    return (
        <ApolloProvider client={graphqlClient}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </Router>
        </ApolloProvider>
    );
};


ReactDOM.render(<App />, document.getElementById('window'));
